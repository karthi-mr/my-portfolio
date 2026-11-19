import type { ReactElement } from "react";
import { motion } from "framer-motion";

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  className?: string;
  /** 1 for the page title (default), 2 for further sections on the same page */
  level?: 1 | 2;
}

function SectionHeader({ title, subtitle, className = "", level = 1 }: SectionHeaderProps): ReactElement {
  const Heading = level === 1 ? "h1" : "h2";
  return (
    <motion.header
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`flex flex-col items-center text-center ${className}`}
    >
      <Heading className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-gradient pb-1">
        {title}
      </Heading>
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
