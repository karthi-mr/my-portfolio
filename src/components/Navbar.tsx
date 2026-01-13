import type { ReactElement } from "react";
import { NavLink } from "react-router-dom";

function Navbar(): ReactElement {
  const linkClasses: string = "px-2 py-1 text-sm font-medium transition hover:text-blue-400";
  const activeClasses: string = "text-blue-400 border-b-2 border-blue-400";

  return (
    <nav className="w-full h-14 flex justify-center items-center bg-slate-800">
      <div className="w-[90%] h-full flex justify-between items-center">
        {/* header icon */}
        <div>
          <span
            className="text-2xl italic font-bold bg-linear-to-br from-purple-500 to-yellow-500 text-black"
          >
            My Portfolio
          </span>
        </div>

        {/* Nav links */}
        <div className="flex items-center gap-4 text-slate-400">
          <NavLink
            to={"/home"}
            className={({ isActive }) => isActive
              ? `${linkClasses} ${activeClasses}`
              : `${linkClasses}`}
          >
            Home
          </NavLink>
          <NavLink
            to={"/about"}
            className={({ isActive }) => isActive
              ? `${linkClasses} ${activeClasses}`
              : `${linkClasses}`}
          >
            About Me
          </NavLink>
          <NavLink
            to={"/projects"}
            className={({ isActive }) => isActive
              ? `${linkClasses} ${activeClasses}`
              : `${linkClasses}`}
          >
            Projects
          </NavLink>
          <NavLink
            to={"/experience"}
            className={({ isActive }) => isActive
              ? `${linkClasses} ${activeClasses}`
              : `${linkClasses}`}
          >
            Experience
          </NavLink>
          <NavLink
            to={"/skills"}
            className={({ isActive }) => isActive
              ? `${linkClasses} ${activeClasses}`
              : `${linkClasses}`}
          >
            Skills
          </NavLink>
          <NavLink
            to={"/contact"}
            className={({ isActive }) => isActive
              ? `${linkClasses} ${activeClasses}`
              : `${linkClasses}`}
          >
            Contact Me
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
