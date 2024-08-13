import { NodeType } from ".";
import { FC, ReactNode } from "react";

type NodeLinkProps = {
  id: NonNullable<NodeType<string, Record<string, unknown>>["id"]>;
  children: ReactNode;
};

export const NodeLink: FC<NodeLinkProps> = ({ id, children }) => {
  return <a href={`#${id}`}>{children}</a>;
};
