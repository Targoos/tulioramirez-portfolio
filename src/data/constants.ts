import type { Project, TechItem } from '@/types';

export const STAT_VALS = ['05', '04', '03+', '∞'] as const;

export const NAV_SECTIONS = ['about', 'stack', 'projects', 'contact'] as const;

export const PROJECTS: Project[] = [
  {
    id: '01',
    title: 'SaaS Dashboard',
    category: 'SaaS Engine',
    tags: ['Next.js', 'Recharts'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
    status: 'LIVE_NOW',
  },
  {
    id: '02',
    title: 'ColorKids',
    category: 'Education UX',
    tags: ['Animations', 'Mobile First'],
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1000',
    status: 'EDUCATION_UX',
  },
  {
    id: '03',
    title: 'AI Chat UI',
    category: 'AI Interface',
    tags: ['LLM Integration', 'Real-time'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000',
    status: 'AI_INTERFACE',
  },
  {
    id: '04',
    title: 'Etnia Barcelona',
    category: 'Luxury E-com',
    tags: ['Headless CMS', 'Performance'],
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=1000',
    status: 'LUXURY_ECOM',
  },
];

export const TECH_STACK: TechItem[] = [
  { name: 'React.js', hot: true },   // #1 frontend en demanda
  { name: 'Next.js', hot: true },    // SSR/SSG, muy pedido
  { name: 'Vue.js', hot: true },     // fuerte en EU/LATAM
  { name: 'Nuxt', hot: true },       // meta-framework Vue
  { name: 'JavaScript', hot: false },
  { name: 'TypeScript', hot: true }, // casi obligatorio hoy
  { name: 'Tailwind CSS', hot: true }, // muy trendy, alta demanda
  { name: 'SCSS / Sass', hot: false },
  { name: 'Bootstrap', hot: false },
  { name: 'Styled Components', hot: false },
  { name: 'Redux', hot: false },
  { name: 'Vuex', hot: false },
  { name: 'Pinia', hot: true },      // moderno, reemplaza Vuex
  { name: 'Zustand', hot: true },    // moderno, reemplaza Redux
  { name: 'Symfony (PHP)', hot: false },
  { name: 'Node.js', hot: true },    // backend JS estándar
  { name: 'Express', hot: false },
  { name: 'REST APIs', hot: false },
  { name: 'Git', hot: false },
  { name: 'GitLab CI / GitHub Actions', hot: true }, // CI/CD diferenciador
  { name: 'Docker', hot: true },     // DevOps must-have
  { name: 'Unit Testing', hot: false },
  { name: 'Integration Testing', hot: false },
  { name: 'Figma', hot: false },
  { name: 'Jira', hot: false },
  { name: 'Photoshop', hot: false },
  { name: 'Cursor', hot: true },     // AI dev tools = diferenciación
  { name: 'Claude', hot: true },
  { name: 'ChatGPT / Gemini', hot: true },
];
