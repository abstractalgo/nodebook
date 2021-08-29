import { NextPageContext, NextPage } from 'next';
import React, { useRef, useMemo, useEffect } from 'react';
import LinkComp from '../components/Link';
import StickerComp from '../components/Sticker';
import NodeComp from '../components/Node';
import MetaTags from '../components/MetaTags';
import { transformInfo } from '../core/transformations';
import { LinkInfo, Maybe, NodebookInfo, NodeInfo, GroupInfo, StickerInfo, NodebookPageProps } from '../core/types';
import Sidebar from '../components/Sidebar';
import cuid from 'cuid';
import { useApp } from '../core/store';
import styled from 'styled-components';

const NodebookPage: NextPage<NodebookPageProps> = (props) => {
  const { init, ...state } = useApp();

  useEffect(() => {
    init({
      nodebook: props.nodebook,
      links: props.links,
      nodes: props.nodes,
      stickers: props.stickers,
      groups: props.groups,
    });
  }, []);

  const contentHolder = useRef<SVGGElement>(null);
  const stickersHolder = useRef<SVGGElement>(null);
  const linksHolder = useRef<SVGGElement>(null);
  const nodesHolder = useRef<SVGGElement>(null);

  const { links, nodes, stickers } = useMemo(() => {
    return {
      links: state.links.filter(
        (link) =>
          (link.fromNode.group === null || link.fromNode.group.visible) &&
          (link.toNode.group === null || link.toNode.group.visible),
      ),
      stickers: state.stickers.filter((sticker) => sticker.group === null || sticker.group.visible),
      nodes: state.nodes.filter((node) => node.group === null || node.group.visible),
    };
  }, [state.links, state.groups, state.nodes, state.stickers]);

  return (
    <PageWrapper>
      <MetaTags />

      <Sidebar />

      <svg tabIndex={-1}>
        <g ref={contentHolder}>
          <g ref={stickersHolder}>
            {stickers.map((sticker) => (
              <StickerComp key={sticker.id} sticker={sticker} />
            ))}
          </g>

          <g ref={linksHolder}>
            {links.map((link) => (
              <LinkComp key={link.id} link={link} />
            ))}
          </g>

          <g ref={nodesHolder}>
            {nodes.map((node) => (
              <NodeComp key={node.id} {...node} />
            ))}
          </g>
        </g>
      </svg>
    </PageWrapper>
  );
};

export default NodebookPage;

export async function getServerSideProps(ctx: NextPageContext) {
  const nodebookInfo: Maybe<NodebookInfo> = {
    id: cuid(),
    coverUrl: '',
    createdAt: Date.now(),
    description: 'ndbk desc',
    modifiedAt: Date.now(),
    privacy: 'public',
    title: 'ndbk title',
  };
  const groupsInfo: GroupInfo[] = Array.from({ length: 3 }).map((_, idx) => ({
    id: cuid(),
    title: `group #${idx}`,
    visible: true,
  }));
  const nodesInfo: NodeInfo[] = Array.from({ length: 20 }).map((_, idx) => ({
    id: cuid(),
    autosize: false,
    background: '',
    border: '',
    borderWidth: 0,
    w: 100 + Math.random() * 100,
    h: 50 + Math.random() * 50,
    cx: Math.random() * 1000,
    cy: Math.random() * 1000,
    content: `# node #${idx}`,
    createdAt: Date.now(),
    groupId: groupsInfo[Math.floor(Math.random() * groupsInfo.length)].id,
  }));
  const linksInfo: LinkInfo[] = Array.from({ length: 50 }).map((_, idx) => ({
    id: cuid(),
    color: 'red',
    content: `link #${idx}`,
    shape: 'straight',
    width: 1,
    fromId: nodesInfo[Math.floor(Math.random() * nodesInfo.length)].id,
    toId: nodesInfo[Math.floor(Math.random() * nodesInfo.length)].id,
  }));
  const stickersInfo: StickerInfo[] = Array.from({ length: 10 }).map((_, idx) => ({
    id: cuid(),
    background: '#BFCCD6',
    border: '#5C7080',
    borderWidth: 3,
    cx: Math.random() * 1000,
    cy: Math.random() * 1000,
    w: 100,
    h: 100,
    shape: Math.random() < 0.5 ? 'ellipse' : 'rect',
    groupId: groupsInfo[Math.floor(Math.random() * groupsInfo.length)].id,
    path: '',
    title: `sticker #${idx}`,
  }));

  // if (!nodebookInfo || !nodesInfo || !linksInfo || !groupsInfo) {
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: false,
  //     },
  //   };
  // }

  const props: NodebookPageProps = transformInfo({
    nodebook: nodebookInfo,
    nodes: nodesInfo,
    links: linksInfo,
    groups: groupsInfo,
    stickers: stickersInfo,
  });

  return {
    props,
  };
}

const PageWrapper = styled.div`
  > svg {
    width: 100vw;
    height: 100vh;
  }
`;
