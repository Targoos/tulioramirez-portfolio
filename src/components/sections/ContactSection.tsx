import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n";
import { useContactForm } from "@/hooks/useContactForm";

export function ContactSection() {
  const { t } = useLanguage();
  const { fields, status, errors, handleChange, handleSubmit, resetStatus } = useContactForm();

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
                  onClick={resetStatus}
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
                    value={fields.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    aria-invalid={!!errors.name}
                    className="w-full bg-transparent border-0 border-b border-outline-variant py-4 px-0 focus:ring-0 focus:border-primary text-on-surface font-body placeholder:text-outline-variant/30 disabled:opacity-50"
                    placeholder="ALAN TURING"
                  />
                  {errors.name && (
                    <p role="alert" className="mt-1 font-label text-[9px] uppercase tracking-widest text-red-400">
                      {errors.name}
                    </p>
                  )}
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
                    value={fields.subject}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    aria-invalid={!!errors.subject}
                    className="w-full bg-transparent border-0 border-b border-outline-variant py-4 px-0 focus:ring-0 focus:border-primary text-on-surface font-body placeholder:text-outline-variant/30 disabled:opacity-50"
                    placeholder="PROJECT_INQUIRY"
                  />
                  {errors.subject && (
                    <p role="alert" className="mt-1 font-label text-[9px] uppercase tracking-widest text-red-400">
                      {errors.subject}
                    </p>
                  )}
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
                    value={fields.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    aria-invalid={!!errors.email}
                    className="w-full bg-transparent border-0 border-b border-outline-variant py-4 px-0 focus:ring-0 focus:border-primary text-on-surface font-body placeholder:text-outline-variant/30 disabled:opacity-50"
                    placeholder="HL@PROJECT_ALPHA.COM"
                  />
                  {errors.email && (
                    <p role="alert" className="mt-1 font-label text-[9px] uppercase tracking-widest text-red-400">
                      {errors.email}
                    </p>
                  )}
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
                    value={fields.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    aria-invalid={!!errors.message}
                    className="w-full bg-transparent border-0 border-b border-outline-variant py-4 px-0 focus:ring-0 focus:border-primary text-on-surface font-body placeholder:text-outline-variant/30 resize-none disabled:opacity-50"
                    placeholder="DESCRIBE THE SCOPE..."
                    rows={4}
                  />
                  {errors.message && (
                    <p role="alert" className="mt-1 font-label text-[9px] uppercase tracking-widest text-red-400">
                      {errors.message}
                    </p>
                  )}
                </div>

                {status === "error" && (
                  <p
                    role="alert"
                    className="font-label text-[10px] uppercase tracking-widest text-red-400"
                  >
                    {t.contact.form.errorMessage}
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
