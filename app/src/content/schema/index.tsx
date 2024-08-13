import { Config } from "nodebook";
import { DefaultNode, DefaultNodeComp } from "./default-node";

export type Nodes = DefaultNode;

export const CONFIG: Config<Nodes> = {
  default: {
    label: "Default",
    component: DefaultNodeComp,
  },
};
