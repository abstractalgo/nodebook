export type ExternalUrl<Domain extends `${string}.${string}` | "" = ""> =
  | `http://${Domain}${string}`
  | `https://${Domain}${string}`;

export type InternalUrl<Subpath extends string = ""> = `/${Subpath}${string}`;
