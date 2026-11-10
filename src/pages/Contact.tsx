import { type FormEvent, type ReactElement, type RefObject, useRef, useState } from "react";
import ContactField from "../components/ContactField.tsx";
import { IoSend } from "react-icons/io5";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import SectionHeader from "../components/SectionHeader.tsx";

type Status = "idle" | "sending" | "success" | "error";

function Contact(): ReactElement {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const formRef: RefObject<HTMLFormElement | null> = useRef<HTMLFormElement | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    // ignore extra clicks while a message is already being sent
    if (!formRef.current || status === "sending") {
      return;
    }

    // spam protection: bots fill the hidden "website" field, people never see it
    const honeypot = new FormData(formRef.current).get("website");
    if (typeof honeypot === "string" && honeypot.trim() !== "") {
      formRef.current.reset();
      setStatus("success");
      setTimeout(() => setStatus("idle"), 2500);
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error(
          "EmailJS env vars missing. Set environment variables"
        );
      }

      await emailjs.sendForm(serviceId, templateId, formRef.current, { publicKey });

      formRef.current.reset();
      setStatus("success");
      setTimeout(() => setStatus("idle"), 2500);
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to send message.");
    }
  }

  return (
    <section className="grow flex flex-col items-center gap-10">
      {/* title */}
      <SectionHeader
        title="Contact Me"
        subtitle="Have a project or question? Let's talk."
      />

      {/* form box */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative w-full max-w-2xl glass p-6 md:p-10 overflow-hidden"
      >
        <div className="pointer-events-none absolute -top-32 -right-32 size-72 rounded-full bg-brand opacity-20 blur-3xl" />
        <form ref={formRef} onSubmit={handleSubmit} className="relative space-y-5">
          {/* honeypot field: hidden from people and screen readers, only bots fill it */}
          <div aria-hidden="true" className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden">
            <label>
              Website
              <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
            </label>
          </div>

          {/* row 1 */}
          <div className="grid gap-5 md:grid-cols-2">
            {/* first name */}
            <ContactField label="Full Name">
              <input
                type="text"
                name="form_name"
                placeholder="Full Name"
                required
                className="field h-12"
              />
            </ContactField>

            {/* email */}
            <ContactField label="Email Address">
              <input
                type="email"
                name="reply_to"
                placeholder="Email Address"
                required
                className="field h-12"
              />
            </ContactField>
          </div>

          {/* subject */}
          <ContactField label="Subject">
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              required
              className="field h-12"
            />
          </ContactField>

          {/* message */}
          <ContactField label="Your Message">
            <textarea
              placeholder="Your message"
              name="message"
              required
              rows={5}
              className="field resize-none"
            />
          </ContactField>

          {/* status */}
          {status === "success" && (
            <p className="rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/25 px-4 py-3 text-center text-sm font-medium text-emerald-600 dark:text-emerald-400">
              ✅ Message sent successfully!
            </p>
          )}
          {status === "error" && (
            <p className="rounded-xl bg-red-500/10 ring-1 ring-red-500/25 px-4 py-3 text-center text-sm font-medium text-red-600 dark:text-red-400">
              ❌ {errorMsg || "Something went wrong. Try again."}
            </p>
          )}

          {/* button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={status === "sending"}
              aria-busy={status === "sending"}
              className="btn btn-primary w-full h-13 text-base disabled:opacity-70 disabled:cursor-wait disabled:hover:translate-y-0 group"
            >
              <span>{status === "sending" ? "Sending..." : "Send Message"}</span>
              <IoSend className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </form>
      </motion.div>
    </section>
  );
}

export default Contact;
