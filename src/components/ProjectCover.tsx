import type { ReactElement } from "react";
import { Code2 } from "lucide-react";

type ProjectCoverProps = {
  title: string;
  techStacks: string[];
}

// gradient pairs picked per project so each cover looks different but stays on-brand
const palettes: [string, string, string][] = [
  ["#4f46e5", "#7c3aed", "#06b6d4"],
  ["#0ea5e9", "#6366f1", "#a855f7"],
  ["#7c3aed", "#db2777", "#f59e0b"],
  ["#059669", "#0891b2", "#6366f1"],
  ["#2563eb", "#0d9488", "#84cc16"],
  ["#9333ea", "#4f46e5", "#0ea5e9"],
];

function hash(text: string): number {
  let value = 0;
  for (let i = 0; i < text.length; i++) value = (value * 31 + text.charCodeAt(i)) >>> 0;
  return value;
}

/** Generated cover shown for projects that have no screenshots. */
function ProjectCover({ title, techStacks }: ProjectCoverProps): ReactElement {
  const [from, via, to] = palettes[hash(title) % palettes.length];
  // short title: text before an en dash / hyphen separator, e.g. "WebSockets Demo"
  const shortTitle: string = title.split(/\s[–-]\s/)[0];

  return (
    <div
      role="img"
      aria-label={title}
      className="relative h-full w-full overflow-hidden"
      style={{ backgroundImage: `linear-gradient(135deg, ${from} 0%, ${via} 55%, ${to} 100%)` }}
    >
      {/* dotted pattern + soft shapes */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
      <div className="absolute -right-10 -top-10 size-40 rounded-full bg-white/15 blur-2xl" />
      <div className="absolute -bottom-16 -left-10 size-44 rounded-full bg-black/20 blur-2xl" />

      <div className="relative h-full flex flex-col justify-between p-5 text-white">
        <span className="grid place-items-center size-10 rounded-xl bg-white/15 ring-1 ring-white/25 backdrop-blur-sm">
          <Code2 size={20} />
        </span>
        <div className="flex flex-col gap-3">
          <span className="font-display text-xl md:text-2xl font-extrabold leading-tight tracking-tight drop-shadow-sm line-clamp-2">
            {shortTitle}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {techStacks.slice(0, 3).map((techStack: string) => (
              <span
                key={techStack}
                className="rounded-md bg-white/15 px-2 py-0.5 text-xs font-semibold ring-1 ring-white/20 backdrop-blur-sm"
              >
                {techStack}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCover;
