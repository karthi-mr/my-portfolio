import type { ReactElement } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home.tsx";
import Layout from "./components/Layout.tsx";
import About from "./components/About.tsx";
import Contact from "./components/Contact.tsx";
import Skills from "./components/Skills.tsx";
import Experience from "./components/Experience.tsx";
import Projects from "./components/Projects.tsx";
import CursorHighlight from "./components/CursorHighlight.tsx";

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
