import { CloudyIcon, Database, Settings } from 'lucide-react';
import { FaClipboardCheck, FaJava } from 'react-icons/fa';
import {
  SiAngular,
  SiApachemaven,
  SiBootstrap,
  SiCss3,
  SiDocker,
  SiGithub,
  SiHibernate,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiSelenium,
  SiSpringboot,
  SiSpringsecurity,
  SiSwagger,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';

export type Category = 'All' | 'Frontend' | 'Backend' | 'Tools' | 'Database' | 'Testing';

export interface SkillCardType {
  name: string;
  Icon: React.ElementType;
  category: Category;
}

export const skills: SkillCardType[] = [
  { name: 'Java', Icon: FaJava, category: 'Backend' },
  { name: 'Python', Icon: SiPython, category: 'Backend' },
  { name: 'Spring Boot', Icon: SiSpringboot, category: 'Backend' },
  { name: 'Spring Security', Icon: SiSpringsecurity, category: 'Backend' },
  { name: 'Spring Data JPA', Icon: Database, category: 'Backend' },
  { name: 'Microservices', Icon: CloudyIcon, category: 'Backend' },
  { name: 'Rest APIs', Icon: Settings, category: 'Backend' },
  { name: 'Hibernate', Icon: SiHibernate, category: 'Backend' },

  { name: 'HTML', Icon: SiHtml5, category: 'Frontend' },
  { name: 'CSS', Icon: SiCss3, category: 'Frontend' },
  { name: 'JavaScript', Icon: SiJavascript, category: 'Frontend' },
  { name: 'TypeScript', Icon: SiTypescript, category: 'Frontend' },
  { name: 'Tailwind CSS', Icon: SiTailwindcss, category: 'Frontend' },
  { name: 'Bootstrap', Icon: SiBootstrap, category: 'Frontend' },
  { name: 'React', Icon: SiReact, category: 'Frontend' },
  { name: 'Angular', Icon: SiAngular, category: 'Frontend' },

  { name: 'PostgreSQL', Icon: SiPostgresql, category: 'Database' },
  { name: 'MySql', Icon: SiMysql, category: 'Database' },

  { name: 'Automation Testing', Icon: SiSelenium, category: 'Testing' },
  { name: 'Manual Testing', Icon: FaClipboardCheck, category: 'Testing' },

  { name: 'GitHub', Icon: SiGithub, category: 'Tools' },
  { name: 'Docker', Icon: SiDocker, category: 'Tools' },
  { name: 'Postman', Icon: SiPostman, category: 'Tools' },
  { name: 'Swagger', Icon: SiSwagger, category: 'Tools' },
  { name: 'Maven', Icon: SiApachemaven, category: 'Tools' },
];
