import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { IndexPage } from "./pages/index";
import { AboutPage } from "./pages/about";

const router = createBrowserRouter([
  {
    path: "/",
    Component: IndexPage,
  },
  {
    path: "about",
    Component: AboutPage,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
