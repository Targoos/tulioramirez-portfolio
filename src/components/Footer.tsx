import { Github, Linkedin, Twitter } from "lucide-react";
import { useLanguage } from "@/i18n/index.tsx";

const SOCIAL_LINKS = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
] as const;

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-outline-variant/20 bg-background py-12 px-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="font-headline text-3xl">TAR_01</div>

        <div className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/50 text-center">
          {t.footer.copyright}
        </div>

        <div className="flex gap-6">
          {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="text-on-surface-variant hover:text-primary transition-colors"
            >
              <Icon size={20} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
