import { type ReactElement, useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

type StatCounterProps = {
  value: number;
  suffix?: string;
  label: string;
}

/** Big number that counts up once when it scrolls into view (instant if the visitor prefers reduced motion). */
function StatCounter({ value, suffix = "", label }: StatCounterProps): ReactElement {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView: boolean = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion: boolean | null = useReducedMotion();
  const [shown, setShown] = useState<number>(reduceMotion ? value : 0);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(0, value, { duration: 1.2, ease: "easeOut", onUpdate: v => setShown(Math.round(v)) });
    return () => controls.stop();
  }, [inView, reduceMotion, value]);

  return (
    <div ref={ref} className="glass card-hover p-5 md:p-6 flex flex-col gap-1">
      <span className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-gradient tabular-nums pb-1">
        {/* screen readers get the final number right away */}
        <span aria-hidden="true">{shown}{suffix}</span>
        <span className="sr-only">{value}{suffix}</span>
      </span>
      <span className="text-sm md:text-base font-medium text-muted">{label}</span>
    </div>
  );
}

export default StatCounter;
