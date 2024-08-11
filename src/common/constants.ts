import { ExternalUrl, InternalUrl } from "./types";

export const ROUTES = {
  index: "/",
  about: "/about",
  github: "https://github.com/abstractalgo/nodebook",
} as const satisfies Record<string, InternalUrl | ExternalUrl>;
