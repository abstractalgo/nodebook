import {
  addEdge,
  Connection,
  Node,
  Edge,
  NodeTypes,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  NodeProps,
} from "@xyflow/react";
import { JSX, ReactNode, useCallback, useMemo } from "react";
import { NodeType, Config } from "./types";
import "@xyflow/react/dist/style.css";

export type NodebookProps<T extends NodeType<string, Record<string, unknown>>> =
  {
    className?: string;
    children?: ReactNode;
    config: Config<T>;
    content: T[];
  };

const Graph = <T extends NodeType<string, Record<string, unknown>>>({
  config,
  content,
}: Pick<NodebookProps<T>, "config" | "content">): JSX.Element => {
  const nodeTypes: NodeTypes = useMemo(() => {
    const rv: NodeTypes = {};
    for (const type in config) {
      rv[type] = (props: NodeProps) => {
        // @ts-expect-error bla
        const Comp = config[type].component;
        return <Comp {...props.data} />;
      };
    }
    return rv;
  }, [config]);

  const [nodes /* setNode */, , onNodesChange] = useNodesState<Node>(
    content.map((item) => {
      const n: Node = {
        id: "bla",
        data: item,
        position: {
          x: item.x,
          y: item.y,
        },
      };
      return n;
    })
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <ReactFlow
      nodeTypes={nodeTypes}
      nodes={nodes}
      onNodesChange={onNodesChange}
      edges={edges}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      proOptions={{
        hideAttribution: true,
      }}
      panOnScroll={true}
      panOnScrollSpeed={1.0}
    />
  );
};

export const Nodebook = <T extends NodeType<string, Record<string, unknown>>>({
  className,
  config,
  content,
  children,
}: NodebookProps<T>): JSX.Element => {
  return (
    <ReactFlowProvider>
      <div className={className}>
        {children}
        <Graph config={config} content={content} />
      </div>
    </ReactFlowProvider>
  );
};
