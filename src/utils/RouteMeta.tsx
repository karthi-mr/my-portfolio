import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_NAME: string = "Karthi";
const SITE_URL: string = "https://karthi-22.web.app";
const DEFAULT_TITLE: string = "Karthi – Full Stack Developer | Spring Boot, React, Angular";

// browser-tab title for each page
const pageTitles: Record<string, string> = {
  "/home": DEFAULT_TITLE,
  "/about": `About Me | ${SITE_NAME}`,
  "/projects": `Projects | ${SITE_NAME}`,
  "/experience": `Experience | ${SITE_NAME}`,
  "/skills": `Skills & Technologies | ${SITE_NAME}`,
  "/certificates": `Achievements & Certifications | ${SITE_NAME}`,
  "/contact": `Contact Me | ${SITE_NAME}`,
};

function setLinkHref(selector: string, href: string): void {
  document.querySelector<HTMLLinkElement>(selector)?.setAttribute("href", href);
}

function setMetaContent(selector: string, content: string): void {
  document.querySelector<HTMLMetaElement>(selector)?.setAttribute("content", content);
}

/** Updates the page title and canonical URL on every route change. */
function RouteMeta(): null {
  const { pathname } = useLocation();

  useEffect(() => {
    const url: string = `${SITE_URL}${pathname}`;

    document.title = pageTitles[pathname] ?? DEFAULT_TITLE;
    setLinkHref('link[rel="canonical"]', url);
    setMetaContent('meta[property="og:url"]', url);
  }, [pathname]);

  return null;
}

export default RouteMeta;
