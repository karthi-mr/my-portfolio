import type { ReactElement } from "react";
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
    <div
      className={`bg-slate-900/60 border border-slate-800 rounded- transition-all duration-300 h-full
      ${glow.border} ${glow.shadow} hover:translate-y-1 text-lg md:text-2xl shadow-sm inset-shadow-xs auto-rows-fr 
      p-6 text-wrap`}
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-2 wrap-break-word"
      >
        {/* Link Preview */}
        <div className="flex items-center gap-3 border-b border-slate-700 pb-3">
          <img src={favicon} alt={domain} className="w-6 h-6" />
          <div className="text-sm text-slate-300 truncate">{url}</div>
        </div>

        {/* Label & Provider */}
        <div className="pt-3">
          <h3 className="text-base font-semibold text-white">{label}</h3>
          <p className="text-sm text-slate-400 mt-1">
            🎓 {category}
          </p>
        </div>
      </a>
    </div>
  );
}

export default CertificateCard;
