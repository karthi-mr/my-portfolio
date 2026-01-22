export type ProjectImageLink = {
  projectImageLink: string;
  imageTitle: string;
};

export type ProjectDataInput = {
  projectTitle: string;
  projectDescription: string;
  projectGitHubLink: string;
  projectImageLinks: ProjectImageLink[];
  techStacks: string[];
  keyFeatures: string[];
  demoUrl?: string;
}

export const projectsData: ProjectDataInput[] = [
  {
    projectTitle: "Expense Tracker",
    projectDescription: "Expense Tracker Application",
    projectGitHubLink: "https://github.com/karthi-mr/expense-tracker-spring-react",
    projectImageLinks: [
      {
        imageTitle: "Dashboard",
        projectImageLink: "https://github.com/karthi-mr/expense-tracker-spring-react/blob/master/product-screenshot/dashboard/dashboard-page.png",
      },
      {
        imageTitle: "All Expense",
        projectImageLink: "https://github.com/karthi-mr/expense-tracker-spring-react/blob/master/product-screenshot/expenses/all-expenses-page.png"
      },
      {
        imageTitle: "Create Expense",
        projectImageLink: "https://github.com/karthi-mr/expense-tracker-spring-react/blob/master/product-screenshot/expenses/create-expense-page.png"
      },
      {
        imageTitle: "Delete Expense",
        projectImageLink: "https://github.com/karthi-mr/expense-tracker-spring-react/blob/master/product-screenshot/expenses/delete-expense-page.png"
      },
      {
        imageTitle: "Update Expense",
        projectImageLink: "https://github.com/karthi-mr/expense-tracker-spring-react/blob/master/product-screenshot/expenses/update-expense-page.png"
      },
      {
        imageTitle: "All Categories",
        projectImageLink: "https://github.com/karthi-mr/expense-tracker-spring-react/blob/master/product-screenshot/categories/all-categories-page.png"
      },
      {
        imageTitle: "Create Category",
        projectImageLink: "https://github.com/karthi-mr/expense-tracker-spring-react/blob/master/product-screenshot/categories/create-category-page.png"
      },
      {
        imageTitle: "Delete Category",
        projectImageLink: "https://github.com/karthi-mr/expense-tracker-spring-react/blob/master/product-screenshot/categories/delete-category-page.png"
      },
      {
        imageTitle: "Update Category",
        projectImageLink: "https://github.com/karthi-mr/expense-tracker-spring-react/blob/master/product-screenshot/categories/update-category-page.png"
      },
      {
        imageTitle: "Login",
        projectImageLink: "https://github.com/karthi-mr/expense-tracker-spring-react/blob/master/product-screenshot/auth/login-page.png"
      },
      {
        imageTitle: "Signup",
        projectImageLink: "https://github.com/karthi-mr/expense-tracker-spring-react/blob/master/product-screenshot/auth/sign-up-page.png"
      },
    ],
    techStacks: [
      "Spring Boot", "Spring Security", "Spring Data Jpa", "JWT", "Open API", "Docker", "TypeScript",
      "React", "React Router", "Axios", "Tailwind CSS", "Postgres"
    ],
    keyFeatures: [
      "Built a full-stack web application to record and analyze personal expenses.",
      "Implemented expense/category CRUD operations with JWT-based authentication and authorization.",
      "Designed dashboards to view daily/weekly/monthly expense summaries.",
      "Ensured smooth communication between frontend backend using RESTful APIs and Axios."
    ]
  },
  {
    projectTitle: "Personal Portfolio",
    projectDescription: "Personal Portfolio project using React and Tailwind CSS",
    projectGitHubLink: "https://github.com/karthi-mr/my-portfolio",
    projectImageLinks: [
      {
        imageTitle: "Home",
        projectImageLink: "https://github.com/karthi-mr/my-portfolio/blob/64db0af0dc427d72d3bc29e9b393c65be60c7431/screenshots/home.png"
      },
      {
        imageTitle: "About Me",
        projectImageLink: "https://github.com/karthi-mr/my-portfolio/blob/64db0af0dc427d72d3bc29e9b393c65be60c7431/screenshots/about-me.png"
      },
      {
        imageTitle: "Projects",
        projectImageLink: "https://github.com/karthi-mr/my-portfolio/blob/64db0af0dc427d72d3bc29e9b393c65be60c7431/screenshots/projects.png"
      },
      {
        imageTitle: "Experience",
        projectImageLink: "https://github.com/karthi-mr/my-portfolio/blob/64db0af0dc427d72d3bc29e9b393c65be60c7431/screenshots/experience.png"
      },
      {
        imageTitle: "Skills",
        projectImageLink: "https://github.com/karthi-mr/my-portfolio/blob/64db0af0dc427d72d3bc29e9b393c65be60c7431/screenshots/skills.png"
      },
      {
        imageTitle: "Certificates",
        projectImageLink: "https://github.com/karthi-mr/my-portfolio/blob/64db0af0dc427d72d3bc29e9b393c65be60c7431/screenshots/certificates.png"
      },
      {
        imageTitle: "Contact Me",
        projectImageLink: "https://github.com/karthi-mr/my-portfolio/blob/64db0af0dc427d72d3bc29e9b393c65be60c7431/screenshots/contact-me.png"
      },
    ],
    techStacks: ["TypeScript", "React", "Tailwind CSS", "Lucid React (icons)", "React router dom", "Framer motion",
      "Swiper", "Email js"],
    keyFeatures: [
      "Developed a fully responsive portfolio website using React, TypeScript, and Vite to showcase skills & projects.",
      "Implemented interactive UI/UX components including smooth scrolling and section highlights to enhance user experience.",
      "Integrated a contact form and animations for professional engagement."
    ],
    demoUrl: "https://karthi-22.web.app/home"
  },
  {
    projectTitle: "Todo Application (Backend)",
    projectDescription: "Todo Backend Application",
    projectGitHubLink: "https://github.com/karthi-mr/spring-backend-todo/tree/dev",
    projectImageLinks: [],
    techStacks: [
      "Spring Boot", "Spring Data Jpa", "Postgres"
    ],
    keyFeatures: [
      "Designed and developed a full-stack Todo application with React frontend and Spring Boot backend.",
      "Implemented features such as task priority, due dates, filtering, sorting, dark mode, and persistent storage.",
      "Built RESTful APIs using Spring Boot and integrated PostgreSQL for data management."
    ]
  },
  {
    projectTitle: "Todo Application (Frontend)",
    projectDescription: "Todo Frontend Application",
    projectGitHubLink: "https://github.com/karthi-mr/react-todo-app/tree/dev",
    projectImageLinks: [],
    techStacks: ["TypeScript", "React", "Tailwind CSS"],
    keyFeatures: [
      "Designed and developed a full-stack Todo application with React frontend and Spring Boot backend.",
      "Implemented features such as task priority, due dates, filtering, sorting, dark mode, and persistent storage.",
      "Built RESTful APIs using Spring Boot and integrated PostgreSQL for data management."
    ],
    demoUrl: "https://react-todo-app-ac0fe.web.app/"
  },
]
