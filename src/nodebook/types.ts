import { FC } from "react";

export type NodeType<
  Type extends string,
  Data extends Record<string, unknown>
> = {
  type: Type;
  x: number;
  y: number;
  id?: SnakeCaseString;
} & Data;

export type Config<T extends NodeType<string, Record<string, unknown>>> = {
  [Tp in T["type"]]: {
    label: string;
    component: FC<Extract<T, { type: Tp }>>;
  };
};

type SnakeCaseString = string;
