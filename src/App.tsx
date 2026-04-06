/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUpRight, 
  ArrowRight, 
  Mail, 
  Terminal, 
  Layers, 
  Home, 
  Menu, 
  X,
  Github,
  Linkedin,
  Twitter
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

// --- Types ---
interface Project {
  id: string;
  title: string;
  category: string;
  tags: string[];
  image: string;
  status?: string;
}

// --- Data ---
const PROJECTS: Project[] = [
  {
    id: '01',
    title: 'SaaS Dashboard',
    category: 'SaaS Engine',
    tags: ['Next.js', 'Recharts'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
    status: 'LIVE_NOW'
  },
  {
    id: '02',
    title: 'ColorKids',
    category: 'Education UX',
    tags: ['Animations', 'Mobile First'],
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1000',
    status: 'EDUCATION_UX'
  },
  {
    id: '03',
    title: 'AI Chat UI',
    category: 'AI Interface',
    tags: ['LLM Integration', 'Real-time'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000',
    status: 'AI_INTERFACE'
  },
  {
    id: '04',
    title: 'Etnia Barcelona',
    category: 'Luxury E-com',
    tags: ['Headless CMS', 'Performance'],
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=1000',
    status: 'LUXURY_ECOM'
  }
];

const TECH_STACK = [
  { name: 'React', hot: false },
  { name: 'Next.js', hot: false },
  { name: 'Vue / Nuxt', hot: false },
  { name: 'TypeScript', hot: false },
  { name: 'Tailwind CSS', hot: true },
  { name: 'Vercel AI SDK', hot: true },
  { name: 'LangChain.js', hot: true },
  { name: 'Supabase', hot: true },
  { name: 'React Native', hot: true },
  { name: 'Claude API', hot: true },
  { name: 'OpenAI API', hot: true },
  { name: 'Stitch UI', hot: true },
  { name: 'Node.js', hot: false },
  { name: 'Git · GitHub', hot: false },
  { name: 'Figma', hot: false },
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300 border-b border-outline-variant/20",
      isScrolled ? "bg-background/80 backdrop-blur-xl py-4" : "bg-transparent py-6"
    )}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="font-headline text-3xl tracking-tight text-on-surface">TAR</div>
        
        <div className="hidden md:flex gap-8 items-center">
          {['About', 'Stack', 'Projects', 'Contact'].map((item) => (
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
            className="md:hidden text-primary"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-background z-[100] flex flex-col items-center justify-center gap-8 p-10"
          >
            <button 
              className="absolute top-6 right-6 text-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>
            <nav className="flex flex-col items-center gap-6">
              {['About', 'Stack', 'Projects', 'Contact'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-headline text-5xl text-on-surface hover:text-primary transition-colors"
                >
                  {item}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ProjectCard = ({ project }: { project: Project }) => (
  <motion.article 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group relative aspect-square bg-surface overflow-hidden p-8 flex flex-col justify-between border border-outline-variant/10"
  >
    <div className="flex justify-between items-start z-10">
      <span className="font-headline text-4xl text-outline">{project.id}</span>
      <span className="px-3 py-1 bg-secondary text-on-primary font-label text-[10px] uppercase tracking-widest">
        {project.status}
      </span>
    </div>
    
    <div className="z-10">
      <h3 className="font-serif-italic italic text-5xl md:text-7xl group-hover:text-primary transition-colors duration-300">
        {project.title}
      </h3>
      <div className="flex gap-4 mt-6 opacity-60 group-hover:opacity-100 transition-opacity">
        {project.tags.map(tag => (
          <span key={tag} className="font-label text-xs uppercase tracking-widest border border-on-surface px-2">
            {tag}
          </span>
        ))}
      </div>
    </div>

    <div className="absolute inset-0 opacity-20 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 pointer-events-none">
      <img 
        src={project.image} 
        alt={project.title} 
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
    </div>

    <div className="absolute bottom-8 right-8 z-20 group-hover:translate-x-2 transition-transform">
      <ArrowUpRight className="text-primary" size={40} />
    </div>
  </motion.article>
);

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    setIsTouch(isTouchDevice);

    if (isTouchDevice) {
      document.body.style.cursor = 'auto';
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setPosition({ x: clientX, y: clientY });
      
      setTimeout(() => {
        setRingPosition({ x: clientX, y: clientY });
      }, 80);
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  if (isTouch) return null;

  return (
    <>
      <div 
        className="fixed pointer-events-none z-[9999] w-2 h-2 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{ left: position.x, top: position.y }}
      />
      <div 
        className="fixed pointer-events-none z-[9998] w-8 h-8 border border-primary rounded-full bg-transparent opacity-50 -translate-x-1/2 -translate-y-1/2 transition-[left,top] duration-150 ease-out"
        style={{ left: ringPosition.x, top: ringPosition.y }}
      />
    </>
  );
};

export default function App() {
  return (
    <div className="min-h-screen">
      <CustomCursor />
      <Navbar />

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
        <div className="absolute inset-0 hidden md:flex items-center justify-center z-0 opacity-10 pointer-events-none">
          <span className="font-headline text-[40vw] text-outline leading-none select-none">01</span>
        </div>
        
        <div className="relative z-10 container mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <span className="font-label text-secondary text-sm tracking-[0.3em] uppercase">Digital Engineer & Architect</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="font-headline leading-[0.9] tracking-tighter flex flex-col items-center" 
            style={{ fontSize: 'clamp(3.5rem, 15vw, 12rem)' }}
          >
            <span>TULIO ABRAHAM</span>
            <span className="text-primary">RAMIREZ</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="font-serif-italic italic text-3xl md:text-5xl mt-8 text-on-surface-variant max-w-2xl mx-auto"
          >
            "Building interfaces that think."
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 flex flex-col md:flex-row gap-6 justify-center items-center"
          >
            <a href="#projects" className="w-full md:w-auto group relative px-8 py-4 bg-primary text-on-primary font-headline text-2xl tracking-wide hover:-translate-y-1 hover:-translate-x-1 transition-transform duration-200 shadow-[4px_4px_0px_#FF6B35]">
              Ver proyectos
            </a>
            <a href="#contact" className="w-full md:w-auto px-8 py-4 border border-primary text-primary font-headline text-2xl tracking-wide hover:bg-primary/10 transition-all duration-200">
              Contacto
            </a>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-10 hidden lg:block">
          <div className="flex flex-col gap-2 font-label text-[10px] uppercase text-outline">
            <span>40.7128° N, 74.0060° W</span>
            <span>EST. 2019 / BUILD_01</span>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="py-24 px-6 md:py-32 bg-surface/30 relative border-y border-outline-variant/10">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <span className="font-label text-primary text-xs uppercase tracking-[0.4em] block mb-12">// PROFILE_MANIFESTO</span>
            <h2 className="font-serif-italic italic text-4xl md:text-6xl leading-tight text-on-surface">
              "Design is not just what it looks like and feels like. Design is how it <span className="text-secondary">performs</span> under pressure."
            </h2>
            <div className="mt-12 h-[1px] w-full bg-outline-variant/30" />
            <p className="mt-12 font-body text-lg text-on-surface-variant leading-relaxed max-w-xl">
              I bridge the gap between complex engineering and fluid user experiences. Specialized in high-performance web systems where every millisecond and pixel is deliberate.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-px bg-outline-variant/20 border border-outline-variant/20">
            {[
              { val: '05', label: 'Years Professional Experience' },
              { val: '04', label: 'Years in Real Product Dev' },
              { val: '03+', label: 'Major Frameworks' },
              { val: '∞', label: 'Intellectual Curiosity' }
            ].map((stat, i) => (
              <div key={i} className="bg-background p-8 aspect-square flex flex-col justify-between hover:bg-surface transition-colors">
                <span className="font-headline text-6xl text-primary leading-none">{stat.val}</span>
                <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack Section */}
      <section id="stack" className="py-24 px-6 md:py-32">
        <div className="container mx-auto">
          <div className="flex items-center gap-6 mb-20">
            <h2 className="font-headline text-5xl md:text-8xl tracking-tight">TECH_STACK</h2>
            <div className="h-[1px] flex-grow bg-outline-variant/40" />
          </div>
          
          <div className="flex flex-wrap gap-[1px] bg-outline-variant/20 border border-outline-variant/20">
            {TECH_STACK.map((tech) => (
              <div 
                key={tech.name} 
                className={cn(
                  "tech-tile",
                  tech.hot ? "tech-tile-hot" : "tech-tile-normal"
                )}
              >
                {tech.name} {tech.hot && <sup className="text-secondary ml-1">↑</sup>}
              </div>
            ))}
          </div>
          
          <div className="mt-6 font-label text-[0.65rem] text-on-surface-variant/40 uppercase tracking-widest">
            <span className="text-secondary">↑</span> en crecimiento activo
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="bg-surface/10">
        <div className="container mx-auto px-6 py-24 md:pt-32">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
            <h2 className="font-headline text-6xl md:text-9xl leading-[0.8] tracking-tighter">
              SELECTED<br/><span className="text-secondary">WORKS_</span>
            </h2>
            <span className="font-label text-[10px] uppercase tracking-[0.3em] text-outline mb-4">
              Click to investigate project architecture
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-outline-variant/30 border-y border-outline-variant/30">
          {PROJECTS.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 md:py-32 bg-background dot-matrix">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 className="font-headline leading-[0.85] mb-12 uppercase" style={{ fontSize: 'clamp(2.5rem, 10vw, 8rem)' }}>
                CONSTRUIMOS<br/>ALGO <span className="text-primary">JUNTOS</span>
              </h2>
              
              <div className="flex flex-col gap-6 max-w-md">
                <a href="#" className="group flex items-center justify-between p-6 border border-outline-variant/30 hover:bg-primary hover:text-on-primary transition-all duration-300">
                  <span className="font-label text-xl uppercase">WhatsApp</span>
                  <ArrowRight className="group-hover:rotate-[-45deg] transition-transform" />
                </a>
                <a href="mailto:tulioramirez0119@gmail.com" className="group flex flex-col md:flex-row md:items-center justify-between p-6 border border-outline-variant/30 hover:bg-secondary hover:text-on-primary transition-all duration-300 gap-2">
                  <span className="font-label text-xl uppercase">Email</span>
                  <span className="font-label text-sm lowercase opacity-60 group-hover:opacity-100">tulioramirez0119@gmail.com</span>
                </a>
              </div>
            </div>
            
            <div className="bg-surface/50 p-8 border border-outline-variant/30">
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                {[
                  { label: 'Subject Name', placeholder: 'HEDY LAMARR', type: 'text' },
                  { label: 'Electronic Address', placeholder: 'HL@PROJECT_ALPHA.COM', type: 'email' }
                ].map((field, i) => (
                  <div key={i} className="relative">
                    <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2">{field.label}</label>
                    <input 
                      type={field.type}
                      className="w-full bg-transparent border-0 border-b border-outline-variant py-4 px-0 focus:ring-0 focus:border-primary text-on-surface font-body placeholder:text-outline-variant/30"
                      placeholder={field.placeholder}
                    />
                  </div>
                ))}
                <div className="relative">
                  <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2">Transmission Data</label>
                  <textarea 
                    className="w-full bg-transparent border-0 border-b border-outline-variant py-4 px-0 focus:ring-0 focus:border-primary text-on-surface font-body placeholder:text-outline-variant/30 resize-none"
                    placeholder="DESCRIBE THE SCOPE..."
                    rows={4}
                  />
                </div>
                <button className="w-full py-6 bg-primary text-on-primary font-headline text-2xl tracking-widest hover:bg-secondary transition-colors duration-300">
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
            © 2024 Tulio Abraham Ramirez | ALL_RIGHTS_RESERVED
          </div>
          
          <div className="flex gap-6">
            {[
              { icon: Github, href: '#' },
              { icon: Linkedin, href: '#' },
              { icon: Twitter, href: '#' }
            ].map((social, i) => (
              <a key={i} href={social.href} className="text-on-surface-variant hover:text-primary transition-colors">
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Bottom Navigation (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-20 bg-background/90 backdrop-blur-xl border-t border-outline-variant/20">
        {[
          { icon: Home, label: 'HOME', href: '#' },
          { icon: Layers, label: 'WORKS', href: '#projects' },
          { icon: Terminal, label: 'STACK', href: '#stack' },
          { icon: Mail, label: 'MAIL', href: '#contact' }
        ].map((item, i) => (
          <a key={i} href={item.href} className="flex flex-col items-center justify-center p-4 text-on-surface-variant hover:text-primary transition-colors">
            <item.icon size={20} />
            <span className="font-label text-[8px] mt-1">{item.label}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}
