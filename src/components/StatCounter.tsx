import { type ReactElement, type ReactNode, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type StatCounterProps = {
  value: number;
  suffix?: string;
  label: string;
  /** small icon in the top corner */
  icon: ReactNode;
  /** page with the details, e.g. "/projects": the whole card becomes a link to it */
  to?: string;
}

/**
 * Stat card: icon at the top, a big number that counts up once when it scrolls into view
 * (instant if the visitor prefers reduced motion) and its label at the bottom.
 */
function StatCounter({ value, suffix = "", label, icon, to }: StatCounterProps): ReactElement {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView: boolean = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion: boolean | null = useReducedMotion();
  const [shown, setShown] = useState<number>(reduceMotion ? value : 0);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(0, value, { duration: 1.2, ease: "easeOut", onUpdate: v => setShown(Math.round(v)) });
    return () => controls.stop();
  }, [inView, reduceMotion, value]);

  const content: ReactElement = (
    <div ref={ref} className="flex h-full flex-col justify-between gap-6">
      <div className="flex items-start justify-between">
        <span
          aria-hidden="true"
          className="grid place-items-center size-10 md:size-11 rounded-xl bg-brand text-white shadow-lg shadow-indigo-500/25"
        >
          {icon}
        </span>
        {to && (
          <ArrowUpRight
            aria-hidden="true"
            size={18}
            className="text-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg"
          />
        )}
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-gradient tabular-nums pb-1">
          {/* screen readers get the final number right away */}
          <span aria-hidden="true" data-stat-value>{shown}{suffix}</span>
          <span className="sr-only">{value}{suffix}</span>
        </span>
        <span className="text-sm md:text-base font-medium text-muted">{label}</span>
      </div>
    </div>
  );

  const cardClass: string = "group glass card-hover block h-full p-5 md:p-6";
  return to
    ? <Link to={to} className={cardClass}>{content}</Link>
    : <div className={cardClass}>{content}</div>;
}

export default StatCounter;
