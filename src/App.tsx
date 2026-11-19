import type { ReactElement } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout.tsx";
import CursorHighlight from "./pages/CursorHighlight.tsx";
import ScrollToTop from "./utils/ScrollToTop.tsx";
import RouteMeta from "./utils/RouteMeta.tsx";
import { lazyWithReload } from "./utils/lazyWithReload.ts";

// each page is loaded only when it is first opened (smaller initial download);
// if its code fails to download (e.g. right after a deploy) the page reloads once
const Home = lazyWithReload(() => import("./pages/Home.tsx"));
const About = lazyWithReload(() => import("./pages/About.tsx"));
const Contact = lazyWithReload(() => import("./pages/Contact.tsx"));
const Skills = lazyWithReload(() => import("./pages/Skills.tsx"));
const Experience = lazyWithReload(() => import("./pages/Experience.tsx"));
const Projects = lazyWithReload(() => import("./pages/Projects.tsx"));
const Certificates = lazyWithReload(() => import("./pages/Certificates.tsx"));

function App(): ReactElement {
  return (
    <>
      <CursorHighlight />
      <BrowserRouter>
        <ScrollToTop />
        <RouteMeta />
        <Routes>
          <Route path="*" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Layout><Home /></Layout>} />
          <Route path="/projects" element={<Layout><Projects /></Layout>} />
          <Route path="/experience" element={<Layout><Experience /></Layout>} />
          <Route path="/skills" element={<Layout><Skills /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/certificates" element={<Layout><Certificates /></Layout>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
