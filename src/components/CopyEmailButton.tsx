import type { ReactElement } from "react";
import { Check, Copy, Mail } from "lucide-react";
import { useCopyToClipboard } from "../hooks/useCopyToClipboard.ts";

type CopyEmailButtonProps = {
  email: string;
  className?: string;
}

/** Shows the email address; clicking copies it (with a short "Copied" confirmation). */
function CopyEmailButton({ email, className = "" }: CopyEmailButtonProps): ReactElement {
  const [state, copy] = useCopyToClipboard();
  const label: string = state === "copied" ? "Copied!" : state === "failed" ? "Couldn't copy" : email;

  return (
    <button
      type="button"
      onClick={() => copy(email)}
      title="Copy email address"
      aria-label={state === "copied" ? "Email address copied" : `Copy email address ${email}`}
      className={`chip text-sm! py-1.5! cursor-pointer transition-colors hover:text-fg hover:border-indigo-400/50 group ${className}`}
    >
      <Mail size={14} className="text-indigo-500" />
      <span aria-live="polite" className={state === "copied" ? "text-emerald-700 dark:text-emerald-300 font-semibold" : ""}>{label}</span>
      {state === "copied"
        ? <Check size={14} className="text-emerald-600 dark:text-emerald-400" />
        : <Copy size={13} className="opacity-50 group-hover:opacity-100 transition-opacity" />}
    </button>
  );
}

export default CopyEmailButton;
