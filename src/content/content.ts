import { Nodes } from "./schema";

export const CONTENT = [
  {
    type: "default",
    content: "some hello world content",
    title: "tajtl",
    x: 0,
    y: 0,
  },
] as const satisfies Nodes[];
