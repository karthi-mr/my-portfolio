export type ProjectImageLink = {
  projectImageLink: string;
  imageTitle: string;
};

// Any new category string works: it shows up as a filter option automatically.
export type ProjectCategory =
  | 'Full Stack'
  | 'Backend'
  | 'Frontend'
  | 'AI/ML'
  | 'Data Science'
  | (string & {});

export type ProjectDataInput = {
  projectTitle: string;
  projectDescription: string;
  projectGitHubLink: string;
  projectImageLinks: ProjectImageLink[];
  techStacks: string[];
  keyFeatures: string[];
  demoUrl?: string;
  /** optional: shown as a badge and usable as a filter */
  category?: ProjectCategory;
  /** optional: featured projects are listed first with a "Featured" badge */
  featured?: boolean;
}

export const projectsData: ProjectDataInput[] = [
  {
    projectTitle: "Emotion Detection – NLP Web App with Watson AI",
    category: "AI/ML",
    featured: true,
    projectDescription: `An NLP web application that detects the emotions in a piece of text. A Python package sends the text to IBM Watson NLP's emotion-prediction model and returns a score for anger, disgust, fear, joy and sadness together with the dominant emotion. A Flask web app exposes it through a simple page and an API endpoint, blank or invalid input is handled gracefully, and the emotion detector is covered by unit tests.`,
    projectGitHubLink: "https://github.com/karthi-mr/oaqjp-final-project-emb-ai",
    projectImageLinks: [
      {
        imageTitle: "Emotion detection result",
        projectImageLink: "/projects/emotion-detection.webp"
      },
      {
        imageTitle: "Invalid input handling",
        projectImageLink: "https://github.com/karthi-mr/oaqjp-final-project-emb-ai/blob/b541eb36d5bb61dded486f5c63d1c50076f5da14/temp/7c_error_handling_interface.png"
      },
      {
        imageTitle: "Flask server code",
        projectImageLink: "https://github.com/karthi-mr/oaqjp-final-project-emb-ai/blob/b541eb36d5bb61dded486f5c63d1c50076f5da14/temp/6a_server.png"
      },
    ],
    techStacks: ["Python", "IBM Watson NLP", "Flask", "REST APIs", "Unit Testing", "HTML", "JavaScript"],
    keyFeatures: [
      "Detects anger, disgust, fear, joy and sadness in any text using the IBM Watson NLP emotion model.",
      "Returns the score of each emotion and picks the dominant one.",
      "Packaged as a reusable Python module (EmotionDetection).",
      "Flask web app with a web page and an /emotionDetector API endpoint.",
      "Handles blank or invalid input with a clear message instead of an error.",
      "Unit tests with Python unittest for all five emotions."
    ],
  },
  {
    projectTitle: "WebSockets Demo – Real-Time Chat Application",
    category: "Full Stack",
    projectDescription: `Built a real-time chat application using Spring Boot and React to understand core WebSocket communication. The backend is configured with Spring’s WebSocket support and exposes endpoints like /chat and /ws, while the frontend uses the browser WebSocket API to connect, send messages, and display live chat updates. The project also handles connection, disconnection, and message broadcasting across active sessions.`,
    projectGitHubLink: "https://github.com/karthi-mr/my-learning/tree/master/02-websockets-demo",
    projectImageLinks: [],
    techStacks: [
      "Spring Boot", "Java", "WebSocket", "Mockito", "React", "Real-Time Communication"
    ],
    keyFeatures: [
      "Enables bi-directional communication between client and server.",
      "Messages are sent instantly without page refresh.",
      "Uses STOMP over WebSocket for structured messaging.",
      "Supports multiple clients connected simultaneously.",
      "Messages are broadcast to all connected users.",
      "Real-time group chat behavior"
    ],
  },
  {
    projectTitle: "Spring Boot Unit Testing – JUnit & Mockito",
    category: "Backend",
    projectDescription: `Developed a comprehensive Spring Boot Unit Testing project to demonstrate best practices for testing REST APIs, service layers, and repository components. Implemented unit tests using JUnit 5 and Mockito, focusing on isolating business logic, mocking dependencies, and validating application behavior under different scenarios.`,
    projectGitHubLink: "https://github.com/karthi-mr/my-learning/tree/master/01-spring/01-unit-test",
    projectImageLinks: [],
    techStacks: [
      "Spring Boot", "Java", "JUnit 5", "Mockito", "Unit Testing", "REST APIs", "H2 Database", "Test-Driven Development"
    ],
    keyFeatures: [
      "Service layer testing with mocked dependencies.",
      "Controller testing with request/response validation.",
      "Repository testing using in-memory database (H2).",
      "Exception handling and edge case validation.",
      "Writing clean, maintainable, and scalable test cases.",
    ],
  },
  {
    projectTitle: "Spring Boot Microservices with JWT Authentication",
    category: "Backend",
    featured: true,
    projectDescription: `Designed and developed a production-style microservices architecture using Spring Boot, implementing secure authentication and authorization using JWT (JSON Web Tokens). The system consists of multiple services including an Auth Service, API Gateway, and Resource Services, with centralized request routing and security enforcement. Integrated service discovery and load balancing to enable scalable and decoupled communication between services. Implemented stateless authentication where: Auth Service issues JWT tokens API Gateway validates tokens and routes requests Downstream services are protected and accessed securely.`,
    projectGitHubLink: "https://github.com/karthi-mr/spring-microservices-with-authentication",
    projectImageLinks: [],
    techStacks: [
      "Spring Boot", "Java", "Spring Security", "JWT", "Microservices", "API Gateways", "Eureka", "Docker", "PostgreSQL", "REST APIs", "Distributed Systems"
    ],
    keyFeatures: [
      "JWT-based authentication and role-based authorization.",
      "API Gateway routing with centralized security.",
      "Service discovery using Eureka.",
      "Inter-service communication using REST.",
      "Stateless and scalable architecture",
      "Dockerized services with containerized PostgreSQL setup",
    ],
  },
  {
    projectTitle: "Razorpay Payment Integration – Full Stack Application",
    category: "Full Stack",
    projectDescription: `Built a full-stack payment integration system using Spring Boot and React, integrating the Razorpay API in test mode to simulate real-world online transactions. The backend handles secure order creation and payment verification, while the frontend provides a seamless checkout experience using Razorpay’s checkout flow. Implemented environment-based configuration using .env for securely managing API keys and sensitive credentials.
`,
    projectGitHubLink: "https://github.com/karthi-mr/razorpay-demo",
    projectImageLinks: [],
    techStacks: [
      "Spring Boot", "Java", "Razorpay", "React", "JavaScript"
    ],
    keyFeatures: [
      "Payment order creation using Razorpay API.",
      "Secure payment verification on backend.",
      "REST API integration between React and Spring Boot.",
      "Environment variable configuration for sensitive data.",
      "Clean separation of frontend and backend layers.",
      "End-to-end payment flow simulation (test mode)"
    ],
  },
  {
    projectTitle: "Interactive Quiz Application – React",
    category: "Frontend",
    projectDescription: "Developed an interactive quiz application using React to deliver a dynamic and engaging user experience. The application presents multiple-choice questions, tracks user answers, calculates scores, and displays results in real time. Implemented component-based architecture and state management to handle quiz flow, user interactions, and result evaluation. Designed a responsive UI to ensure smooth usability across devices. Deployed the application using Firebase Hosting, enabling fast and reliable access via a live URL.",
    projectGitHubLink: "https://github.com/karthi-mr/quiz-app-react",
    projectImageLinks: [
      {
        imageTitle: "Screenshot 1",
        projectImageLink: "https://github.com/karthi-mr/quiz-app-react/blob/master/screenshots/screenshot_1.png",
      },
      {
        imageTitle: "Screenshot 2",
        projectImageLink: "https://github.com/karthi-mr/quiz-app-react/blob/master/screenshots/screenshot_2.png"
      },
      {
        imageTitle: "Summary",
        projectImageLink: "https://github.com/karthi-mr/quiz-app-react/blob/master/screenshots/summary.png"
      },
    ],
    techStacks: [
      "React", "TypeScript", "Front-End Development", "Firebase Hosting", "Web Development", "Vite"
    ],
    keyFeatures: [
      "Dynamic question rendering and answer selection.",
      "Real-time score calculation and result summary.",
      "Clean and responsive UI design.",
      "Component-based architecture using React.",
      "Smooth navigation between quiz stages",
      "Production deployment with Firebase Hosting"
    ],
    demoUrl: "https://quiz-app-react-1.web.app/"
  },
  {
    projectTitle: "Expense Tracker",
    category: "Full Stack",
    featured: true,
    projectDescription: `Built a full-stack expense tracker with a Spring Boot REST API and a React + TypeScript frontend. Users sign up and log in with JWT-based authentication, create their own categories and record daily expenses. The dashboard summarises spending for the last 7, 30 and 365 days, shows the total for each of the past 30 days and the total per category. Data is stored in PostgreSQL (running in Docker) and the API is documented with OpenAPI.`,
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
      "Spring Boot", "Spring Security", "Spring Data JPA", "JWT", "OpenAPI", "Docker", "TypeScript",
      "React", "React Router", "Axios", "Tailwind CSS", "PostgreSQL"
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
    category: "Frontend",
    projectDescription: `This portfolio website, built with React, TypeScript and Vite and styled with Tailwind CSS. It has light and dark themes that follow the system setting, Framer Motion animations, searchable multi-select filters for skills, certificates and projects, a project gallery with a full-screen image viewer and shareable project links, and a contact form powered by EmailJS. It is fully responsive, loads each page on demand and is deployed to Firebase Hosting with GitHub Actions.`,
    projectGitHubLink: "https://github.com/karthi-mr/my-portfolio",
    projectImageLinks: [
      {
        imageTitle: "Home",
        projectImageLink: "https://github.com/karthi-mr/my-portfolio/blob/fa638057d617924442d92cd7c9ca8569492a0fd5/screenshots/home.png"
      },
      {
        imageTitle: "Home (light theme)",
        projectImageLink: "https://github.com/karthi-mr/my-portfolio/blob/fa638057d617924442d92cd7c9ca8569492a0fd5/screenshots/home-light.png"
      },
      {
        imageTitle: "About Me",
        projectImageLink: "https://github.com/karthi-mr/my-portfolio/blob/fa638057d617924442d92cd7c9ca8569492a0fd5/screenshots/about-me.png"
      },
      {
        imageTitle: "Projects",
        projectImageLink: "https://github.com/karthi-mr/my-portfolio/blob/fa638057d617924442d92cd7c9ca8569492a0fd5/screenshots/projects.png"
      },
      {
        imageTitle: "Experience",
        projectImageLink: "https://github.com/karthi-mr/my-portfolio/blob/fa638057d617924442d92cd7c9ca8569492a0fd5/screenshots/experience.png"
      },
      {
        imageTitle: "Skills",
        projectImageLink: "https://github.com/karthi-mr/my-portfolio/blob/fa638057d617924442d92cd7c9ca8569492a0fd5/screenshots/skills.png"
      },
      {
        imageTitle: "Certificates",
        projectImageLink: "https://github.com/karthi-mr/my-portfolio/blob/fa638057d617924442d92cd7c9ca8569492a0fd5/screenshots/certificates.png"
      },
      {
        imageTitle: "Contact Me",
        projectImageLink: "https://github.com/karthi-mr/my-portfolio/blob/fa638057d617924442d92cd7c9ca8569492a0fd5/screenshots/contact-me.png"
      },
      {
        imageTitle: "Mobile",
        projectImageLink: "https://github.com/karthi-mr/my-portfolio/blob/fa638057d617924442d92cd7c9ca8569492a0fd5/screenshots/mobile-home.png"
      },
    ],
    techStacks: [
      "TypeScript", "React", "Vite", "Tailwind CSS", "React Router", "Framer Motion", "Swiper", "EmailJS",
      "Lucide React", "Firebase Hosting", "GitHub Actions"
    ],
    keyFeatures: [
      "Developed a fully responsive portfolio website using React, TypeScript, and Vite to showcase skills & projects.",
      "Implemented interactive UI/UX components including smooth scrolling and section highlights to enhance user experience.",
      "Integrated a contact form and animations for professional engagement."
    ],
    demoUrl: "https://karthi-22.web.app/home"
  },
  {
    projectTitle: "Todo Application (Backend)",
    category: "Backend",
    projectDescription: `The Spring Boot backend of my full-stack Todo application. It exposes RESTful APIs that the React frontend uses to manage tasks – including task priority and due dates – and persists the data in PostgreSQL through Spring Data JPA.`,
    projectGitHubLink: "https://github.com/karthi-mr/spring-backend-todo/tree/dev",
    projectImageLinks: [],
    techStacks: [
      "Spring Boot", "Spring Data JPA", "PostgreSQL"
    ],
    keyFeatures: [
      "Designed and developed a full-stack Todo application with React frontend and Spring Boot backend.",
      "Implemented features such as task priority, due dates, filtering, sorting, dark mode, and persistent storage.",
      "Built RESTful APIs using Spring Boot and integrated PostgreSQL for data management."
    ]
  },
  {
    projectTitle: "Todo Application (Frontend)",
    category: "Frontend",
    projectDescription: `The React (JavaScript) frontend of my full-stack Todo application, styled with Tailwind CSS. Tasks can be given a priority and a due date, then filtered and sorted, and the app includes a dark mode. It talks to the Spring Boot backend through REST APIs for persistent storage and is deployed on Firebase Hosting.`,
    projectGitHubLink: "https://github.com/karthi-mr/react-todo-app/tree/dev",
    projectImageLinks: [
      {
        imageTitle: "Tasks with priority, due date and filters",
        projectImageLink: "/projects/todo-frontend-desktop.webp"
      },
    ],
    techStacks: ["JavaScript", "React", "Tailwind CSS", "Vite"],
    keyFeatures: [
      "Designed and developed a full-stack Todo application with React frontend and Spring Boot backend.",
      "Implemented features such as task priority, due dates, filtering, sorting, dark mode, and persistent storage.",
      "Built RESTful APIs using Spring Boot and integrated PostgreSQL for data management."
    ],
    demoUrl: "https://react-todo-app-ac0fe.web.app/"
  },
]
