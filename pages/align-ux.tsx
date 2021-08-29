import { Button, Icon, InputGroup, Radio, RadioGroup } from '@blueprintjs/core';
import { maxHeaderSize } from 'http';
import { NextPageContext, NextPage } from 'next';
import React, { Reducer, useEffect, useReducer, useRef, useState } from 'react';
import styled from 'styled-components';
import MetaTags from '../components/MetaTags';
import usePartialState from '../utils/usePartialState';

type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const computeGrid = (rects: Rect[] /* , vertical:  */) => {
  // spacing
  //   just clicking - space-between
  //   adjusts vertical and horizontal spacing
  //     click + hold (with slider)
  //     wheel and shift + wheel

  // allow resize (fill cell) - can modify rects
  //  right click or alt
  //  doesn't match entire row/column but the biggest rect in that row/column

  // multispan - allow for

  const rows: {
    top: number;
    bottom: number;
    idxs: number[];
  }[] = [];
  const columns: {
    left: number;
    right: number;
    idxs: number[];
  }[] = [];

  if (rects.length === 0) {
    return {
      rows,
      columns,
    };
  }

  rows.push({
    top: rects[0].y - rects[0].height * 0.5,
    bottom: rects[0].y + rects[0].height * 0.5,
    idxs: [0],
  });
  columns.push({
    left: rects[0].x - rects[0].width * 0.5,
    right: rects[0].x + rects[0].width * 0.5,
    idxs: [0],
  });

  // TODO converge algorithm iteratively

  for (let i = 1; i < rects.length; i++) {
    const rect = rects[i];

    // determine row
    let foundRow = false;
    for (let ri = 0; ri < rows.length; ri++) {
      const row = rows[ri];
      const bottomEdgeAboveRowsTop = rect.y + rect.height * 0.5 < row.top;
      const topEdgeBelowRowsBottom = rect.y - rect.height * 0.5 > row.bottom;
      const isOutsideRow = bottomEdgeAboveRowsTop || topEdgeBelowRowsBottom;
      if (!isOutsideRow) {
        row.idxs.push(i);
        row.bottom = Math.max(rect.y + rect.height * 0.5, row.bottom);
        row.top = Math.min(rect.y - rect.height * 0.5, row.top);
        foundRow = true;
        break;
      }
    }
    if (!foundRow) {
      rows.push({
        top: rect.y - rect.height * 0.5,
        bottom: rect.y + rect.height * 0.5,
        idxs: [i],
      });
    }

    // determine column
    let foundColumn = false;
    for (let ci = 0; ci < columns.length; ci++) {
      const column = columns[ci];
      const leftEdgeRightColumn = rect.x - rect.width * 0.5 > column.right;
      const rightEdgeLeftColumn = rect.x + rect.width * 0.5 < column.left;
      const isOutsideColumn = leftEdgeRightColumn || rightEdgeLeftColumn;
      if (!isOutsideColumn) {
        column.idxs.push(i);
        column.left = Math.min(rect.x - rect.width * 0.5, column.left);
        column.right = Math.max(rect.x + rect.width * 0.5, column.right);
        foundColumn = true;
        break;
      }
    }
    if (!foundColumn) {
      columns.push({
        left: rect.x - rect.width * 0.5,
        right: rect.x + rect.width * 0.5,
        idxs: [i],
      });
    }
  }

  return {
    rows,
    columns,
  };
};

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #f5f8fa;

  canvas {
    position: fixed;
    background: transparent;
    left: 0;
    top: 0;
    pointer-events: none;
  }

  .ctrls {
    position: fixed;
    top: 0;
    left: 0;
    background: white;
    padding: 10px;
    border: 1px solid #d0d0d0;
    border-width: 0 1px 1px 0;

    display: grid;
    grid-auto-flow: column;
    grid-auto-size: max-content;
    grid-gap: 10px;

    .grid {
      display: grid;
      grid-template-columns: repeat(4, max-content);
      grid-auto-rows: max-content;
      grid-gap: 4px;

      svg {
        * {
          fill: #8a9ba8;
        }
      }

      > div {
        border: 1px solid #e1e8ed;
        // box-sizing: border-box;
        position: relative;
        padding: 0;

        &:after {
          position: absolute;
          content: '';
          background: #ced9e0;
          width: 60%;
          height: 60%;
        }

        &.top:after {
          top: 0;
        }
        &.bottom:after {
          bottom: 0;
        }
        &.left:after {
          left: 0;
        }
        &.right:after {
          right: 0;
        }
        &.mid:after {
          left: 50%;
          transform: translateX(-50%);
        }
        &.center:after {
          top: 50%;
          transform: translateY(-50%);
        }
        &.mid.center:after {
          transform: translate(-50%, -50%);
        }
      }

      > * {
        padding: 2px;
      }

      > *:hover {
        background: #ebf1f5;
        cursor: pointer;

        &:after {
          background: #8a9ba8;
        }
      }
    }

    .space {
      display: grid;

      font-size: 0.8em;
    }
  }

  div.node {
    cursor: pointer;
    border: 1px solid #d0d0d0;
    border-radius: 3px;
    position: absolute;
    background: white;
    padding: 10px;
    color: rgba(0, 0, 0, 0.65);

    &.sel {
      border-color: #106ba3;
    }
  }
`;

const AlignUXPage: NextPage = () => {
  const [state, setState] = usePartialState<{
    nodes: Array<
      Rect & {
        selected: boolean;
      }
    >;
    widget: {
      isStepTwo: boolean;
      activeAsix: 'x' | 'y' | 'xy';
      horSpacing: 'as-is' | 'dist' | 'custom';
      verSpacing: 'as-is' | 'dist' | 'custom';
      dx: string;
      dy: string;
    };
  }>({
    nodes: [],
    widget: {
      isStepTwo: false,
      activeAsix: 'xy',
      horSpacing: 'as-is',
      verSpacing: 'as-is',
      dx: '10',
      dy: '10',
    },
  });

  const dragStartX = useRef<number>(0);
  const dragStartY = useRef<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D>(null);
  const nodeRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;

    const nodes = [...Array(10)].map(() => ({
      width: 100 + Math.random() * 100,
      height: 50 + Math.random() * 70,
      x: Math.random() * (w - 100) + 50,
      y: Math.random() * (h - 200) + 100,
      selected: false,
    }));

    setState({
      nodes,
    });

    if (canvasRef.current) {
      canvasRef.current.style.setProperty('width', `${w}px`);
      canvasRef.current.style.setProperty('height', `${h}px`);
      canvasRef.current.setAttribute('width', `${w}px`);
      canvasRef.current.setAttribute('height', `${h}px`);
      ctxRef.current = canvasRef.current.getContext('2d');
    }
  }, []);

  useEffect(() => {
    const keyUpHandler = (e: KeyboardEvent) => {
      e.stopPropagation();
      if (e.key === 'd') {
        const rects = state.nodes.filter((node) => node.selected);
        const grid = computeGrid(rects);

        if (!grid.columns.length || !grid.rows.length || !ctxRef.current) {
          return;
        }

        const ctx = ctxRef.current;
        const w = window.innerWidth;
        const h = window.innerHeight;

        ctx.fillStyle = 'rgb(16, 107, 163, 0.1)';

        ctx.clearRect(0, 0, w, h);

        const g_top = grid.rows.reduce((prevTop, row) => {
          return Math.min(prevTop, row.top);
        }, grid.rows[0].top);
        const g_bottom = grid.rows.reduce((prevBottom, row) => {
          return Math.max(prevBottom, row.bottom);
        }, grid.rows[0].bottom);
        const g_left = grid.columns.reduce((prevLeft, column) => {
          return Math.min(prevLeft, column.left);
        }, grid.columns[0].left);
        const g_right = grid.columns.reduce((prevRight, column) => {
          return Math.max(prevRight, column.right);
        }, grid.columns[0].right);

        grid.columns.forEach(({ left, right }) => {
          ctx.fillRect(left, g_top, right - left, g_bottom - g_top);
        });

        grid.rows.forEach(({ top, bottom }) => {
          ctx.fillRect(g_left, top, g_right - g_left, bottom - top);
        });
      } else if (e.key === 'c') {
        const w = window.innerWidth;
        const h = window.innerHeight;
        ctxRef.current?.clearRect(0, 0, w, h);
      }
    };

    document.body.addEventListener('keyup', keyUpHandler);

    return () => {
      document.body.removeEventListener('keyup', keyUpHandler);
    };
  }, [state.nodes]);

  const deselectAll = (stateNodes: typeof state['nodes']) => {
    return stateNodes.map((node) => ({
      ...node,
      selected: false,
    }));
  };

  const selectOne = (stateNodes: typeof state['nodes'], idx: number, selected = true) => {
    const nodes = [...stateNodes];
    nodes[idx] = {
      ...nodes[idx],
      selected,
    };
    return nodes;
  };

  const handleDragStart = (idx: number) => (e: React.DragEvent<HTMLDivElement>) => {
    dragStartX.current = e.pageX;
    dragStartY.current = e.pageY;

    const img = new Image();
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
    e.dataTransfer.setDragImage(img, 0, 0);
    // document.body.style.setProperty("cursor", "move")

    if (!state.nodes[idx].selected) {
      setState({
        nodes: selectOne(deselectAll(state.nodes), idx),
      });
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    state.nodes.forEach((node, idx) => {
      if (node.selected) {
        nodeRefs.current[idx].style.setProperty(
          'left',
          `${e.pageX - dragStartX.current + node.x - node.width * 0.5}px`,
        );
        nodeRefs.current[idx].style.setProperty(
          'top',
          `${e.pageY - dragStartY.current + node.y - node.height * 0.5}px`,
        );
      }
    });
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const dx = e.pageX - dragStartX.current;
    const dy = e.pageY - dragStartY.current;

    dragStartX.current = 0;
    dragStartY.current = 0;

    const nodes = [...state.nodes];
    for (const node of nodes) {
      if (node.selected) {
        node.x = node.x + dx;
        node.y = node.y + dy;
      }
    }
    // document.body.style.setProperty("cursor", "")
    setState({
      nodes,
    });
  };

  return (
    <Wrapper
      onClick={() => {
        setState({
          nodes: deselectAll(state.nodes),
        });
      }}
    >
      <MetaTags title="Alignment widget" rawTitle />

      <canvas ref={canvasRef} />
      <div className="ctrls">
        <div className="grid">
          {/* <Icon icon="heat-grid" /> */}
          <span></span>
          <Icon icon="alignment-left" />
          <Icon icon="alignment-vertical-center" />
          <Icon icon="alignment-right" />

          <Icon icon="alignment-top" />
          <div className="top left"></div>
          <div className="top mid"></div>
          <div className="top right"></div>

          <Icon icon="alignment-horizontal-center" />
          <div className="center left"></div>
          <div className="center mid"></div>
          <div className="center right"></div>

          <Icon icon="alignment-bottom" />
          <div className="bottom left"></div>
          <div className="bottom mid"></div>
          <div className="bottom right"></div>
        </div>

        <div className="space">
          <p>Horizontal spacing:</p>
          <RadioGroup
            onChange={(e) => {
              setState({
                widget: {
                  ...state.widget,
                  horSpacing: e.currentTarget.value as any,
                },
              });
            }}
            selectedValue={state.widget.horSpacing}
          >
            <Radio value="as-is">As is</Radio>
            <Radio value="dist">Distribute</Radio>
            <Radio value="custom">
              <InputGroup placeholder="Space" width={100} small value={state.widget.dx} />
            </Radio>
          </RadioGroup>
        </div>

        <div className="space">
          <p>Vertical spacing:</p>
          <RadioGroup
            onChange={(e) => {
              setState({
                widget: {
                  ...state.widget,
                  verSpacing: e.currentTarget.value as any,
                },
              });
            }}
            selectedValue={state.widget.verSpacing}
          >
            <Radio value="as-is">As is</Radio>
            <Radio value="dist">Distribute</Radio>
            <Radio value="custom">
              <InputGroup placeholder="Space" width={100} small value={state.widget.dy} />
            </Radio>
          </RadioGroup>
        </div>
      </div>
      {state.nodes.map((node, idx) => (
        <div
          draggable
          onDragStart={handleDragStart(idx)}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onMouseDown={(e) => {
            e.stopPropagation();
          }}
          onMouseUp={(e) => {
            e.stopPropagation();
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (!e.ctrlKey) {
              setState({
                nodes: selectOne(deselectAll(state.nodes), idx),
              });
            } else {
              setState({
                nodes: selectOne(state.nodes, idx, !state.nodes[idx].selected),
              });
            }
          }}
          key={idx}
          style={{
            width: `${node.width}px`,
            height: `${node.height}px`,
            left: `${node.x - node.width * 0.5}px`,
            top: `${node.y - node.height * 0.5}px`,
          }}
          className={['node', node.selected ? 'sel' : ''].join(' ')}
          ref={(el) => nodeRefs.current.push(el)}
        >{`node-${idx}`}</div>
      ))}
    </Wrapper>
  );
};

export default AlignUXPage;
