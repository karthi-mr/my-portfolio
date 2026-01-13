import type { ReactElement } from "react";
import Navbar from "./Navbar.tsx";

type LayoutProps = {
  children: ReactElement
}

function Layout({ children }: LayoutProps): ReactElement {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="grow flex flex-col min-h-0">
        {children}
      </main>
    </div>
  );
}

export default Layout;
