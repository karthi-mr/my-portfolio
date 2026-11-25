import type { ReactElement } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Home } from "lucide-react";
import { navItems, type NavItem } from "../data/NavItems.ts";

/** Shown for any URL that isn't a page (e.g. a mistyped or old link). */
function NotFound(): ReactElement {
  const { pathname } = useLocation();

  return (
    <section className="grow flex flex-col items-center justify-center gap-10 text-center py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-5"
      >
        <p className="font-display text-7xl md:text-9xl font-extrabold tracking-tight text-gradient pb-2" aria-hidden="true">
          404
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">Page not found</h1>
        <p className="max-w-md text-muted">
          There is no page at <code className="break-all rounded-md bg-fg/[0.06] px-1.5 py-0.5 text-fg">{pathname}</code>.
          The link may be mistyped or out of date.
        </p>
        <Link to="/home" className="btn btn-primary group">
          <Home aria-hidden="true" size={18} />
          Go to the home page
        </Link>
      </motion.div>

      <nav aria-label="All pages" className="w-full max-w-2xl">
        <p className="mb-4 text-sm font-medium text-subtle">Or open a page:</p>
        <ul className="flex flex-wrap justify-center gap-3">
          {navItems
            .filter((item: NavItem) => item.to !== "/home")
            .map((item: NavItem) => (
              <li key={item.to}>
                <Link to={item.to} className="btn btn-secondary btn-sm group">
                  {item.label}
                  <ArrowRight aria-hidden="true" size={14} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
        </ul>
      </nav>
    </section>
  );
}

export default NotFound;
