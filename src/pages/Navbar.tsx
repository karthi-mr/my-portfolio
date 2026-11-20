import { type ReactElement, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle.tsx";
import { type NavItem, navItems } from "../data/NavItems.ts";

function Navbar(): ReactElement {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const openButtonRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  // while the menu is open it behaves like a dialog: the page behind it can't scroll,
  // can't be focused or clicked (inert), Esc closes it, and focus moves into / back out of it
  useEffect(() => {
    if (!isMenuOpen) return;

    document.body.style.overflow = "hidden";
    const background: Element[] = [...document.querySelectorAll("header, main, footer")];
    background.forEach(element => element.setAttribute("inert", ""));
    closeButtonRef.current?.focus();

    function handleKey(event: KeyboardEvent): void {
      if (event.key === "Escape") setIsMenuOpen(false);
    }
    document.addEventListener("keydown", handleKey);

    const openButton: HTMLButtonElement | null = openButtonRef.current;
    return () => {
      document.body.style.overflow = "";
      background.forEach(element => element.removeAttribute("inert"));
      document.removeEventListener("keydown", handleKey);
      openButton?.focus();
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleOpenMenu(): void {
    setIsMenuOpen(true);
  }

  function handleCloseMenu(): void {
    setIsMenuOpen(false);
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 sm:px-5 pt-3 md:pt-4">
        <nav
          className={`mx-auto max-w-6xl h-14 md:h-16 flex items-center justify-between gap-4 px-3 md:px-4
          glass rounded-2xl transition-shadow duration-300 ${isScrolled ? "shadow-xl" : ""}`}
        >
          {/* header icon */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div
              className="size-9 bg-brand text-white grid place-items-center rounded-xl font-display font-bold
              shadow-lg shadow-indigo-500/30"
            >
              K
            </div>
            <span className="font-display text-lg font-bold tracking-tight">Karthi</span>
          </div>

          {/* Nav links (large screens) */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navItems.map((navItem: NavItem) => (
              <NavLink
                key={navItem.to}
                to={navItem.to}
                className={({ isActive }) => `relative px-3 py-2 text-[13px] xl:text-sm font-medium rounded-lg
                whitespace-nowrap transition-colors ${isActive ? "text-fg" : "text-muted hover:text-fg"}`}
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-lg bg-fg/[0.07] ring-1 ring-line"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{navItem.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <ThemeToggle />

            {/* small screens */}
            <button
              type="button"
              className="icon-btn lg:hidden"
              ref={openButtonRef}
              onClick={handleOpenMenu}
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </nav>
      </header>

      {/* menu items for < lg screens */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* backdrop */}
            <div className="absolute inset-0 bg-bg/70 backdrop-blur-md" onClick={handleCloseMenu} />

            {/* panel */}
            <motion.div
              initial={{ y: -24, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -24, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="relative m-3 p-3 glass bg-surface-strong max-h-[calc(100dvh-1.5rem)] overflow-y-auto overscroll-contain"
            >
              {/* top bar inside menu */}
              <div className="flex items-center justify-between px-2 pb-3 mb-2 border-b border-line">
                <span className="font-display font-semibold text-lg">Menu</span>
                <button
                  ref={closeButtonRef}
                  type="button"
                  className="icon-btn"
                  onClick={handleCloseMenu}
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* menu links */}
              <div className="flex flex-col gap-1">
                {navItems.map((navItem: NavItem, index: number) => (
                  <motion.div
                    key={navItem.to}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * index }}
                  >
                    <NavLink
                      to={navItem.to}
                      onClick={handleCloseMenu}
                      className={({ isActive }) => `flex items-center justify-between rounded-xl px-4 py-3
                      text-base font-medium transition-colors ${isActive
                        ? "bg-brand text-white shadow-lg shadow-indigo-500/25"
                        : "text-muted hover:text-fg hover:bg-fg/5"}`}
                    >
                      {navItem.label}
                      <ArrowUpRight size={16} className="opacity-60" />
                    </NavLink>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
