export type ExperienceDataInput = {
  id: number;
  companyName: string;
  position: string;
  /** whole period at the company, e.g. 'Jun 2024 - Feb 2026' or 'Jun 2026 - Present' */
  period: string;
  /** optional: shown as a location chip */
  location?: string;
  /** optional: separate stints at the same company, e.g. full time then part time */
  stints?: { label: string; period: string }[];
  /** true for the job you have now (shown with a "Current" badge) */
  current?: boolean;
  keyPoints: string[];
};

export const experienceData: ExperienceDataInput[] = [
  {
    id: 4,
    // TODO: replace "XXX" with the company name, add location and keyPoints
    companyName: 'XXX',
    position: 'Senior Data Scientist',
    period: 'Jun 2026 - Present',
    current: true,
    keyPoints: [],
  },
  {
    id: 2,
    companyName: 'AquilaTest (Startup)',
    position: 'Software Developer - Automation & Backend',
    period: 'Jun 2024 - Feb 2026',
    location: 'Tamil Nadu, India',
    stints: [
      { label: 'Full Time', period: 'Jun 2024 - Oct 2025' },
      { label: 'Part Time', period: 'Oct 2025 - Feb 2026' },
    ],
    keyPoints: [
      'Started as a Data Analyst and transitioned into a Software Development & Automation Engineer role.',
      'Designed and implemented multiple end-to-end automation solutions using Java and Python, ' +
        'improving efficiency and reliability.',
      'Re-architected the existing automation framework to improve scalability, maintainability, and modularity.',
      'Collaborated with cross-functional teams to convert data insights into actionable software solutions.',
      'Worked on Java- and Python-based systems supporting process automation and decision-making.',
    ],
  },
  {
    id: 1,
    companyName: 'Zoho Corporation',
    position: 'Member Technical Staff - QA',
    period: 'Jul 2020 - Feb 2023',
    location: 'Chennai, Tamil Nadu, India',
    keyPoints: [
      'Performed manual testing for the Manage Engine M365 Manager Plus product, covering both API and UI testing.',
      'Developed automated test cases to detect issues on a daily basis, reducing manual testing effort.',
      'Collaborated with developers to identify root causes and validate fixes.',
    ],
  },
];
