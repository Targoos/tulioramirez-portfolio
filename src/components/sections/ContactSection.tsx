import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/index.tsx";

export function ContactSection() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-24 px-6 md:py-32 bg-background dot-matrix">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2
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
                href="#"
                className="group flex items-center justify-between p-6 border border-outline-variant/30 hover:bg-primary hover:text-on-primary transition-all duration-300"
              >
                <span className="font-label text-xl uppercase">WhatsApp</span>
                <ArrowRight className="group-hover:rotate-[-45deg] transition-transform" aria-hidden="true" />
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
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
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
                  className="w-full bg-transparent border-0 border-b border-outline-variant py-4 px-0 focus:ring-0 focus:border-primary text-on-surface font-body placeholder:text-outline-variant/30"
                  placeholder="HEDY LAMARR"
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
                  className="w-full bg-transparent border-0 border-b border-outline-variant py-4 px-0 focus:ring-0 focus:border-primary text-on-surface font-body placeholder:text-outline-variant/30"
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
                  className="w-full bg-transparent border-0 border-b border-outline-variant py-4 px-0 focus:ring-0 focus:border-primary text-on-surface font-body placeholder:text-outline-variant/30 resize-none"
                  placeholder="DESCRIBE THE SCOPE..."
                  rows={4}
                />
              </div>
              <button
                type="submit"
                className="w-full py-6 bg-primary text-on-primary font-headline text-2xl tracking-widest hover:bg-secondary transition-colors duration-300"
              >
                {t.contact.form.submitButton}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
