// Original brand colors for each skill icon (keyed by skill name).
// `light` is used in the light theme when the brand color is too pale on white.
export type BrandColor = {
  color: string;
  light?: string;
  gradient?: [string, string];
};

const fallback: BrandColor = { color: "#818cf8", light: "#4f46e5" };

const brandColors: Record<string, BrandColor> = {
  "Java": { color: "#f89820", light: "#e76f00" },
  "Python": { color: "#4b8bbe", gradient: ["#4b8bbe", "#ffd43b"] },
  "Spring Boot": { color: "#6db33f" },
  "Spring Security": { color: "#6db33f" },
  "Spring Data JPA": { color: "#6db33f" },
  "Microservices": { color: "#38bdf8", light: "#0284c7" },
  "Rest APIs": { color: "#a78bfa", light: "#7c3aed" },
  "Hibernate": { color: "#bcae79", light: "#59666c" },

  "HTML": { color: "#e34f26" },
  "CSS": { color: "#2965f1", light: "#1572b6" },
  "JavaScript": { color: "#f7df1e", light: "#d4b106" },
  "TypeScript": { color: "#3178c6" },
  "Tailwind CSS": { color: "#38bdf8", light: "#06b6d4" },
  "Bootstrap": { color: "#a07ff0", light: "#7952b3" },
  "React": { color: "#61dafb", light: "#087ea4" },
  "Angular": { color: "#dd0031" },

  "PostgreSQL": { color: "#5b8def", light: "#336791" },
  "MySql": { color: "#4479a1", light: "#00758f" },

  "Automation Testing": { color: "#43b02a" },
  "Manual Testing": { color: "#2dd4bf", light: "#0d9488" },

  "GitHub": { color: "#f0f6fc", light: "#181717" },
  "Docker": { color: "#2496ed" },
  "Postman": { color: "#ff6c37" },
  "Swagger": { color: "#85ea2d", light: "#4f9a16" },
  "Maven": { color: "#c71a36" },

  // AI / ML & data science
  "TensorFlow": { color: "#ff6f00" },
  "PyTorch": { color: "#ee4c2c" },
  "Keras": { color: "#ff4d4d", light: "#d00000" },
  "scikit-learn": { color: "#f7931e" },
  "Pandas": { color: "#e70488", light: "#150458" },
  "NumPy": { color: "#4dabcf", light: "#013243" },
  "Matplotlib": { color: "#4c9fd6", light: "#11557c" },
  "Seaborn": { color: "#7db0d8", light: "#4c72b0" },
  "Jupyter": { color: "#f37626" },
  "OpenCV": { color: "#7b68ee", light: "#5c3ee8" },
  "Hugging Face": { color: "#ffd21e", light: "#d4a700" },
  "LangChain": { color: "#3fb68b", light: "#1c3c3c" },
  "OpenAI": { color: "#f0f6fc", light: "#0b0b0b" },
  "Power BI": { color: "#f2c811", light: "#c9a200" },
  "Tableau": { color: "#e97627" },
  "R": { color: "#5b9bd5", light: "#276dc3" },
  "Excel": { color: "#21a366", light: "#107c41" },
  "Apache Spark": { color: "#e25a1c" },
  "Streamlit": { color: "#ff4b4b" },
  "MongoDB": { color: "#47a248" },
};

const brandColorsByLowerName: Map<string, BrandColor> = new Map(
  Object.entries(brandColors).map(([name, brand]) => [name.toLowerCase(), brand])
);

export function getSkillBrand(name: string): BrandColor {
  return brandColorsByLowerName.get(name.trim().toLowerCase()) ?? fallback;
}
