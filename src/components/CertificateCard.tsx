import type { CSSProperties, ReactElement } from "react";
import { ArrowUpRight } from "lucide-react";
import type { CertificateProvider } from "../data/CertificatesData.ts";
import { getProviderBrand, type ProviderBrand } from "../utils/CertificatesGlow.ts";

type CertificateProps = {
  label: string;
  url: string;
  category: CertificateProvider
}

function CertificateCard({label, url, category}: CertificateProps): ReactElement {
  const glow: ProviderBrand = getProviderBrand(category);
  const domain: string = new URL(url).hostname;
  const favicon: string = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  const style = {
    "--accent": glow.color,
    ...(glow.light ? { "--accent-light": glow.light } : {}),
  } as CSSProperties;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={style}
      className="group relative overflow-hidden glass brand-card h-full p-4 sm:p-5 md:p-6 flex flex-col gap-3 sm:gap-5"
    >
      {/* brand accent */}
      <span className="absolute inset-x-0 top-0 h-1 bg-[var(--accent)] light:bg-[var(--accent-light,var(--accent))] opacity-70" />

      {/* Link Preview */}
      <div className="flex items-center gap-3">
        <span className="grid place-items-center size-10 sm:size-12 shrink-0 rounded-xl bg-white shadow-sm ring-1 ring-black/5">
          <img src={favicon} alt={domain} loading="lazy" decoding="async" className="w-6 h-6 sm:w-7 sm:h-7 rounded" />
        </span>
        <div className="min-w-0 grow text-xs text-subtle truncate">{url}</div>
        <ArrowUpRight
          size={18}
          className="shrink-0 text-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg"
        />
      </div>

      {/* Label & Provider */}
      <div className="flex grow flex-col gap-2 sm:gap-3">
        <h3 className="font-display text-base md:text-lg font-bold leading-snug wrap-break-word">{label}</h3>
        <p className="brand-tile brand-icon mt-auto w-fit inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold">
          🎓 {category}
        </p>
      </div>
    </a>
  );
}

export default CertificateCard;
