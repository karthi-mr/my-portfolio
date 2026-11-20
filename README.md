## Portfolio website

**Demo URL: https://karthi-22.web.app**

Personal portfolio of Karthi – Senior Data Scientist (AI/ML), with a background in QA and test automation, data analysis, and Java & Python engineering.

### Features
- **Light & dark theme** – follows the system theme by default; the navbar toggle switches System → Light → Dark and remembers the choice
- **Modern UI** – glass cards, gradient accents, animated background and smooth page animations
- **Projects** – cards with screenshots (or a generated cover when there are none) and a details modal with an image slider
- **Experience timeline** – alternating timeline that fills as you scroll
- **Skills & certificates filters** – search plus a multi-select filter; categories and platforms are built from the data automatically
- **Brand-colored icons** – every skill logo uses its original color, certificate platforms show their own icon
- **Contact form** – sends email through EmailJS, with spam protection
- **SEO & sharing** – page titles per route, meta description, link-preview image, sitemap and robots.txt
- **Fast** – each page is loaded only when opened, fonts are bundled with the site, screenshots load as small WebP thumbnails
- **Responsive** – works on mobile, tablet and desktop

### Tech used
- TypeScript
- React
- Tailwind CSS
- Lucide React & React Icons (icons)
- React router dom
- Framer motion
- Swiper
- Email js
- Firebase Hosting (deployed by GitHub Actions on every merge to `main`)

### Run locally
```bash
npm install
npm run dev
```

Other scripts: `npm run build` (production build into `dist/`), `npm run preview` (serve the build), `npm run lint`,
`npm run test:e2e` (build + browser tests with Playwright, using your installed Google Chrome).

The browser tests in `e2e/` also run in GitHub Actions before every deploy, on desktop and mobile screen sizes.

### Environment variables
| Variable | Purpose |
| --- | --- |
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service used by the contact form |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template used by the contact form |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key |

### Security headers
`firebase.json` sends security headers on every page, including a Content-Security-Policy (CSP) that only allows
scripts, fonts and styles from this site, images from this site, GitHub, wsrv.nl and Google's favicon service,
and network requests to EmailJS. `npm run preview` and the browser tests use the same headers.
- Images from a **new external site** (e.g. screenshots hosted elsewhere) must be added to `img-src` in `firebase.json`;
  the "nothing is blocked by the Content-Security-Policy" test fails otherwise.
- If you edit the inline theme script in `index.html`, the build stops and prints the new `sha256-…` value to put in `script-src`.

### Dependency updates
Dependabot (`.github/dependabot.yml`) opens a weekly pull request with minor and patch updates and separate ones for
major versions and security fixes. Each runs lint, build and the browser tests; merge it when the checks are green.

### Updating content
All content lives in `src/data/`:
- **Skills** – `SkillsData.ts`. Any `category` works (e.g. `'AI/ML'`, `'Data Science'`); its filter option appears automatically.
  Brand colors for many tools (incl. TensorFlow, PyTorch, Pandas, NumPy, scikit-learn, …) are in `src/utils/SkillGlow.ts`.
- **Certificates** – `CertificatesData.ts`. Any `certificateProvider` works (e.g. `'Coursera'`, `'Kaggle'`); the filter shows it with the site's own icon.
  Add `issued: '2025-03'` (or `'2025-03-14'`) to show "Issued Mar 2025"; dated certificates are listed newest first.
  Platform colors are in `src/utils/CertificatesGlow.ts`.
- **Projects** – `ProjectsData.ts`. Screenshot links can be GitHub file links; projects without screenshots get a generated cover.
  Optional `category` (e.g. `'Full Stack'`, `'AI/ML'`) and `featured: true` (listed first and shown on the Home page, max 3).
- **Experience** – `ExperienceData.ts`.

### Screenshots
- Home
  ![Home](screenshots/home.png)
- Home (light theme)
  ![Home light](screenshots/home-light.png)
- About Me
  ![About Me](screenshots/about-me.png)
- Projects
  ![Projects](screenshots/projects.png)
- Experience
  ![Experience](screenshots/experience.png)
- Skills
  ![Skills](screenshots/skills.png)
- Skills (light theme)
  ![Skills light](screenshots/skills-light.png)
- Certificates
  ![Certificates](screenshots/certificates.png)
- Contact Me
  ![Contact Me](screenshots/contact-me.png)
- Mobile
  <img src="screenshots/mobile-home.png" alt="Mobile home" width="320" />
