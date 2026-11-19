import { type ComponentType, lazy, type LazyExoticComponent } from "react";

/*
 * After a new deploy, the code files of the previous version are gone. A visitor who still has
 * the old page open would get "Failed to fetch dynamically imported module" when opening another
 * page. In that case we reload once to get the new version; if it fails again, the error is passed
 * on to the error boundary, which shows a friendly message instead of a blank page.
 */

const RELOAD_KEY = "chunk-reload-at";
const RELOAD_WINDOW_MS = 30_000;

/** Reloads the page once per 30 seconds. Returns false if we already reloaded recently. */
export function reloadOnce(): boolean {
  try {
    const last = Number(sessionStorage.getItem(RELOAD_KEY) ?? 0);
    if (Date.now() - last < RELOAD_WINDOW_MS) return false;
    sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
  } catch {
    // storage blocked: still try a single reload
  }
  window.location.reload();
  return true;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- matches React.lazy's own signature
export function lazyWithReload<T extends ComponentType<any>>(
  importer: () => Promise<{ default: T }>
): LazyExoticComponent<T> {
  return lazy(async () => {
    try {
      return await importer();
    } catch (error: unknown) {
      if (reloadOnce()) {
        // keep showing the loader while the page reloads
        return new Promise<{ default: T }>(() => {});
      }
      throw error;
    }
  });
}

// Vite also reports failed preloads of shared code files through this event
if (typeof window !== "undefined") {
  window.addEventListener("vite:preloadError", (event: Event) => {
    if (reloadOnce()) event.preventDefault();
  });
}
