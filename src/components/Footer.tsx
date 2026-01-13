import type { ReactElement } from "react";

function Footer(): ReactElement {
  return (
    <footer className="bg-slate-800 text-sm text-center text-gray-400 py-4 mt-auto">
      &copy; {new Date().getFullYear()} Karthi. All rights reserved.
    </footer>
  );
}

export default Footer;
