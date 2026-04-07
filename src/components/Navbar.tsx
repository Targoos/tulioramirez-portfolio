import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = ['About', 'Stack', 'Projects', 'Contact'] as const;

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      aria-label="Navegación principal"
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300 border-b border-outline-variant/20',
        isScrolled ? 'bg-background/80 backdrop-blur-xl py-4' : 'bg-transparent py-6',
      )}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="font-headline text-3xl tracking-tight text-on-surface">TAR</div>

        <div className="hidden md:flex gap-8 items-center">
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="font-label uppercase text-xs tracking-tighter text-on-surface hover:text-primary transition-colors hover:skew-x-[-10deg]"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-block px-3 py-1 bg-primary text-on-primary font-label text-[10px] uppercase tracking-widest animate-pulse">
            Available for work
          </span>
          <button
            type="button"
            className="md:hidden text-primary"
            aria-label="Abrir menú de navegación"
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
            aria-label="Menú de navegación"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-background z-[100] flex flex-col items-center justify-center gap-8 p-10"
          >
            <button
              type="button"
              className="absolute top-6 right-6 text-primary"
              aria-label="Cerrar menú de navegación"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={32} aria-hidden="true" />
            </button>
            <nav aria-label="Menú de navegación móvil">
              <ul className="flex flex-col items-center gap-6 list-none p-0 m-0">
                {NAV_ITEMS.map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
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
};
