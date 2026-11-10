import type { ReactElement } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { type ThemePreference, useTheme } from "../utils/useTheme.ts";

const NEXT: Record<ThemePreference, ThemePreference> = {
  system: "light",
  light: "dark",
  dark: "system",
};

const LABEL: Record<ThemePreference, string> = {
  system: "System theme",
  light: "Light theme",
  dark: "Dark theme",
};

function ThemeToggle(): ReactElement {
  const [preference, setPreference] = useTheme();
  const Icon = preference === "light" ? Sun : preference === "dark" ? Moon : Monitor;

  return (
    <button
      type="button"
      onClick={() => setPreference(NEXT[preference])}
      className="p-1.5 rounded-full text-slate-400 hover:text-blue-400 light:text-slate-600 light:hover:text-blue-600
      transition cursor-pointer"
      aria-label={`${LABEL[preference]} (click to switch to ${LABEL[NEXT[preference]].toLowerCase()})`}
      title={LABEL[preference]}
    >
      <Icon size={18} />
    </button>
  );
}

export default ThemeToggle;
