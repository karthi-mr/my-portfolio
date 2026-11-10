export const categoryGlow = {
  Frontend: {
    border: "hover:border-rose-400/50",
    shadow: "hover:shadow-[0_20px_40px_-18px_rgba(244,63,94,0.45)]",
    icon: "text-rose-500 dark:text-rose-400",
    tile: "bg-rose-500/10 ring-rose-500/20"
  },
  Backend: {
    border: "hover:border-amber-400/50",
    shadow: "hover:shadow-[0_20px_40px_-18px_rgba(245,158,11,0.45)]",
    icon: "text-amber-500 dark:text-amber-400",
    tile: "bg-amber-500/10 ring-amber-500/20"
  },
  Database: {
    border: "hover:border-blue-400/50",
    shadow: "hover:shadow-[0_20px_40px_-18px_rgba(59,130,246,0.45)]",
    icon: "text-blue-500 dark:text-blue-400",
    tile: "bg-blue-500/10 ring-blue-500/20"
  },
  Tools: {
    border: "hover:border-orange-400/50",
    shadow: "hover:shadow-[0_20px_40px_-18px_rgba(249,115,22,0.45)]",
    icon: "text-orange-500 dark:text-orange-400",
    tile: "bg-orange-500/10 ring-orange-500/20"
  },
  Testing: {
    border: "hover:border-emerald-400/50",
    shadow: "hover:shadow-[0_20px_40px_-18px_rgba(16,185,129,0.45)]",
    icon: "text-emerald-500 dark:text-emerald-400",
    tile: "bg-emerald-500/10 ring-emerald-500/20"
  }
} as const;
