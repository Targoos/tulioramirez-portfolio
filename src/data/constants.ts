import type { Project, TechItem } from '@/types';

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
