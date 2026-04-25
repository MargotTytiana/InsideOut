import { createBrowserRouter, Outlet } from "react-router";
import { Navbar } from "./components/Navbar";
import { CustomCursor } from "./components/CustomCursor";
import { Home } from "./pages/Home";
import { ProjectDetail } from "./pages/ProjectDetail";

function Root() {
  return (
    <div>
      <CustomCursor />
      <Navbar />
      <Outlet />
    </div>
  );
}

function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FAF0F3",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Playfair Display, serif",
        color: "#674D66",
        fontSize: "1.5rem",
        fontStyle: "italic",
      }}
    >
      Page not found.
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "project/:id", Component: ProjectDetail },
      { path: "*", Component: NotFound },
    ],
  },
]);
