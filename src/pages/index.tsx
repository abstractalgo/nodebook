import { Nodebook } from "nodebook";
import { FC } from "react";
import { Nodes, CONFIG } from "../content/schema";
import { CONTENT } from "../content/content";

export const IndexPage: FC = () => {
  return (
    <Nodebook<Nodes> config={CONFIG} content={CONTENT} className="h-full" />
  );
};
