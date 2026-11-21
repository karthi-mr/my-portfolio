// Any new platform name works: its filter option (with the site's favicon) is created automatically.
export type CertificateProvider =
  | 'CodeChef'
  | 'Udemy'
  | 'Hackerrank'
  | 'LinkedIn'
  | 'Coursera'
  | 'Kaggle'
  | 'DataCamp'
  | (string & {});

export type CertificateData = {
  label: string;
  url: string;
  certificateProvider: CertificateProvider;
  /**
   * optional: when the certificate was issued, as "YYYY-MM" or "YYYY-MM-DD" (e.g. '2025-03').
   * Dated certificates are listed newest first and show "Issued Mar 2025".
   */
  issued?: string;
};

export const certificatesData: CertificateData[] = [
  {
    label: 'CodeChef Certified Foundation Level Exam',
    url: 'https://www.codechef.com/certificates/public/7a3b6ac',
    certificateProvider: 'CodeChef',
    issued: '2019-01-20',
  },
  {
    label: 'Git/Github',
    url: 'https://www.codechef.com/certificates/public/ad17bb0',
    certificateProvider: 'CodeChef',
    issued: '2026-01-07',
  },
  {
    label: 'Practice Java',
    url: 'https://www.codechef.com/certificates/public/eb5e50d',
    certificateProvider: 'CodeChef',
    issued: '2025-09-17',
  },
  {
    label: 'Practice JavaScript',
    url: 'https://www.codechef.com/certificates/public/84f29b1',
    certificateProvider: 'CodeChef',
    issued: '2025-08-24',
  },
  {
    label: 'Practice Python',
    url: 'https://www.codechef.com/certificates/public/ae799ff',
    certificateProvider: 'CodeChef',
    issued: '2025-07-23',
  },
  {
    label: 'Practice Basic Math',
    url: 'https://www.codechef.com/certificates/public/88592ad',
    certificateProvider: 'CodeChef',
    issued: '2025-07-01',
  },
  {
    label: 'Learn React JS for Front-end development',
    url: 'https://www.codechef.com/certificates/public/2692faf',
    certificateProvider: 'CodeChef',
    issued: '2025-06-22',
  },
  {
    label: 'Learn SQL',
    url: 'https://www.codechef.com/certificates/public/5216ecf',
    certificateProvider: 'CodeChef',
    issued: '2025-06-19',
  },
  {
    label: 'Learn JavaScript',
    url: 'https://www.codechef.com/certificates/public/677de45',
    certificateProvider: 'CodeChef',
    issued: '2025-06-13',
  },
  {
    label: 'Learn Java',
    url: 'https://www.codechef.com/certificates/public/04d5368',
    certificateProvider: 'CodeChef',
    issued: '2025-06-10',
  },
  {
    label: 'Learn Python Programming',
    url: 'https://www.codechef.com/certificates/public/cf3f218',
    certificateProvider: 'CodeChef',
    issued: '2025-05-31',
  },
  {
    label: '500 to 1000 difficulty rating',
    url: 'https://www.codechef.com/certificates/public/8664310',
    certificateProvider: 'CodeChef',
    issued: '2025-05-24',
  },
  {
    label: 'Linked Lists',
    url: 'https://www.codechef.com/certificates/public/0129472',
    certificateProvider: 'CodeChef',
    issued: '2025-05-18',
  },
  {
    label: 'Practice Arrays',
    url: 'https://www.codechef.com/certificates/public/85beb5b',
    certificateProvider: 'CodeChef',
    issued: '2025-05-18',
  },
  {
    label: 'Python: The Professional Guide For Beginners (2025 Edition)',
    url: 'https://www.udemy.com/certificate/UC-a42f5012-5cd0-4dd0-accd-dc6acacbdc14/',
    certificateProvider: 'Udemy',
    issued: '2024-03-18',
  },
  {
    label: 'Angular - The Complete Guide',
    url: 'https://www.udemy.com/certificate/UC-e5cb88bb-8c6c-4d3b-ba15-6ec511fd7e64/',
    certificateProvider: 'Udemy',
    issued: '2024-01-16',
  },
  {
    label: 'SQL (Basic) Certificate',
    url: 'https://www.hackerrank.com/certificates/557cec5bac12',
    certificateProvider: 'Hackerrank',
    issued: '2024-02-21',
  },
  {
    label: 'SQL (Intermediate) Certificate',
    url: 'https://www.hackerrank.com/certificates/304c2c9b6823',
    certificateProvider: 'Hackerrank',
    issued: '2024-02-21',
  },
  {
    label: 'Python (Basic) Certificate',
    url: 'https://www.hackerrank.com/certificates/6255503b440e',
    certificateProvider: 'Hackerrank',
    issued: '2024-03-24',
  },
  {
    label: 'JavaScript (Basic) Certificate',
    url: 'https://www.hackerrank.com/certificates/42eda81a65c3',
    certificateProvider: 'Hackerrank',
    issued: '2024-03-24',
  },
  {
    label: 'Problem Solving (Basic) Certificate',
    url: 'https://www.hackerrank.com/certificates/6380def73ee8',
    certificateProvider: 'Hackerrank',
    issued: '2024-04-01',
  },
  {
    label: 'Docker: Your First Project',
    url: 'https://www.linkedin.com/learning/certificates/a93d3c788cd89e1ef2a5ebe8b9dbbb59f5ff73b4a27b96470273c7743ddab0ea?trk=share_certificate',
    certificateProvider: 'LinkedIn',
    issued: '2026-02-25',
  },
  {
    label: 'Intermediate Java: 5 Projects',
    url: 'https://www.linkedin.com/learning/certificates/0a2b299e87de3e0490a391a537f7cf621b6566f122fd8d4907f5e92392a10af6?trk=share_certificate',
    certificateProvider: 'LinkedIn',
    issued: '2026-02-24',
  },
  {
    label: 'Introduction to Maven',
    url: 'https://www.linkedin.com/learning/certificates/7cfaa49c96d7681e123c99f06d529c71450cc096b130443774603cffa45bf183?trk=share_certificate',
    certificateProvider: 'LinkedIn',
    issued: '2026-02-23',
  },
  {
    label: 'Learning Spring 6 with Spring Boot 3',
    url: 'https://www.linkedin.com/learning/certificates/ce75936c5b2cab7ae1f57db9e04a6f34620aab4a769298d2d4207d785be71219?trk=share_certificate',
    certificateProvider: 'LinkedIn',
    issued: '2026-02-20',
  },
  {
    label: 'Learning JDBC',
    url: 'https://www.linkedin.com/learning/certificates/ca275bae4a059cf1bc817c5d693f89aac119916c536c77d2029086c9dd3ed370?trk=share_certificate',
    certificateProvider: 'LinkedIn',
    issued: '2026-02-19',
  },
  {
    label: 'Java Object-Oriented Programming',
    url: 'https://www.linkedin.com/learning/certificates/34fea5769b7557ebfce160cca0742f85c7a54100580212c6cc27cc579bde1bd3?trk=share_certificate',
    certificateProvider: 'LinkedIn',
    issued: '2026-02-18',
  },
  {
    label: 'Java Essential Training: Syntax and Structure',
    url: 'https://www.linkedin.com/learning/certificates/9a458436e8b06f41d32e3c71a15c3710636a5b930d4099cb44e3b6ef3d2d9c60?trk=share_certificate',
    certificateProvider: 'LinkedIn',
    issued: '2026-02-17',
  },
  {
    label: 'Spring Boot 3 Essential Training',
    url: 'https://www.linkedin.com/learning/certificates/5d2cf198631c25ff5c7241b4d565847eda21562dd88a9c42d0a584a42ff917c6?trk=share_certificate',
    certificateProvider: 'LinkedIn',
    issued: '2026-02-17',
  },
  {
    label: 'Java Essential Training: Objects and APIs',
    url: 'https://www.linkedin.com/learning/certificates/435063c97b1c3c082e0e2b84ebe8fa8035729ed1ed80233c34c29a5634cf58f8?trk=share_certificate',
    certificateProvider: 'LinkedIn',
    issued: '2026-02-18',
  },
  {
    label: 'Java: Data Structures',
    url: 'https://www.linkedin.com/learning/certificates/f9e245bbb569729f8f871dda7d7113986ad31c8b59bc4c2f7cee83a86bfe942d?trk=share_certificate',
    certificateProvider: 'LinkedIn',
    issued: '2026-02-18',
  },
  {
    label: 'Java Foundations Professional Certificate by JetBrains',
    url: 'https://www.linkedin.com/learning/certificates/f9b71c12f6134062588087d0fc88371050e56f03e741d3d5bc14135c7edfb558?trk=share_certificate',
    certificateProvider: 'LinkedIn',
    issued: '2026-02-20',
  },
  {
    label: 'Learning Docker',
    url: 'https://www.linkedin.com/learning/certificates/67e6e5e3f0abb53858fb4d4c53ebdb5619cb02b5899fda84180a382ccf354404?trk=share_certificate',
    certificateProvider: 'LinkedIn',
    issued: '2026-02-25',
  },
  {
    label: 'Learning Docker Compose',
    url: 'https://www.linkedin.com/learning/certificates/9e17c6a8241a7473839da7dd54c4fde0b2481d3f407777acabb157e124358428?trk=share_certificate',
    certificateProvider: 'LinkedIn',
    issued: '2026-02-25',
  },
  {
    label: 'Docker Foundations Professional Certificate',
    url: 'https://www.linkedin.com/learning/certificates/04e9109ec6791218fdaafdbcde63eaa62417004c055fdb10745f12a86e4cec5e?trk=share_certificate',
    certificateProvider: 'LinkedIn',
    issued: '2026-02-25',
  },
  {
    label: 'AWS Essential Training for Developers',
    url: 'https://www.linkedin.com/learning/certificates/cf25ab4b0d9294aa6430d50cf905eb7fe7130c11d113a2fd523b0cb216ff9fa4?trk=share_certificate',
    certificateProvider: 'LinkedIn',
    issued: '2026-03-16',
  },
  {
    label: 'Agent Skills with Anthropic',
    url: 'https://www.deeplearning.ai/accomplishments/f0fc3bbb-0030-4f26-8caa-7cc4069f0303',
    certificateProvider: 'DeepLearning.AI',
    issued: '2026-11-13',
  },
];
