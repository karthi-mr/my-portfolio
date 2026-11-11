/**
 * URL-friendly id for a project, used in shareable links like /projects?project=expense-tracker
 * e.g. "WebSockets Demo – Real-Time Chat Application" -> "websockets-demo-real-time-chat-application"
 */
export function projectSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
