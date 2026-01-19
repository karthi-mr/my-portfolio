export type CertificateProvider = "All" | "CodeChef" | "Udemy" | "Hackerrank";

export type CertificateData = {
  label: string;
  url: string;
  certificateProvider: CertificateProvider;
}

export const certificatesData: CertificateData[] = [
  {
    label: "CodeChef Certified Foundation Level Exam",
    url: "https://www.codechef.com/certificates/public/7a3b6ac",
    certificateProvider: "CodeChef"
  },
  {
    label: "Git/Github",
    url: "https://www.codechef.com/certificates/public/ad17bb0",
    certificateProvider: "CodeChef"
  },
  {
    label: "Practice Java",
    url: "https://www.codechef.com/certificates/public/eb5e50d",
    certificateProvider: "CodeChef"
  },
  {
    label: "Practice JavaScript",
    url: "https://www.codechef.com/certificates/public/84f29b1",
    certificateProvider: "CodeChef"
  },
  {
    label: "Practice Python",
    url: "https://www.codechef.com/certificates/public/ae799ff",
    certificateProvider: "CodeChef"
  },
  {
    label: "Practice Basic Math",
    url: "https://www.codechef.com/certificates/public/88592ad",
    certificateProvider: "CodeChef"
  },
  {
    label: "Learn React JS for Front-end development",
    url: "https://www.codechef.com/certificates/public/2692faf",
    certificateProvider: "CodeChef"
  },
  {
    label: "Learn SQL",
    url: "https://www.codechef.com/certificates/public/5216ecf",
    certificateProvider: "CodeChef"
  },
  {
    label: "Learn JavaScript",
    url: "https://www.codechef.com/certificates/public/677de45",
    certificateProvider: "CodeChef"
  },
  {
    label: "Learn Java",
    url: "https://www.codechef.com/certificates/public/04d5368",
    certificateProvider: "CodeChef"
  },
  {
    label: "Learn Python Programming",
    url: "https://www.codechef.com/certificates/public/cf3f218",
    certificateProvider: "CodeChef"
  },
  {
    label: "500 to 1000 difficulty rating",
    url: "https://www.codechef.com/certificates/public/8664310",
    certificateProvider: "CodeChef"
  },
  {
    label: "Linked Lists",
    url: "https://www.codechef.com/certificates/public/0129472",
    certificateProvider: "CodeChef"
  },
  {
    label: "Practice Arrays",
    url: "https://www.codechef.com/certificates/public/85beb5b",
    certificateProvider: "CodeChef"
  },
  {
    label: "Python: The Professional Guide For Beginners (2025 Edition)",
    url: "https://www.udemy.com/certificate/UC-a42f5012-5cd0-4dd0-accd-dc6acacbdc14/",
    certificateProvider: "Udemy"
  },
  {
    label: "Angular - The Complete Guide",
    url: "https://www.udemy.com/certificate/UC-e5cb88bb-8c6c-4d3b-ba15-6ec511fd7e64/",
    certificateProvider: "Udemy"
  },
  {
    label: "SQL (Basic) CertificateCard",
    url: "https://www.hackerrank.com/certificates/557cec5bac12",
    certificateProvider: "Hackerrank"
  },
  {
    label: "SQL (Intermediate) CertificateCard",
    url: "https://www.hackerrank.com/certificates/304c2c9b6823",
    certificateProvider: "Hackerrank"
  },
  {
    label: "Python (Basic) CertificateCard",
    url: "https://www.hackerrank.com/certificates/6255503b440e",
    certificateProvider: "Hackerrank"
  },
  {
    label: "JavaScript (Basic) CertificateCard",
    url: "https://www.hackerrank.com/certificates/42eda81a65c3",
    certificateProvider: "Hackerrank"
  },
  {
    label: "Problem Solving (Basic) CertificateCard",
    url: "https://www.hackerrank.com/certificates/6380def73ee8",
    certificateProvider: "Hackerrank"
  },
];