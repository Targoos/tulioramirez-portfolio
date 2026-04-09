import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/index.tsx";
import { NAV_SECTIONS } from "@/data/constants";
import { useScrollThreshold } from "@/hooks/useScrollThreshold";

export function Navbar() {
  const isScrolled = useScrollThreshold(50);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, t, toggleLanguage } = useLanguage();

  return (
    <nav
      aria-label={t.nav.ariaLabel}
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b border-outline-variant/20",
        isScrolled
          ? "bg-background/80 backdrop-blur-xl py-4"
          : "bg-transparent py-6",
      )}
    >
      <div className="container mx-auto px-6 flex justify-between items-center relative">
        <div className="flex flex-1 justify-start items-center gap-4">
          <div className="font-headline text-3xl tracking-tight text-on-surface translate-y-[2px]">
            TAR
          </div>
          <span className="hidden lg:inline-block px-3 py-1 bg-primary text-on-primary font-label text-[10px] uppercase tracking-widest animate-pulse">
            {t.nav.availableForWork}
          </span>
        </div>

        <div className="hidden md:flex gap-8 items-center justify-center">
          {t.nav.items.map((item, i) => (
            <a
              key={item}
              href={`#${NAV_SECTIONS[i]}`}
              className="font-label uppercase text-xs tracking-tighter text-on-surface hover:text-primary transition-colors hover:skew-x-[-10deg]"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex flex-1 justify-end items-center gap-6">
          <button
            type="button"
            onClick={toggleLanguage}
            className="font-label uppercase text-xs tracking-widest text-on-surface hover:text-primary transition-colors hover:skew-x-[-10deg] flex items-center gap-1"
            aria-label={t.nav.changeLanguage}
          >
            <span className={language === "EN" ? "text-primary" : "text-on-surface-variant"}>
              EN
            </span>
            <span className="text-outline-variant/50">/</span>
            <span className={language === "ES" ? "text-primary" : "text-on-surface-variant"}>
              ES
            </span>
          </button>

          <button
            type="button"
            className="md:hidden text-primary"
            aria-label={t.nav.openMenu}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} aria-hidden="true" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t.nav.mobileMenuLabel}
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-background z-[100] flex flex-col items-center justify-center gap-8 p-10"
          >
            <button
              type="button"
              className="absolute top-6 right-6 text-primary"
              aria-label={t.nav.closeMenu}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={32} aria-hidden="true" />
            </button>
            <nav aria-label={t.nav.mobileMenuMobileLabel}>
              <ul className="flex flex-col items-center gap-6 list-none p-0 m-0">
                {t.nav.items.map((item, i) => (
                  <li key={item}>
                    <a
                      href={`#${NAV_SECTIONS[i]}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="font-headline text-5xl text-on-surface hover:text-primary transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
