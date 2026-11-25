// Retakes the README screenshots in screenshots/ from the production build, and saves small WebP copies in
// public/projects/ for the "Personal Portfolio" project gallery (so that project always shows the current site).
// Usage: npm run screenshots   (builds first; uses your installed Google Chrome, like the browser tests)
import { spawn } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";

const PORT = 4180;
const BASE = `http://localhost:${PORT}`;

/** [file, path, theme] for the 1440×900 desktop shots */
const DESKTOP = [
  ["home", "/home", "dark"],
  ["home-light", "/home", "light"],
  ["about-me", "/about", "dark"],
  ["projects", "/projects", "dark"],
  ["experience", "/experience", "dark"],
  ["skills", "/skills", "dark"],
  ["skills-light", "/skills", "light"],
  ["certificates", "/certificates", "dark"],
  ["contact-me", "/contact", "dark"],
];

/** PNG -> WebP at most `maxWidth` wide, encoded by Chrome itself (no extra image tools needed) */
async function saveWebp(browser, pngPath, webpPath, maxWidth) {
  const page = await browser.newPage();
  const png = (await readFile(pngPath)).toString("base64");
  const dataUrl = await page.evaluate(async ({ png, maxWidth }) => {
    const img = new Image();
    img.src = `data:image/png;base64,${png}`;
    await img.decode();
    const scale = Math.min(1, maxWidth / img.naturalWidth);
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(img.naturalWidth * scale);
    canvas.height = Math.round(img.naturalHeight * scale);
    canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/webp", 0.8);
  }, { png, maxWidth });
  await writeFile(webpPath, Buffer.from(dataUrl.split(",")[1], "base64"));
  await page.close();
}

async function waitForServer() {
  for (let i = 0; i < 50; i++) {
    try {
      if ((await fetch(BASE)).ok) return;
    } catch {
      // not up yet
    }
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  throw new Error(`preview server did not start on ${BASE}`);
}

/** opens a page with the theme set and waits until fonts, images and entrance animations are done */
async function open(page, path, theme) {
  await page.addInitScript(value => localStorage.setItem("theme", value), theme);
  await page.goto(BASE + path, { waitUntil: "networkidle" });
  await page.getByRole("heading", { level: 1 }).first().waitFor();
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(2500); // count-up numbers and fade-ins finish
}

const server = spawn("npx", ["vite", "preview", "--port", String(PORT), "--strictPort"], { stdio: "ignore" });
try {
  await waitForServer();
  const browser = await chromium.launch({ channel: "chrome" });

  for (const [file, path, theme] of DESKTOP) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: theme });
    const page = await context.newPage();
    await open(page, path, theme);
    await page.screenshot({ path: `screenshots/${file}.png` });
    await context.close();
    console.log(`screenshots/${file}.png`);
  }

  // phone: 390×844 at 2× (iPhone-sized)
  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, colorScheme: "dark",
  });
  const page = await mobile.newPage();
  await open(page, "/home", "dark");
  await page.screenshot({ path: "screenshots/mobile-home.png" });
  console.log("screenshots/mobile-home.png");

  // gallery images for the "Personal Portfolio" project (see ProjectsData.ts)
  for (const [file] of DESKTOP.filter(([name]) => name !== "skills-light")) await saveWebp(browser, `screenshots/${file}.png`, `public/projects/portfolio-${file}.webp`, 1280);
  await saveWebp(browser, "screenshots/mobile-home.png", "public/projects/portfolio-mobile-home.webp", 600);
  console.log("public/projects/portfolio-*.webp");

  await browser.close();
} finally {
  server.kill();
}
