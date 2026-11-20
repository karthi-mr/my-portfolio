import { expect, type Locator, type Page, test } from "@playwright/test";

const PAGES: { path: string; heading: RegExp }[] = [
  { path: "/home", heading: /Hi, I'm/ },
  { path: "/about", heading: /About Me/ },
  { path: "/projects", heading: /Projects/ },
  { path: "/experience", heading: /Experience/ },
  { path: "/skills", heading: /Skills & Technologies/ },
  { path: "/certificates", heading: /Achievements & Certifications/ },
  { path: "/contact", heading: /Contact Me/ },
];

/** "Showing 12 of 25" -> 12 */
async function shownCount(page: Page): Promise<number> {
  const text: string = await page.getByText(/^Showing \d+ of \d+$/).innerText();
  return Number(text.match(/Showing (\d+)/)![1]);
}

/** every card in the results grid is fully visible (guards the "cards stay invisible after clearing" bug) */
async function expectAllCardsVisible(grid: Locator, expected: number): Promise<void> {
  await expect(grid.locator(":scope > div")).toHaveCount(expected);
  await expect.poll(async () => grid.locator(":scope > div").evaluateAll(cards =>
    cards.filter(card => Number(getComputedStyle(card).opacity) < 0.98).length)).toBe(0);
}

async function openFilter(page: Page, name: RegExp): Promise<Locator> {
  await page.getByRole("button", { name }).click();
  return page.getByRole("listbox");
}

async function search(page: Page, text: string): Promise<void> {
  await page.getByRole("searchbox").fill(text);
}

test.describe("pages", () => {
  for (const { path, heading } of PAGES) {
    test(`${path} renders without errors`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", error => errors.push(error.message));
      await page.goto(path);
      await expect(page.getByRole("heading", { level: 1, name: heading }).first()).toBeVisible();
      expect(errors).toEqual([]);
    });
  }

  test("unknown URLs go to the home page", async ({ page }) => {
    await page.goto("/does-not-exist");
    await expect(page).toHaveURL(/\/home$/);
  });

  test("each page has its own browser-tab title", async ({ page }) => {
    await page.goto("/skills");
    await expect(page).toHaveTitle("Skills & Technologies | Karthi");
  });
});

test.describe("theme", () => {
  test("toggle cycles System -> Light -> Dark and remembers the choice", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/home");
    const html = page.locator("html");
    await expect(html).toHaveClass(/dark/);

    const toggle = page.getByRole("button", { name: /theme/i });
    await toggle.click();
    await expect(html).toHaveClass(/light/);
    await page.reload();
    await expect(html).toHaveClass(/light/);

    await page.getByRole("button", { name: /theme/i }).click();
    await expect(html).toHaveClass(/dark/);
    await page.getByRole("button", { name: /theme/i }).click(); // back to System
    expect(await page.evaluate(() => localStorage.getItem("theme"))).toBeNull();
  });
});

test.describe("skills & certificates filters", () => {
  test("skills: category filter, search, and clearing brings every card back", async ({ page }) => {
    await page.goto("/skills");
    const grid = page.locator("main .grid").first();
    const total: number = await shownCount(page);
    await expectAllCardsVisible(grid, total);

    await search(page, "java");
    await expect.poll(() => shownCount(page)).toBeLessThan(total);
    await search(page, "");
    await expectAllCardsVisible(grid, total);

    const list = await openFilter(page, /Category/);
    await list.getByRole("option").first().click();
    await list.getByRole("option").nth(1).click();
    const filtered: number = await shownCount(page);
    expect(filtered).toBeLessThan(total);
    await page.keyboard.press("Escape"); // close the dropdown (it covers "Clear all" on small screens)
    await expect(list).toBeHidden();
    await page.getByRole("button", { name: "Clear all" }).click();
    await expectAllCardsVisible(grid, total);
  });

  test("certificates: picking two platforms shows both", async ({ page }) => {
    await page.goto("/certificates");
    const list = await openFilter(page, /Platform/);
    const counts: number[] = [];
    for (const index of [0, 1]) {
      const option = list.getByRole("option").nth(index);
      counts.push(Number(await option.locator("span").last().innerText()));
      await option.click();
    }
    await expect.poll(() => shownCount(page)).toBe(counts[0] + counts[1]);
  });

  test("no results shows a message and a way back", async ({ page }) => {
    await page.goto("/certificates");
    await search(page, "zzz-no-such-certificate");
    await expect(page.getByText("No certificates match your filters.")).toBeVisible();
    await page.getByRole("button", { name: "Clear filters" }).click();
    await expect.poll(() => shownCount(page)).toBeGreaterThan(0);
  });
});

test.describe("projects", () => {
  test("filter by category and technology, and search", async ({ page }) => {
    await page.goto("/projects");
    const total: number = await shownCount(page);
    const list = await openFilter(page, /^Filter/);
    await expect(list.getByRole("presentation")).toHaveText(["Category", "Technology"]);

    await list.getByRole("option", { name: /Backend/ }).click();
    const backend: number = await shownCount(page);
    expect(backend).toBeGreaterThan(0);
    expect(backend).toBeLessThan(total);

    await page.keyboard.press("Escape");
    await expect(list).toBeHidden();
    await page.getByRole("button", { name: "Clear all" }).click();
    await search(page, "razorpay");
    await expect.poll(() => shownCount(page)).toBe(1);
  });

  test("clicking a card opens details; Back closes it and stays on Projects", async ({ page }) => {
    await page.goto("/projects");
    await page.locator("main article").first().locator("p").click();
    const dialog = page.locator("dialog.project-modal");
    await expect(dialog).toBeVisible();
    await expect(page).toHaveURL(/\?project=/);

    await page.goBack();
    await expect(dialog).toBeHidden();
    await expect(page).toHaveURL(/\/projects$/);
  });

  test("shared project link opens that project; next/previous and Esc work", async ({ page }) => {
    await page.goto("/projects?project=expense-tracker");
    const dialog = page.locator("dialog.project-modal");
    await expect(dialog.getByRole("heading", { level: 2 })).toHaveText("Expense Tracker");
    await expect(page).toHaveTitle(/Expense Tracker/);

    const counter = dialog.getByText(/^Project \d+ \/ \d+$/);
    const before: string = await counter.innerText();
    await dialog.getByRole("button", { name: "Next", exact: false }).last().click();
    await expect(counter).not.toHaveText(before);

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(page).toHaveURL(/\/projects$/);
  });

  test("full-screen viewer: first Esc closes only the viewer", async ({ page }) => {
    await page.goto("/projects?project=expense-tracker");
    const dialog = page.locator("dialog.project-modal");
    await dialog.getByRole("button", { name: "View full screen" }).click();
    const viewer = page.locator("dialog.lightbox");
    await expect(viewer).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(viewer).toBeHidden();
    await expect(dialog).toBeVisible();
  });

  test("featured projects on Home open in the Projects page", async ({ page }) => {
    await page.goto("/home");
    const featured = page.getByRole("heading", { name: /Featured Projects/ }).locator("xpath=ancestor::section[1]");
    await expect(featured.locator("article")).toHaveCount(3);
    await featured.locator("article").first().getByRole("button", { name: /View details/ }).click();
    await expect(page).toHaveURL(/\/projects\?project=/);
    await expect(page.locator("dialog.project-modal")).toBeVisible();
  });
});

test.describe("contact form", () => {
  async function fill(page: Page): Promise<void> {
    await page.getByPlaceholder("Full Name").fill("Test Person");
    await page.getByPlaceholder("Email Address").fill("test@example.com");
    await page.getByPlaceholder("Subject").fill("Hello");
    await page.getByPlaceholder("Your message").fill("Just testing");
  }

  test("sends once, disables the button while sending, shows success", async ({ page }) => {
    let requests = 0;
    // never contact the real EmailJS service from tests
    await page.route("**/api.emailjs.com/**", async route => {
      requests += 1;
      await new Promise(resolve => setTimeout(resolve, 800));
      await route.fulfill({ status: 200, body: "OK" });
    });
    await page.goto("/contact");
    await fill(page);
    const send = page.getByRole("button", { name: /Send Message|Sending/ });
    await send.click();
    await expect(send).toBeDisabled();
    await send.click({ force: true }); // a second click while sending must be ignored
    await expect(page.getByText("Message sent successfully!")).toBeVisible();
    expect(requests).toBe(1);
  });

  test("spam bots that fill the hidden field are ignored", async ({ page }) => {
    let requests = 0;
    await page.route("**/api.emailjs.com/**", route => { requests += 1; return route.abort(); });
    await page.goto("/contact");
    await fill(page);
    await page.locator('input[name="website"]').evaluate((input: HTMLInputElement) => { input.value = "http://spam.example"; });
    await page.getByRole("button", { name: /Send Message/ }).click();
    await expect(page.getByText("Message sent successfully!")).toBeVisible();
    expect(requests).toBe(0);
  });
});

test.describe("navigation", () => {
  test("mobile menu opens, navigates and closes", async ({ page, isMobile }) => {
    test.skip(!isMobile, "the menu button only exists on small screens");
    await page.goto("/home");
    // wait for the page content, so its own "View Projects" links exist too (they must not be matched)
    await expect(page.getByRole("link", { name: "View Projects" })).toBeVisible();
    await page.getByRole("button", { name: "Open menu" }).click();
    const menu = page.getByRole("dialog", { name: "Menu" });
    await expect(menu).toBeVisible();
    await menu.getByRole("link", { name: "Projects", exact: true }).click();
    await expect(page).toHaveURL(/\/projects$/);
    await expect(menu).toBeHidden();
  });

  test("open mobile menu blocks the page behind it; Esc closes it and restores focus", async ({ page, isMobile }) => {
    test.skip(!isMobile, "the menu button only exists on small screens");
    await page.goto("/home");
    // wait for the page content first, so the check below is about the menu, not about loading timing
    const pageLink = page.getByRole("link", { name: "View Projects" });
    await expect(pageLink).toBeVisible();

    const openButton = page.getByRole("button", { name: "Open menu" });
    await openButton.click();
    const menu = page.getByRole("dialog", { name: "Menu" });
    await expect(menu.getByRole("button", { name: "Close menu" })).toBeFocused();

    // the page behind the menu is inert: not focusable, not clickable, hidden from screen readers.
    // (Playwright's getByRole does not take `inert` into account, so check the attribute and focus directly.)
    for (const region of ["header", "main", "footer"]) {
      await expect(page.locator(region).first()).toHaveAttribute("inert", "");
    }
    expect(await pageLink.evaluate((link: HTMLElement) => { link.focus(); return document.activeElement === link; })).toBe(false);

    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await expect(openButton).toBeFocused();
    await expect(page.locator("main")).not.toHaveAttribute("inert", "");
    expect(await pageLink.evaluate((link: HTMLElement) => { link.focus(); return document.activeElement === link; })).toBe(true);
  });

  test("a page whose code fails to download shows a reload screen instead of a blank page", async ({ page }) => {
    await page.goto("/home");
    await page.route(/\/assets\/Skills-[^/]+\.js$/, route => route.abort());
    await page.evaluate(() => window.history.pushState({}, "", "/skills"));
    await page.evaluate(() => window.dispatchEvent(new PopStateEvent("popstate")));
    // the site reloads once to fetch the latest version; when that also fails, the reload screen appears
    await expect(page.getByRole("alert")).toContainText("This page couldn't load", { timeout: 15_000 });
    await expect(page.getByRole("button", { name: "Reload page" })).toBeVisible();
  });
});

test.describe("security headers", () => {
  test("pages are served with the security headers from firebase.json", async ({ page }) => {
    const response = await page.goto("/home");
    const headers = response!.headers();
    expect(headers["content-security-policy"]).toContain("default-src 'self'");
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["x-frame-options"]).toBe("DENY");
    expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  });

  test("nothing on the site is blocked by the Content-Security-Policy", async ({ page }) => {
    // record every CSP violation the browser reports
    await page.addInitScript(() => {
      (window as unknown as { __cspViolations: string[] }).__cspViolations = [];
      document.addEventListener("securitypolicyviolation", (event) => {
        (window as unknown as { __cspViolations: string[] }).__cspViolations.push(`${event.violatedDirective} ${event.blockedURI}`);
      });
    });
    const violations: string[] = [];
    const collect = async () => violations.push(...await page.evaluate(() => (window as unknown as { __cspViolations: string[] }).__cspViolations));

    for (const { path } of PAGES) {
      await page.goto(path);
      await page.waitForLoadState("networkidle");
      // scroll so lazy images (thumbnails, favicons) load
      await page.evaluate(async () => {
        for (let y = 0; y < document.documentElement.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 80)); }
      });
      await page.waitForLoadState("networkidle");
      await collect();
    }

    // project with screenshots: gallery thumbnails + full-screen originals
    await page.goto("/projects?project=expense-tracker");
    await page.locator("dialog.project-modal").getByRole("button", { name: "View full screen" }).click();
    await page.waitForLoadState("networkidle");
    await collect();

    // the theme script must run (it is allowed by its hash)
    expect(await page.locator("html").getAttribute("class")).toMatch(/light|dark/);
    // external images actually load (GitHub screenshot thumbnail and a certificate favicon)
    await page.goto("/projects");
    await expect.poll(() => page.locator("main article img").first().evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
    await page.goto("/certificates");
    await expect.poll(() => page.locator("main a img").first().evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
    await collect();

    expect(violations).toEqual([]);
  });
});

test.describe("home, contact & guidance", () => {
  test("hero: email copies on click, profile links and phone link are present", async ({ page, context, browserName }) => {
    test.skip(browserName !== "chromium", "clipboard permissions are Chromium-only");
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/home");
    await page.getByRole("button", { name: /Copy email address/ }).click();
    await expect(page.getByText("Copied!")).toBeVisible();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe("mkarthim1998@gmail.com");
    await expect(page.getByRole("link", { name: "GitHub profile" })).toHaveAttribute("href", "https://github.com/karthi-mr");
    await expect(page.getByRole("link", { name: "LinkedIn profile" })).toHaveAttribute("href", "https://www.linkedin.com/in/karthi-mr");
    await expect(page.getByRole("link", { name: "+91 7708006145" })).toHaveAttribute("href", "tel:+917708006145");
  });

  test("stats count up to the real numbers", async ({ page }) => {
    await page.goto("/home");
    const stats = page.getByRole("list", { name: "At a glance" });
    await stats.scrollIntoViewIfNeeded();
    // the visible number animates; once settled it equals the screen-reader number
    for (const item of await stats.getByRole("listitem").all()) {
      const finalValue: string = await item.locator(".sr-only").innerText();
      await expect(item.locator("[aria-hidden=true]").first()).toHaveText(finalValue);
    }
  });

  test("each page ends with a Next card that leads through the site", async ({ page }) => {
    await page.goto("/about");
    const next = page.getByRole("navigation", { name: "Next page" }).getByRole("link");
    await expect(next).toContainText("Projects");
    await next.click();
    await expect(page).toHaveURL(/\/projects$/);

    await page.goto("/contact");
    await page.getByRole("navigation", { name: "Next page" }).getByRole("link").click();
    await expect(page).toHaveURL(/\/home$/);
  });

  test("back-to-top button appears after scrolling and scrolls up", async ({ page }) => {
    await page.goto("/certificates");
    // wait until the page content is there (otherwise there is nothing to scroll yet)
    await expect(page.locator("main .grid > div").first()).toBeVisible();
    const button = page.getByRole("button", { name: "Back to top" });
    await expect(button).toBeHidden();
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await expect(button).toBeVisible();
    await button.click();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(5);
  });

  test("footer links reach every page", async ({ page }) => {
    await page.goto("/home");
    const footer = page.getByRole("navigation", { name: "Footer" });
    await expect(footer.getByRole("link")).toHaveCount(7);
    await footer.getByRole("link", { name: "Experience", exact: true }).click();
    await expect(page).toHaveURL(/\/experience$/);
  });

  test("certificates: 12 at first, Show all reveals every match", async ({ page }) => {
    await page.goto("/certificates");
    const grid = page.locator("main .grid").first();
    const total: number = await shownCount(page);
    await expect(grid.locator(":scope > div")).toHaveCount(Math.min(total, 12));
    await page.getByRole("button", { name: `Show all ${total} certificates` }).click();
    await expect(grid.locator(":scope > div")).toHaveCount(total);
    await page.getByRole("button", { name: "Show fewer" }).click();
    await expect(grid.locator(":scope > div")).toHaveCount(12);
  });

  test("contact page offers direct ways to reach me next to the form", async ({ page }) => {
    await page.goto("/contact");
    const panel = page.getByRole("complementary", { name: "Reach me directly" });
    await expect(panel.getByRole("link", { name: "mkarthim1998@gmail.com" })).toHaveAttribute("href", "mailto:mkarthim1998@gmail.com");
    await expect(panel.getByRole("button", { name: "Copy email address" })).toBeVisible();
    for (const name of [/WhatsApp/, /LinkedIn/, /GitHub/, /Phone/, /Resume/]) {
      await expect(panel.getByRole("link", { name })).toBeVisible();
    }
    await expect(page.getByRole("heading", { name: "Send a message" })).toBeVisible();
  });

  test("experience: current role first, AquilaTest shown once with both periods", async ({ page }) => {
    await page.goto("/experience");
    const cards = page.locator("main ol > li");
    await expect(cards.first()).toContainText("Senior Data Scientist");
    await expect(cards.first()).toContainText("Current");
    await expect(page.getByRole("heading", { name: /AquilaTest/ })).toHaveCount(1);
    const periods = page.getByRole("list", { name: "Periods" });
    await expect(periods).toContainText("Full Time");
    await expect(periods).toContainText("Part Time");
  });
});
