import { type ReactElement, useMemo, useState } from "react";
import { type CertificateData, type CertificateProvider, certificatesData } from "../data/CertificatesData.ts";
import CertificateFilterButton from "../components/CertificateFilterButton.tsx";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../utils/FramerUtils.ts";
import SectionHeader from "../components/SectionHeader.tsx";
import CertificateCard from "../components/CertificateCard.tsx";

function Certificates(): ReactElement {
  const [activeCategory, setActiveCategory] = useState<CertificateProvider>("All");

  const filteredCertificates = useMemo(() => {
    if (activeCategory === "All") return certificatesData;
    return certificatesData.filter((certificateData: CertificateData) =>
      certificateData.certificateProvider === activeCategory);
  }, [activeCategory]);

  function handleCategorySearch(category: CertificateProvider): void {
    setActiveCategory(category);
  }

  return (
    <section className="grow flex flex-col items-center gap-10">
      <SectionHeader
        title="Achievements & Certifications"
        subtitle="Certifications & Achievements"
      />

      {/* filter */}
      <div
        className="glass p-1.5 flex flex-wrap justify-center items-center gap-1"
      >
        <CertificateFilterButton
          category="All"
          handleClick={handleCategorySearch}
          activeCategory={activeCategory}
        >
          All
        </CertificateFilterButton>
        <CertificateFilterButton
          category="Udemy"
          handleClick={handleCategorySearch}
          activeCategory={activeCategory}
        >
          Udemy
        </CertificateFilterButton>
        <CertificateFilterButton
          category="CodeChef"
          handleClick={handleCategorySearch}
          activeCategory={activeCategory}
        >
          CodeChef
        </CertificateFilterButton>
        <CertificateFilterButton
          category="Hackerrank"
          handleClick={handleCategorySearch}
          activeCategory={activeCategory}
        >
          Hackerrank
        </CertificateFilterButton>
        <CertificateFilterButton
          category="LinkedIn"
          handleClick={handleCategorySearch}
          activeCategory={activeCategory}
        >
          LinkedIn
        </CertificateFilterButton>
      </div>

      {/* Staggered grid */}
      <motion.div
        key={activeCategory}
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5"
      >
        {filteredCertificates.map((certificate: CertificateData) => (
          <motion.div
            key={certificate.url}
            variants={itemVariants}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <CertificateCard
              label={certificate.label}
              url={certificate.url}
              category={certificate.certificateProvider}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default Certificates;
