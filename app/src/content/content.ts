import { Nodes } from "./schema";

export const CONTENT = [
  {
    type: "default",
    content: "some hello world content",
    title: "tajtl",
    x: 0,
    y: 0,
  },
  {
    type: "default",
    content: "some hello world content 2",
    title: "tajtl 2",
    x: 2000,
    y: 0,
  },
] as const satisfies Nodes[];
