import { memo } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = memo(function ProjectCard({
  project,
}: ProjectCardProps) {
  const cardContent = (
    <>
      <div className="flex justify-between items-start z-10">
        <span className="font-headline text-4xl text-outline">
          {project.id}
        </span>
        {project.status && (
          <span className="px-3 py-1 bg-secondary text-on-primary font-label text-[10px] uppercase tracking-widest">
            {project.status}
          </span>
        )}
      </div>

      <div className="z-10">
        <h3 className="font-serif-italic italic text-5xl md:text-7xl group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>
        <div className="flex gap-4 mt-6 opacity-60 group-hover:opacity-100 transition-opacity">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-label text-xs uppercase tracking-widest border border-on-surface px-2"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div
        className="absolute inset-0 opacity-20 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 pointer-events-none"
        aria-hidden="true"
      >
        <img
          src={project.image}
          alt=""
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      <div
        className="absolute bottom-8 right-8 z-20 group-hover:translate-x-2 transition-transform"
        aria-hidden="true"
      >
        <ArrowUpRight className="text-primary" size={40} />
      </div>
    </>
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative aspect-square bg-surface overflow-hidden p-8 flex flex-col justify-between border border-outline-variant/10"
    >
      {project.link ? (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-30"
          aria-label={`View ${project.title} project`}
        >
          {cardContent}
        </a>
      ) : (
        cardContent
      )}
    </motion.article>
  );
});
