export const categoryGlow = {
  Frontend: {
    border: "hover:border-yellow-400/60",
    shadow: "inset-shadow-yellow-400 shadow-yellow-400/60 hover:shadow-[0_0_30px_rgba(34,211,238,0.25)]",
    icon: "text-yellow-400"
  },
  Backend: {
    border: "hover:border-orange-400/60",
    shadow: "inset-shadow-orange-400 shadow-orange-400/60 hover:shadow-[0_0_30px_rgba(52,211,153,0.25)]",
    icon: "text-orange-400"
  },
  Database: {
    border: "hover:border-blue-400/60",
    shadow: "inset-shadow-blue-400 shadow-blue-400/60 hover:shadow-[0_0_30px_rgba(167,139,250,0.25)]",
    icon: "text-blue-400"
  },
  Tools: {
    border: "hover:border-orange-400/60",
    shadow: "inset-shadow-orange-400 shadow-orange-400/60 hover:shadow-[0_0_30px_rgba(251,146,60,0.25)]",
    icon: "text-orange-400"
  },
  Testing: {
    border: "hover:border-green-400/60",
    shadow: "inset-shadow-green-400 shadow-green-400/60 hover:shadow-[0_0_30px_rgba(251,146,60,0.25)]",
    icon: "text-green-400"
  }
} as const;
