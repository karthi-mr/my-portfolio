import type { ReactElement } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Layout from "./pages/Layout.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import Skills from "./pages/Skills.tsx";
import Experience from "./pages/Experience.tsx";
import Projects from "./pages/Projects.tsx";
import CursorHighlight from "./pages/CursorHighlight.tsx";

function App(): ReactElement {
  return (
    <>
      <CursorHighlight />
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Layout><Home /></Layout>} />
          <Route path="/projects" element={<Layout><Projects /></Layout>} />
          <Route path="/experience" element={<Layout><Experience /></Layout>} />
          <Route path="/skills" element={<Layout><Skills /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
