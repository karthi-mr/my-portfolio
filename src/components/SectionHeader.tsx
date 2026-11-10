import type { ReactElement } from "react";
import { motion } from "framer-motion";

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  className?: string;
}

function SectionHeader({ title, subtitle, className = "" }: SectionHeaderProps): ReactElement {
  return (
    <motion.header
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`flex flex-col items-center text-center ${className}`}
    >
      <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-gradient pb-1">
        {title}
      </h1>
      <div className="mt-4 h-1 w-16 rounded-full bg-brand" />
      {subtitle && (
        <p className="mt-4 max-w-xl text-sm md:text-base text-muted">
          {subtitle}
        </p>
      )}
    </motion.header>
  );
}

export default SectionHeader;
