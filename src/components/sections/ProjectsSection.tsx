import { useLanguage } from "@/i18n/index.tsx";
import { PROJECTS } from "@/data/constants";
import { ProjectCard } from "@/components/ProjectCard";

export function ProjectsSection() {
  const { t } = useLanguage();

  return (
    <section id="projects" aria-labelledby="projects-heading" className="bg-surface/10">
      <div className="container mx-auto px-6 py-24 md:pt-32">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <h2 id="projects-heading" className="font-headline text-6xl md:text-9xl leading-[0.8] tracking-tighter">
            SELECTED
            <br />
            <span className="text-secondary">WORKS_</span>
          </h2>
          <span className="font-label text-[10px] uppercase tracking-[0.3em] text-outline mb-4">
            {t.projects.clickLabel}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-outline-variant/30 border-y border-outline-variant/30">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
