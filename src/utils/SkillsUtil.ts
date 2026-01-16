import {
  SiAngular,
  SiBootstrap,
  SiCss3,
  SiDocker,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiSpringboot,
  SiSwagger,
  SiTailwindcss,
  SiTypescript
} from "react-icons/si";
import { FaJava } from "react-icons/fa";


export type Category = "Frontend" | "Backend" | "Tools" | "Database" | "Testing";

export interface SkillCardType {
  name: string;
  Icon: React.ElementType;
  category: Category;
}

export const skills: SkillCardType[] = [
  { name: "Java", Icon: FaJava, category: "Backend" },
  { name: "Python", Icon: SiPython, category: "Backend" },
  { name: "Spring Boot", Icon: SiSpringboot, category: "Backend" },

  { name: "HTML", Icon: SiHtml5, category: "Frontend" },
  { name: "CSS", Icon: SiCss3, category: "Frontend" },
  { name: "JavaScript", Icon: SiJavascript, category: "Frontend" },
  { name: "TypeScript", Icon: SiTypescript, category: "Frontend" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, category: "Frontend" },
  { name: "Bootstrap", Icon: SiBootstrap, category: "Frontend" },
  { name: "React", Icon: SiReact, category: "Frontend" },
  { name: "Angular", Icon: SiAngular, category: "Frontend" },

  { name: "PostgreSQL", Icon: SiPostgresql, category: "Database" },
  { name: "MySql", Icon: SiMysql, category: "Database" },

  { name: "Automation Testing", Icon: SiPostgresql, category: "Testing" },
  { name: "Manual Testing", Icon: SiMysql, category: "Testing" },

  { name: "GitHub", Icon: SiGithub, category: "Tools" },
  { name: "Docker", Icon: SiDocker, category: "Tools" },
  { name: "Postman", Icon: SiPostman, category: "Tools" },
  { name: "Swagger", Icon: SiSwagger, category: "Tools" },
];