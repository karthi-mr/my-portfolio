import { lazy, type ReactElement } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout.tsx";
import CursorHighlight from "./pages/CursorHighlight.tsx";
import ScrollToTop from "./utils/ScrollToTop.tsx";
import RouteMeta from "./utils/RouteMeta.tsx";

// each page is loaded only when it is first opened (smaller initial download)
const Home = lazy(() => import("./pages/Home.tsx"));
const About = lazy(() => import("./pages/About.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));
const Skills = lazy(() => import("./pages/Skills.tsx"));
const Experience = lazy(() => import("./pages/Experience.tsx"));
const Projects = lazy(() => import("./pages/Projects.tsx"));
const Certificates = lazy(() => import("./pages/Certificates.tsx"));

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
