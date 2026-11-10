import type { ReactElement } from "react";
import {
  BarChart3,
  Brain,
  Cloud,
  Database,
  FlaskConical,
  Monitor,
  Server,
  Smartphone,
  Tag,
  Wrench,
} from "lucide-react";

/** Icon for a skill category. Unknown (newly added) categories fall back to a tag icon. */
export function getCategoryIcon(category: string, size: number = 15): ReactElement {
  const key: string = category.toLowerCase();

  if (key.includes("front")) return <Monitor size={size} />;
  if (key.includes("back")) return <Server size={size} />;
  if (key.includes("data science") || key.includes("analytic") || key.includes("visual")) return <BarChart3 size={size} />;
  if (key.includes("database") || key === "db" || key.includes("sql")) return <Database size={size} />;
  if (key.includes("test")) return <FlaskConical size={size} />;
  if (key.includes("tool") || key.includes("devops")) return <Wrench size={size} />;
  if (key.includes("ai") || key.includes("ml") || key.includes("machine") || key.includes("deep")) return <Brain size={size} />;
  if (key.includes("cloud")) return <Cloud size={size} />;
  if (key.includes("mobile")) return <Smartphone size={size} />;
  return <Tag size={size} />;
}

/** Favicon of a certificate provider, taken from one of its certificate URLs. */
export function getProviderIcon(sampleUrl: string, size: number = 16): ReactElement {
  let domain: string = "";
  try {
    domain = new URL(sampleUrl).hostname;
  } catch {
    // invalid URL: fall back to a blank tile
  }

  return (
    <span className="grid place-items-center rounded-md bg-white" style={{ width: size + 6, height: size + 6 }}>
      {domain && (
        <img
          src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
          alt=""
          className="rounded-sm"
          style={{ width: size, height: size }}
        />
      )}
    </span>
  );
}
