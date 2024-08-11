import { Nodebook } from "nodebook";
import { FC } from "react";
import { Nodes, CONFIG } from "./content/schema";
import { CONTENT } from "./content/content";

export const App: FC = () => {
  return (
    <Nodebook<Nodes>
      className="w-[100vw] h-[100vh] overflow-hidden relative"
      config={CONFIG}
      content={CONTENT}
    >
      <div className="absolute top-5 left-5 font-bold z-10">consciousness</div>
    </Nodebook>
  );
};
