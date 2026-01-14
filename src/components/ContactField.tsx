import type { ReactElement } from "react";

type ContactFieldProps = {
  label: string;
  children: ReactElement;
}

function ContactField({ label, children } : ContactFieldProps): ReactElement {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium text-slate-200">
        {label}
      </label>
      {children}
    </div>
  );
}

export default ContactField;
