import type { ReactElement } from "react";
import type { CertificateProvider } from "../data/CertificatesData.ts";

type CertificateFilterButtonProps = {
  children: string | ReactElement,
  category: CertificateProvider;
  activeCategory: CertificateProvider;
  handleClick: (category: CertificateProvider) => void;
}

function CertificateFilterButton(
  { children, handleClick, category, activeCategory }: CertificateFilterButtonProps
): ReactElement {
  let bgColor: string = "bg-linear-to-r from-blue-400 via-slate-400 to-violet-400";

  if (category === activeCategory) {
    bgColor = "bg-linear-to-br from-red-400 via-slate-400 to-violet-400";
  }

  return (
    <button
        className={`px-3 py-0.5 font-semibold text-sm md:text-lg rounded-lg ${bgColor}
         cursor-pointer hover:scale-105 active:scale-95 transition-all`}
      onClick={() => handleClick(category)}
    >
      {children}
    </button>
  );
}

export default CertificateFilterButton;
