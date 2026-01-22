export type ExperienceDataInput = {
  id: number;
  companyName: string;
  position: string;
  period: string;
  location: string;
  keyPoints: string[];
}

export const experienceData: ExperienceDataInput[] = [
  {
    id: 2,
    companyName: "AquilaTest (Startup)",
    position: "Software Developer - Automation & Backend",
    period: "Jan 2024 - Nov 2025",
    location: "Tamil Nadu, India",
    keyPoints: [
      "Started as a Data Analyst and transitioned into a Software Development & Automation Engineer role.",
      "Designed and implemented multiple end-to-end automation solutions using Java and Python, " +
      "improving efficiency and reliability.",
      "Re-architected the existing automation framework to improve scalability, maintainability, and modularity.",
      "Collaborated with cross-functional teams to convert data insights into actionable software solutions.",
      "Actively working on Java- and Python-based systems supporting process automation and decision-making"
    ]
  },
  {
    id: 1,
    companyName: "Zoho Corporation",
    position: "Member Technical Staff - QA",
    period: "Jul 2020 - Feb 2023",
    location: "Chennai, Tamil Nadu, India",
    keyPoints: [
      "Performed manual testing for the Manage Engine M365 Manager Plus product, covering both API and UI testing.",
      "Developed automated test cases to detect issues on a daily basis, reducing manual testing effort.",
      "Collaborated with developers to identify root causes and validate fixes."
    ]
  }
];
