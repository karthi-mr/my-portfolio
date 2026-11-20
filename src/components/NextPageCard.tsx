import type { ReactElement } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Home } from "lucide-react";
import { type NavItem, navItems } from "../data/NavItems.ts";

/** "Next: <page>" card at the end of every page, so visitors are guided through the whole site. */
function NextPageCard(): ReactElement | null {
  const { pathname } = useLocation();
  const index: number = navItems.findIndex((item: NavItem) => item.to === pathname);
  if (index < 0) return null;

  const isLast: boolean = index === navItems.length - 1;
  const next: NavItem = navItems[(index + 1) % navItems.length];

  return (
    <nav aria-label="Next page" className="mt-20 md:mt-28">
      <Link
        to={next.to}
        className="group glass card-hover flex items-center justify-between gap-4 p-5 md:p-7 overflow-hidden relative"
      >
        <span className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-brand opacity-15 blur-3xl" />
        <span className="relative flex flex-col gap-1 min-w-0">
          <span className="text-xs font-semibold uppercase tracking-widest text-subtle">
            {isLast ? "Back to start" : "Next"}
          </span>
          <span className="font-display text-xl md:text-3xl font-extrabold tracking-tight">{next.label}</span>
          <span className="text-sm md:text-base text-muted truncate">{next.teaser}</span>
        </span>
        <span className="relative grid place-items-center size-12 md:size-14 shrink-0 rounded-2xl bg-brand text-white shadow-lg shadow-indigo-500/30 transition-transform group-hover:translate-x-1">
          {isLast ? <Home size={22} /> : <ArrowRight size={22} />}
        </span>
      </Link>
    </nav>
  );
}

export default NextPageCard;
