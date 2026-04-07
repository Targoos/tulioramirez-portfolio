import { motion } from "motion/react";
import { useLanguage } from "@/i18n/index.tsx";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <header className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
      <div
        className="absolute inset-0 hidden md:flex items-center justify-center z-0 opacity-10 pointer-events-none"
        aria-hidden="true"
      >
        <span className="font-headline text-[40vw] text-outline leading-none select-none">
          01
        </span>
      </div>

      <div className="relative z-10 container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-4"
        >
          <span className="font-label text-secondary text-sm tracking-[0.3em] uppercase">
            {t.hero.tagline}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 1, ease: EASE }}
          className="font-headline leading-[0.9] tracking-tighter flex flex-col items-center"
          style={{ fontSize: "clamp(3.5rem, 15vw, 12rem)" }}
        >
          <span>TULIO ABRAHAM</span>
          <span className="text-primary">RAMIREZ</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9, ease: EASE }}
          className="font-serif-italic italic text-3xl md:text-5xl mt-8 text-on-surface-variant max-w-2xl mx-auto"
        >
          {t.hero.quote}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.8, ease: EASE }}
          className="mt-12 flex flex-col md:flex-row gap-6 justify-center items-center"
        >
          <a
            href="#projects"
            className="w-full md:w-auto px-8 py-4 bg-primary text-on-primary font-headline text-2xl tracking-wide hover:-translate-y-1 hover:-translate-x-1 transition-transform duration-200 shadow-[4px_4px_0px_#FF6B35]"
          >
            {t.hero.ctaPrimary}
          </a>
          <a
            href="#contact"
            className="w-full md:w-auto px-8 py-4 border border-primary text-primary font-headline text-2xl tracking-wide hover:bg-primary/10 transition-all duration-200"
          >
            {t.hero.ctaSecondary}
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-10 hidden lg:block" aria-hidden="true">
        <div className="flex flex-col gap-2 font-label text-[10px] uppercase text-outline">
          <span>40.7128° N, 74.0060° W</span>
          <span>EST. 2019 / BUILD_01</span>
        </div>
      </div>
    </header>
  );
}
