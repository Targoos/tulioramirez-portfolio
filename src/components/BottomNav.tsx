import { Home, Layers, Terminal, Mail } from "lucide-react";
import { useLanguage } from "@/i18n/index.tsx";

const BOTTOM_NAV = [
  { icon: Home, label: "HOME", href: "#" },
  { icon: Layers, label: "WORKS", href: "#projects" },
  { icon: Terminal, label: "STACK", href: "#stack" },
  { icon: Mail, label: "MAIL", href: "#contact" },
] as const;

export function BottomNav() {
  const { t } = useLanguage();

  return (
    <nav
      aria-label={t.nav.bottomNavLabel}
      className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-20 bg-background/90 backdrop-blur-xl border-t border-outline-variant/20"
    >
      {BOTTOM_NAV.map(({ icon: Icon, label, href }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          className="flex flex-col items-center justify-center p-4 text-on-surface-variant hover:text-primary transition-colors"
        >
          <Icon size={20} aria-hidden="true" />
          <span className="font-label text-[8px] mt-1" aria-hidden="true">
            {label}
          </span>
        </a>
      ))}
    </nav>
  );
}
