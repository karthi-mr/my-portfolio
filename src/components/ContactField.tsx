import type { ReactElement } from "react";

type ContactFieldProps = {
  label: string;
  children: ReactElement;
}

function ContactField({ label, children } : ContactFieldProps): ReactElement {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-fg/90">
        {label}
      </label>
      {children}
    </div>
  );
}

export default ContactField;
