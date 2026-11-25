import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_NAME: string = "Karthi";
const SITE_URL: string = "https://karthi-22.web.app";
const DEFAULT_TITLE: string = "Karthi – Senior Data Scientist | AI/ML, NLP, Python";
const NOT_FOUND_TITLE: string = `Page not found | ${SITE_NAME}`;

// browser-tab title for each page
const pageTitles: Record<string, string> = {
  "/": DEFAULT_TITLE, // redirects to /home
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

/** Adds `<meta name="robots" content="noindex">` while a "Page not found" URL is open, removes it otherwise. */
function setNoIndex(noIndex: boolean): void {
  let meta: HTMLMetaElement | null = document.querySelector('meta[name="robots"]');
  if (noIndex && !meta) {
    meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);
  } else if (!noIndex) {
    meta?.remove();
  }
}

/** Updates the page title and canonical URL on every route change (unknown URLs get "Page not found" + noindex). */
function RouteMeta(): null {
  const { pathname } = useLocation();

  useEffect(() => {
    // "/about/" is the same page as "/about"
    const path: string = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
    const url: string = `${SITE_URL}${path}`;
    const isKnownPage: boolean = path in pageTitles;

    document.title = isKnownPage ? pageTitles[path] : NOT_FOUND_TITLE;
    setNoIndex(!isKnownPage);
    setLinkHref('link[rel="canonical"]', url);
    setMetaContent('meta[property="og:url"]', url);
  }, [pathname]);

  return null;
}

export default RouteMeta;
