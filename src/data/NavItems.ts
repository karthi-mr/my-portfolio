export type NavItem = {
  to: string;
  label: string;
  /** one-line teaser used by the "Next" card at the bottom of the previous page */
  teaser: string;
};

// order = navbar order = "Next page" order
export const navItems: NavItem[] = [
  { to: "/home", label: "Home", teaser: "Back to the start" },
  { to: "/about", label: "About Me", teaser: "Who I am, why hire me and my education" },
  { to: "/projects", label: "Projects", teaser: "AI/ML, backend and full-stack projects" },
  { to: "/experience", label: "Experience", teaser: "Where I have worked and what I did" },
  { to: "/skills", label: "Skills", teaser: "Languages, frameworks and tools I use" },
  { to: "/certificates", label: "Achievements & Certifications", teaser: "Certificates from DeepLearning.AI, LinkedIn, CodeChef and more" },
  { to: "/contact", label: "Contact Me", teaser: "Email, LinkedIn, WhatsApp or a quick message" },
];
