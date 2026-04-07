/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import {
  ArrowRight,
  Mail,
  Terminal,
  Layers,
  Home,
  Github,
  Linkedin,
  Twitter,
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { ProjectCard } from '@/components/ProjectCard';
import { CustomCursor } from '@/components/CustomCursor';
import { PROJECTS, TECH_STACK } from '@/data/constants';
import { cn } from '@/lib/utils';

const STATS = [
  { val: '05', label: 'Years Professional Experience' },
  { val: '04', label: 'Years in Real Product Dev' },
  { val: '03+', label: 'Major Frameworks' },
  { val: '∞', label: 'Intellectual Curiosity' },
] as const;

const SOCIAL_LINKS = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
] as const;

const BOTTOM_NAV = [
  { icon: Home, label: 'HOME', href: '#' },
  { icon: Layers, label: 'WORKS', href: '#projects' },
  { icon: Terminal, label: 'STACK', href: '#stack' },
  { icon: Mail, label: 'MAIL', href: '#contact' },
] as const;

export default function App() {
  return (
    <div className="min-h-screen">
      <CustomCursor />
      <Navbar />

      {/* Hero */}
      <header className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
        <div
          className="absolute inset-0 hidden md:flex items-center justify-center z-0 opacity-10 pointer-events-none"
          aria-hidden="true"
        >
          <span className="font-headline text-[40vw] text-outline leading-none select-none">01</span>
        </div>

        <div className="relative z-10 container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-4"
          >
            <span className="font-label text-secondary text-sm tracking-[0.3em] uppercase">
              Digital Engineer & Architect
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-headline leading-[0.9] tracking-tighter flex flex-col items-center"
            style={{ fontSize: 'clamp(3.5rem, 15vw, 12rem)' }}
          >
            <span>TULIO ABRAHAM</span>
            <span className="text-primary">RAMIREZ</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-serif-italic italic text-3xl md:text-5xl mt-8 text-on-surface-variant max-w-2xl mx-auto"
          >
            "Building interfaces that think."
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-12 flex flex-col md:flex-row gap-6 justify-center items-center"
          >
            <a
              href="#projects"
              className="w-full md:w-auto px-8 py-4 bg-primary text-on-primary font-headline text-2xl tracking-wide hover:-translate-y-1 hover:-translate-x-1 transition-transform duration-200 shadow-[4px_4px_0px_#FF6B35]"
            >
              Ver proyectos
            </a>
            <a
              href="#contact"
              className="w-full md:w-auto px-8 py-4 border border-primary text-primary font-headline text-2xl tracking-wide hover:bg-primary/10 transition-all duration-200"
            >
              Contacto
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

      {/* About */}
      <section id="about" className="py-24 px-6 md:py-32 bg-surface/30 relative border-y border-outline-variant/10">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <span className="font-label text-primary text-xs uppercase tracking-[0.4em] block mb-12">
              // PROFILE_MANIFESTO
            </span>
            <h2 className="font-serif-italic italic text-4xl md:text-6xl leading-tight text-on-surface">
              "Design is not just what it looks like and feels like. Design is how it{' '}
              <span className="text-secondary">performs</span> under pressure."
            </h2>
            <div className="mt-12 h-[1px] w-full bg-outline-variant/30" aria-hidden="true" />
            <p className="mt-12 font-body text-lg text-on-surface-variant leading-relaxed max-w-xl">
              I bridge the gap between complex engineering and fluid user experiences. Specialized in
              high-performance web systems where every millisecond and pixel is deliberate.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-px bg-outline-variant/20 border border-outline-variant/20">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="bg-background p-8 aspect-square flex flex-col justify-between hover:bg-surface transition-colors"
              >
                <span className="font-headline text-6xl text-primary leading-none">{stat.val}</span>
                <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack */}
      <section id="stack" className="py-24 px-6 md:py-32">
        <div className="container mx-auto">
          <div className="flex items-center gap-6 mb-20">
            <h2 className="font-headline text-5xl md:text-8xl tracking-tight">TECH_STACK</h2>
            <div className="h-[1px] flex-grow bg-outline-variant/40" aria-hidden="true" />
          </div>

          <div className="bg-background">
            <div className="flex flex-wrap gap-[1px] bg-outline-variant/20 border border-outline-variant/20">
              {TECH_STACK.map((tech) => (
                <div key={tech.name} className={cn('tech-tile', tech.hot ? 'tech-tile-hot' : 'tech-tile-normal')}>
                  {tech.name}
                  {tech.hot && (
                    <sup className="text-secondary ml-1" aria-label="en crecimiento activo">
                      ↑
                    </sup>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 font-label text-[0.65rem] text-on-surface-variant/40 uppercase tracking-widest">
            <span className="text-secondary" aria-hidden="true">↑</span> en crecimiento activo
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="bg-surface/10">
        <div className="container mx-auto px-6 py-24 md:pt-32">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
            <h2 className="font-headline text-6xl md:text-9xl leading-[0.8] tracking-tighter">
              SELECTED
              <br />
              <span className="text-secondary">WORKS_</span>
            </h2>
            <span className="font-label text-[10px] uppercase tracking-[0.3em] text-outline mb-4">
              Click to investigate project architecture
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-outline-variant/30 border-y border-outline-variant/30">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6 md:py-32 bg-background dot-matrix">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2
                className="font-headline leading-[0.85] mb-12 uppercase"
                style={{ fontSize: 'clamp(2.5rem, 10vw, 8rem)' }}
              >
                CONSTRUIMOS
                <br />
                ALGO <span className="text-primary">JUNTOS</span>
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
                    Subject Name
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
                    Electronic Address
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
                    Transmission Data
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
                  INITIATE_HANDSHAKE
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-outline-variant/20 bg-background py-12 px-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="font-headline text-3xl">TAR_01</div>

          <div className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/50 text-center">
            © 2025 Tulio Abraham Ramirez | ALL_RIGHTS_RESERVED
          </div>

          <div className="flex gap-6">
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} aria-label={label} className="text-on-surface-variant hover:text-primary transition-colors">
                <Icon size={20} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Bottom Navigation (Mobile) */}
      <nav
        aria-label="Navegación inferior"
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
    </div>
  );
}
