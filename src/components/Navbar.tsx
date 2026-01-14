import { type ReactElement, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

type NavItem = {
  to: string,
  label: string;
}

function Navbar(): ReactElement {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    }
  }, [isMenuOpen]);

  function handleOpenMenu(): void {
    setIsMenuOpen(true);
  }

  function handleCloseMenu(): void {
    setIsMenuOpen(false);
  }

  const linkClasses: string = "px-2 py-1 text-sm font-medium transition hover:text-blue-400";
  const activeClasses: string = "text-blue-400 border-b-2 border-blue-400";

  const navItems: NavItem[] = [
    { to: "/home", label: "Home" },
    { to: "/about", label: "About Me" },
    { to: "/projects", label: "Projects" },
    { to: "/experience", label: "Experience" },
    { to: "/skills", label: "Skills" },
    { to: "/contact", label: "Contact Me" },
  ];

  return (
    <>
      {/* navbar for medium screens */}
      <nav className="w-full h-14 flex justify-center items-center bg-slate-800">
        <div className="w-[90%] h-full flex justify-between items-center">
          {/* header icon */}
          <div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full font-bold">
                K
              </div>
              <span className="text-xl font-semibold tracking-wide text-white">Karthi</span>
            </div>
          </div>

          {/* Nav links */}
          {/* big screens */}
          <div className="md:flex items-center gap-4 text-slate-400 hidden">
            {navItems.map((navItem: NavItem, index: number) => (
              <NavLink
                key={index}
                to={navItem.to}
                className={({ isActive }) => isActive
                  ? `${linkClasses} ${activeClasses}`
                  : `${linkClasses}`}
              >
                {navItem.label}
              </NavLink>
            ))}
          </div>

          {/* small screens */}
          <div className="md:hidden cursor-pointer">
            <Menu onClick={handleOpenMenu} />
          </div>
        </div>
      </nav>

      {/* menu items for < md screens */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        {/* backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={handleCloseMenu}
        >
          {/* sliding panel (top -> down) */}
          <div
            className={`absolute inset-0 bg-slate-900 transform transition-transform duration-300 ease-out ${
              isMenuOpen ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            {/* top bar inside menu */}
            <div className="h-14 px-5 flex items-center justify-between border-b border-slate-700">
              <span className="text-white font-semibold text-lg">Menu</span>
              <button
                type="button"
                className="text-slate-200 cursor-pointer"
                onClick={handleCloseMenu}
                aria-label="Close menu"
              >
                <X />
              </button>
            </div>

            {/* menu links */}
            <div className="px-6 py-6 flex flex-col items-center gap-4 text-slate-300">
              {navItems.map((navItem: NavItem, index: number) => (
                <NavLink
                  key={index}
                  to={navItem.to}
                  onClick={handleCloseMenu}
                  className={({ isActive }) => isActive
                    ? `${linkClasses} ${activeClasses}`
                    : `${linkClasses}`}
                >
                  {navItem.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
