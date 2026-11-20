import type { ReactElement } from "react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { type NavItem, navItems } from "../data/NavItems.ts";
import { CONTACT } from "../data/ContactData.ts";

const socialClasses: string = "icon-btn hover:text-white! hover:border-transparent! hover:bg-brand hover:-translate-y-0.5";

function Footer(): ReactElement {
  return (
    <footer className="mt-auto border-t border-line bg-surface backdrop-blur-xl">
      {/* quick links */}
      <nav aria-label="Footer" className="mx-auto max-w-6xl px-5 sm:px-8 pt-8">
        <ul className="flex flex-wrap justify-center sm:justify-start gap-x-5 gap-y-2 text-sm">
          {navItems.map((item: NavItem) => (
            <li key={item.to}>
              <Link to={item.to} className="text-muted hover:text-fg underline-offset-4 hover:underline transition-colors">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-5">
        <p className="text-sm text-muted text-center sm:text-left">
          &copy; {new Date().getFullYear()} Karthi · Senior Data Scientist. All rights reserved.
        </p>

        <div className="flex justify-center gap-2">
          <a
            href={CONTACT.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            title="GitHub"
            className={socialClasses}
          >
            <FaGithub aria-hidden="true" size={18} />
          </a>
          <a
            href={CONTACT.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
            className={socialClasses}
          >
            <FaLinkedin aria-hidden="true" size={18} />
          </a>
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            title="WhatsApp"
            className={`${socialClasses} text-green-500!`}
          >
            <FaWhatsapp aria-hidden="true" size={18} />
          </a>
          <a
            href={`mailto:${CONTACT.email}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email"
            title="Email"
            className={socialClasses}
          >
            <MdEmail aria-hidden="true" size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
