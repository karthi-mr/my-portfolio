import { type ReactElement, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SearchX } from "lucide-react";
import { type CertificateData, certificatesData } from "../data/CertificatesData.ts";
import SectionHeader from "../components/SectionHeader.tsx";
import CertificateCard from "../components/CertificateCard.tsx";
import MultiSelectFilter, { type FilterOption } from "../components/MultiSelectFilter.tsx";
import { getProviderIcon } from "../utils/FilterIcons.tsx";

function Certificates(): ReactElement {
  // empty selection = show every platform
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [query, setQuery] = useState<string>("");

  // filter options are built from the data, so new platforms show up automatically
  const providerOptions: FilterOption[] = useMemo(() => {
    const groups = new Map<string, { count: number; sampleUrl: string }>();
    certificatesData.forEach((certificate: CertificateData) => {
      const group = groups.get(certificate.certificateProvider);
      if (group) group.count += 1;
      else groups.set(certificate.certificateProvider, { count: 1, sampleUrl: certificate.url });
    });
    return [...groups.entries()]
      .map(([provider, { count, sampleUrl }]) => ({
        value: provider,
        label: provider,
        count,
        icon: getProviderIcon(sampleUrl),
      }))
      .sort((a, b) => b.count - a.count);
  }, []);

  const filteredCertificates: CertificateData[] = useMemo(() => {
    const q: string = query.trim().toLowerCase();
    return certificatesData.filter((certificate: CertificateData) =>
      (selectedProviders.length === 0 || selectedProviders.includes(certificate.certificateProvider))
      && (!q
        || certificate.label.toLowerCase().includes(q)
        || certificate.certificateProvider.toLowerCase().includes(q)));
  }, [selectedProviders, query]);

  return (
    <section className="grow flex flex-col items-center gap-10">
      <SectionHeader
        title="Achievements & Certifications"
        subtitle="Certifications & Achievements"
      />

      {/* filter */}
      <MultiSelectFilter
        title="Platform"
        options={providerOptions}
        selected={selectedProviders}
        onSelectedChange={setSelectedProviders}
        query={query}
        onQueryChange={setQuery}
        searchPlaceholder="Search certificates..."
        shownCount={filteredCertificates.length}
        totalCount={certificatesData.length}
      />

      {/* Staggered grid */}
      {filteredCertificates.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredCertificates.map((certificate: CertificateData, index: number) => (
              <motion.div
                key={certificate.url}
                layout
                initial={{ opacity: 0, y: 14, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.15 } }}
                transition={{ duration: 0.35, ease: "easeOut", delay: Math.min(index * 0.03, 0.3) }}
              >
                <CertificateCard
                  label={certificate.label}
                  url={certificate.url}
                  category={certificate.certificateProvider}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="flex flex-col items-center gap-3 py-16 text-center text-muted">
          <SearchX size={40} className="text-subtle" />
          <p>No certificates match your filters.</p>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => { setSelectedProviders([]); setQuery(""); }}
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
}

export default Certificates;
