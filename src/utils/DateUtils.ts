/** "2025-03" or "2025-03-14" -> "Mar 2025" (returns undefined for missing / invalid dates) */
export function formatIssued(issued: string | undefined): string | undefined {
  if (!issued) return undefined;
  const match: RegExpMatchArray | null = issued.match(/^(\d{4})-(\d{2})(?:-(\d{2}))?$/);
  if (!match) return undefined;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3] ?? 1));
  if (Number.isNaN(date.getTime())) return undefined;
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

/** sort key for an "issued" date: undated items sort last */
export function issuedSortKey(issued: string | undefined): string {
  return formatIssued(issued) ? issued! : "";
}
