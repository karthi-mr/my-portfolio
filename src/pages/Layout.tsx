import type { ReactElement } from "react";
import Navbar from "./Navbar.tsx";
import Footer from "./Footer.tsx";

type LayoutProps = {
  children: ReactElement
}

function Background(): ReactElement {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-grid" />
      <div className="aurora-blob -top-40 -left-32 h-[32rem] w-[32rem] bg-indigo-600" />
      <div
        className="aurora-blob top-1/3 -right-40 h-[28rem] w-[28rem] bg-cyan-500"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="aurora-blob -bottom-48 left-1/4 h-[30rem] w-[30rem] bg-violet-600"
        style={{ animationDelay: "-12s" }}
      />
    </div>
  );
}

function Layout({ children }: LayoutProps): ReactElement {
  return (
    <div className="relative isolate min-h-screen flex flex-col">
      <Background />
      <Navbar />
      <main className="grow flex flex-col min-h-0 w-full max-w-6xl mx-auto px-5 sm:px-8 pt-28 md:pt-32 pb-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
