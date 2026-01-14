import type { FormEvent, ReactElement } from "react";
import ContactField from "../components/ContactField.tsx";
import { IoSend } from "react-icons/io5";

function Contact(): ReactElement {

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    console.log(e);
  }

  return (
    <section className="grow flex flex-col items-center justify-start py-3 md:py-6">
      {/* title */}
      <h2 className="text-2xl md:text-4xl">Contact Me</h2>

      {/* form box */}
      <div
        className="mt-10 w-full max-w-2xl rounded-2xl border border-slate-700/60 bg-slate-900/50
        backdrop-blur-md p-4 md:p-8"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* row 1 */}
          <div className="grid gap-3 md:grid-cols-2">
            {/* first name */}
            <ContactField label="Full Name">
              <input
                type="text"
                placeholder="Full Name"
                required
                className="h-11 w-full rounded-lg border border-slate-700/70 bg-slate-950/40 px-4 text-sm
                text-slate-100 outline-none placeholder:text-slate-500 transition-all focus:border-blue-400/70
                focus:ring-2 focus:ring-blue-500/20"
              />
            </ContactField>

            {/* email */}
            <ContactField label="Email Address">
              <input
                type="email"
                placeholder="Email Address"
                required
                className="h-11 w-full rounded-lg border border-slate-700/70 bg-slate-950/40 px-4 text-sm
                text-slate-100 outline-none placeholder:text-slate-500 transition-all focus:border-blue-400/70
                focus:ring-2 focus:ring-blue-500/20"
              />
            </ContactField>
          </div>

          {/* subject */}
          <ContactField label="Subject">
            <input
              type="text"
              placeholder="Subject"
              required
              className="h-11 w-full rounded-lg border border-slate-700/70 bg-slate-950/40 px-4 text-sm
                text-slate-100 outline-none placeholder:text-slate-500 transition-all focus:border-blue-400/70
                focus:ring-2 focus:ring-blue-500/20"
            />
          </ContactField>

          {/* message */}
          <ContactField label="Your Message">
            <textarea
              placeholder="Your message"
              required
              rows={3}
              className="resize-none w-full py-3 rounded-lg border border-slate-700/70 bg-slate-950/40 px-4 text-sm
                text-slate-100 outline-none placeholder:text-slate-500 transition-all focus:border-blue-400/70
                focus:ring-2 focus:ring-blue-500/20"
            />
          </ContactField>

          {/* button */}
          <div className="pt-2">
            <button
              type="submit"
              className="mx-auto flex h-11 w-[80%] items-center justify-center rounded-xl bg-linear-to-r from-blue-600
              to-cyan-600 text-sm md:text-lg font-semibold text-white shadow-lg transition-all hover:scale-[1.03]
              hover:brightness-110 active:scale-[0.99] cursor-pointer gap-2"
            >
              <span>Send Message</span>
              <IoSend />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Contact;
