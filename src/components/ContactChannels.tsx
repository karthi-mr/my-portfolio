import type { ReactElement, ReactNode } from "react";
import { ArrowUpRight, Check, Copy, FileText, Mail, Phone } from "lucide-react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { CONTACT } from "../data/ContactData.ts";
import { useCopyToClipboard } from "../hooks/useCopyToClipboard.ts";

type Channel = {
  label: string;
  value: string;
  href: string;
  icon: ReactNode;
  tint: string;
  external?: boolean;
}

const channels: Channel[] = [
  { label: "Phone", value: CONTACT.phoneDisplay, href: CONTACT.phoneLink, icon: <Phone size={18} />, tint: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300" },
  { label: "WhatsApp", value: "Chat on WhatsApp", href: CONTACT.whatsapp, icon: <FaWhatsapp aria-hidden="true" size={18} />, tint: "bg-green-500/10 text-green-700 dark:text-green-400", external: true },
  { label: "LinkedIn", value: "linkedin.com/in/karthi-mr", href: CONTACT.linkedin, icon: <FaLinkedin aria-hidden="true" size={18} />, tint: "bg-blue-500/10 text-blue-700 dark:text-blue-400", external: true },
  { label: "GitHub", value: "github.com/karthi-mr", href: CONTACT.github, icon: <FaGithub aria-hidden="true" size={18} />, tint: "bg-fg/5 text-fg", external: true },
  { label: "Resume", value: "View my resume", href: CONTACT.resume, icon: <FileText size={18} />, tint: "bg-amber-500/10 text-amber-800 dark:text-amber-300", external: true },
];

/** "Reach me directly" panel shown next to the contact form. */
function ContactChannels(): ReactElement {
  const [copyState, copy] = useCopyToClipboard();

  return (
    <aside className="glass p-6 md:p-8 flex flex-col gap-5 h-full" aria-labelledby="reach-me">
      <div>
        <h2 id="reach-me" className="font-display text-xl md:text-2xl font-bold tracking-tight">Reach me directly</h2>
        <p className="mt-1 text-sm text-muted">Prefer email or LinkedIn? Use whichever suits you.</p>
      </div>

      {/* email: copy or open mail app */}
      <div className="flex items-center gap-3 rounded-2xl ring-1 ring-line p-3">
        <span className="grid place-items-center size-11 shrink-0 rounded-xl bg-indigo-500/10 text-indigo-700 dark:text-indigo-300">
          <Mail size={18} />
        </span>
        <div className="min-w-0 grow">
          <p className="text-xs font-semibold text-subtle">Email</p>
          <a href={`mailto:${CONTACT.email}`} className="block font-medium hover:underline underline-offset-4">
            {/* if the address must wrap, wrap it after the "@" instead of mid-word */}
            {CONTACT.email.split("@")[0]}@<wbr />{CONTACT.email.split("@")[1]}
          </a>
        </div>
        <button
          type="button"
          onClick={() => copy(CONTACT.email)}
          className="btn btn-secondary btn-sm shrink-0 px-3!"
          aria-label={copyState === "copied" ? "Email address copied" : "Copy email address"}
        >
          {copyState === "copied" ? <Check size={15} className="text-emerald-600 dark:text-emerald-400" /> : <Copy size={15} />}
          <span aria-live="polite">{copyState === "copied" ? "Copied" : "Copy"}</span>
        </button>
      </div>

      <ul className="flex flex-col gap-2">
        {channels.map((channel: Channel) => (
          <li key={channel.label}>
            <a
              href={channel.href}
              {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group flex items-center gap-3 rounded-2xl p-3 ring-1 ring-transparent hover:ring-line hover:bg-fg/[0.03] transition-colors"
            >
              <span className={`grid place-items-center size-11 shrink-0 rounded-xl ${channel.tint}`}>{channel.icon}</span>
              <span className="min-w-0 grow">
                <span className="block text-xs font-semibold text-subtle">{channel.label}</span>
                <span className="block truncate font-medium">{channel.value}</span>
              </span>
              <ArrowUpRight size={16} className="shrink-0 text-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg" />
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default ContactChannels;
