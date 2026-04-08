import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n";

interface FormFields {
  name: string;
  subject: string;
  email: string;
  message: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

const EMPTY_FIELDS: FormFields = { name: "", subject: "", email: "", message: "" };

export function ContactSection() {
  const { t } = useLanguage();
  const [fields, setFields] = useState<FormFields>(EMPTY_FIELDS);
  const [status, setStatus] = useState<FormStatus>("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { id, value } = e.target;
    setFields((prev) => ({ ...prev, [id]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      setFields(EMPTY_FIELDS);
    } catch {
      setStatus("error");
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-24 px-6 md:py-32 bg-background dot-matrix">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2
              id="contact-heading"
              className="font-headline leading-[0.85] mb-12 uppercase"
              style={{ fontSize: "clamp(2.5rem, 10vw, 8rem)" }}
            >
              {t.contact.headingLine1}
              <br />
              {t.contact.headingLine2}{" "}
              <span className="text-primary">{t.contact.headingHighlight}</span>
            </h2>

            <div className="flex flex-col gap-6 max-w-md">
              <a
                href={`https://wa.me/5491123229692?text=${encodeURIComponent(t.contact.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-6 border border-outline-variant/30 hover:bg-primary hover:text-on-primary transition-all duration-300"
              >
                <span className="font-label text-xl uppercase">WhatsApp</span>
                <ArrowRight
                  className="group-hover:rotate-[-45deg] transition-transform"
                  aria-hidden="true"
                />
              </a>
              <a
                href="mailto:tulioramirez0119@gmail.com"
                className="group flex flex-col md:flex-row md:items-center justify-between p-6 border border-outline-variant/30 hover:bg-secondary hover:text-on-primary transition-all duration-300 gap-2"
              >
                <span className="font-label text-xl uppercase">Email</span>
                <span className="font-label text-sm lowercase opacity-60 group-hover:opacity-100">
                  tulioramirez0119@gmail.com
                </span>
              </a>
            </div>
          </div>

          <div className="bg-surface/50 p-8 border border-outline-variant/30">
            {status === "success" ? (
              <div className="h-full flex flex-col items-center justify-center gap-4 py-16">
                <p className="font-headline text-4xl text-primary">TRANSMISSION_SENT</p>
                <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
                  I&apos;ll get back to you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6 font-label text-xs uppercase tracking-widest text-primary hover:underline"
                >
                  Send another →
                </button>
              </div>
            ) : (
              <form className="space-y-8" onSubmit={handleSubmit} noValidate>
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2"
                  >
                    {t.contact.form.nameLabel}
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={fields.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full bg-transparent border-0 border-b border-outline-variant py-4 px-0 focus:ring-0 focus:border-primary text-on-surface font-body placeholder:text-outline-variant/30 disabled:opacity-50"
                    placeholder="ALAN TURING"
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor="subject"
                    className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2"
                  >
                    {t.contact.form.subjectLabel}
                  </label>
                  <input
                    id="subject"
                    type="text"
                    required
                    value={fields.subject}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full bg-transparent border-0 border-b border-outline-variant py-4 px-0 focus:ring-0 focus:border-primary text-on-surface font-body placeholder:text-outline-variant/30 disabled:opacity-50"
                    placeholder="PROJECT_INQUIRY"
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2"
                  >
                    {t.contact.form.emailLabel}
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={fields.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full bg-transparent border-0 border-b border-outline-variant py-4 px-0 focus:ring-0 focus:border-primary text-on-surface font-body placeholder:text-outline-variant/30 disabled:opacity-50"
                    placeholder="HL@PROJECT_ALPHA.COM"
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor="message"
                    className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2"
                  >
                    {t.contact.form.messageLabel}
                  </label>
                  <textarea
                    id="message"
                    required
                    value={fields.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full bg-transparent border-0 border-b border-outline-variant py-4 px-0 focus:ring-0 focus:border-primary text-on-surface font-body placeholder:text-outline-variant/30 resize-none disabled:opacity-50"
                    placeholder="DESCRIBE THE SCOPE..."
                    rows={4}
                  />
                </div>

                {status === "error" && (
                  <p
                    role="alert"
                    className="font-label text-[10px] uppercase tracking-widest text-red-400"
                  >
                    Transmission failed — please try again.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-6 bg-primary text-on-primary font-headline text-2xl tracking-widest hover:bg-secondary transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "TRANSMITTING..." : t.contact.form.submitButton}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
