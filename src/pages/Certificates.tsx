import { type ReactElement, useMemo, useState } from "react";
import { type CertificateData, type CertificateProvider, certificatesData } from "../data/CertificatesData.ts";
import CertificateFilterButton from "../components/CertificateFilterButton.tsx";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../utils/FramerUtils.ts";
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
    <section className="grow flex flex-col items-center justify-start py-6">
      {/* title */}
      <div className="text-sm md:text-lg text-center">
        <h1
          className="text-2xl md:text-5xl tracking-wide mb-3 font-bold bg-linear-to-r
          from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent uppercase"
        >
          Certificates
        </h1>
        <hr
          className="w-full h-0.5 border-0 bg-linear-to-r from-blue-400 via-purple-400 to-cyan-400"
        />
        <p className="my-4 text-slate-400 text-xs md:text-sm">
          Certificates I have earned
        </p>
      </div>

      {/* filter */}
      <div
        className="flex justify-center items-center px-4 py-2.5 gap-3 mb-4 bg-slate-800/90 rounded-2xl text-black"
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
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="w-[90%] md:w-[80%] grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6"
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
