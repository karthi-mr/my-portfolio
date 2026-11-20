import { useEffect, useRef, useState } from "react";

export type CopyState = "idle" | "copied" | "failed";

/** Copies text to the clipboard; `state` shows "copied" / "failed" for 2 seconds. */
export function useCopyToClipboard(): [CopyState, (text: string) => Promise<void>] {
  const [state, setState] = useState<CopyState>("idle");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
    } catch {
      setState("failed");
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), 2000);
  }

  return [state, copy];
}
