import type { ReactElement } from "react";
import { ArrowUpRight } from "lucide-react";
import type { CertificateProvider } from "../data/CertificatesData.ts";
import { certificatesGlow } from "../utils/CertificatesGlow.ts";

type CertificateProps = {
  label: string;
  url: string;
  category: CertificateProvider
}

function CertificateCard({label, url, category}: CertificateProps): ReactElement {
  // @ts-expect-error "glow of type any"
  const glow = certificatesGlow[category];
  const domain: string = new URL(url).hostname;
  const favicon: string = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group glass card-hover h-full p-5 md:p-6 flex flex-col gap-5 ${glow.border} ${glow.shadow}`}
    >
      {/* Link Preview */}
      <div className="flex items-center gap-3">
        <span className={`grid place-items-center size-11 shrink-0 rounded-xl ring-1 ${glow.tile}`}>
          <img src={favicon} alt={domain} className="w-6 h-6 rounded" />
        </span>
        <div className="min-w-0 grow text-xs text-subtle truncate">{url}</div>
        <ArrowUpRight
          size={18}
          className="shrink-0 text-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg"
        />
      </div>

      {/* Label & Provider */}
      <div className="flex grow flex-col gap-3">
        <h3 className="font-display text-base md:text-lg font-bold leading-snug wrap-break-word">{label}</h3>
        <p className={`mt-auto w-fit chip ${glow.icon}`}>
          🎓 {category}
        </p>
      </div>
    </a>
  );
}

export default CertificateCard;
