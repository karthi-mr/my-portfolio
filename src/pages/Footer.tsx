import type { ReactElement } from "react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const socialClasses: string = "icon-btn hover:text-white! hover:border-transparent! hover:bg-brand hover:-translate-y-0.5";

function Footer(): ReactElement {
  return (
    <footer className="mt-auto border-t border-line bg-surface backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-5">
        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} Karthi. All rights reserved.
        </p>

        <div className="flex justify-center gap-2">
          <a
            href="https://github.com/karthi-mr"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            title="GitHub"
            className={socialClasses}
          >
            <FaGithub size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/karthi-mr"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
            className={socialClasses}
          >
            <FaLinkedin size={18} />
          </a>
          <a
            href="https://wa.me/917708006145"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            title="WhatsApp"
            className={`${socialClasses} text-green-500!`}
          >
            <FaWhatsapp size={18} />
          </a>
          <a
            href="mailto:mkarthim1998@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email"
            title="Email"
            className={socialClasses}
          >
            <MdEmail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
