import { FC } from "react";
import { Header } from "./header";
import { Outlet } from "react-router-dom";

export const Layout: FC = () => {
  return (
    <div className="w-[100vw] h-[100vh] overflow-hidden grid grid-rows-m1">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
