import type { ReactElement } from "react";
import { motion } from "framer-motion";
import type { CertificateProvider } from "../data/CertificatesData.ts";

type CertificateFilterButtonProps = {
  children: string | ReactElement,
  category: CertificateProvider;
  activeCategory: CertificateProvider;
  handleClick: (category: CertificateProvider) => void;
}

function CertificateFilterButton({ children, handleClick, category, activeCategory }: CertificateFilterButtonProps): ReactElement {
  const isActive: boolean = category === activeCategory;

  return (
    <button
      className={`relative px-4 py-2 text-sm md:text-base font-semibold rounded-xl cursor-pointer
      transition-colors active:scale-95 ${isActive ? "text-white" : "text-muted hover:text-fg"}`}
      onClick={() => handleClick(category)}
    >
      {isActive && (
        <motion.span
          layoutId="certificate-filter-pill"
          className="absolute inset-0 rounded-xl bg-brand shadow-lg shadow-indigo-500/30"
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        />
      )}
      <span className="relative">{children}</span>
    </button>
  );
}

export default CertificateFilterButton;
