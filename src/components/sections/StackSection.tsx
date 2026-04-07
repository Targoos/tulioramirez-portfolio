import { useLanguage } from "@/i18n/index.tsx";
import { TECH_STACK } from "@/data/constants";
import { cn } from "@/lib/utils";

export function StackSection() {
  const { t } = useLanguage();

  return (
    <section id="stack" aria-labelledby="stack-heading" className="py-24 px-6 md:py-32">
      <div className="container mx-auto">
        <div className="flex items-center gap-6 mb-20">
          <h2 id="stack-heading" className="font-headline text-5xl md:text-8xl tracking-tight">TECH_STACK</h2>
          <div className="h-[1px] flex-grow bg-outline-variant/40" aria-hidden="true" />
        </div>

        <div className="bg-background">
          <div className="flex flex-wrap gap-[1px] bg-outline-variant/20 border border-outline-variant/20">
            {TECH_STACK.map((tech) => (
              <div
                key={tech.name}
                className={cn("tech-tile", tech.hot ? "tech-tile-hot" : "tech-tile-normal")}
              >
                {tech.name}
                {tech.hot && (
                  <sup className="text-secondary ml-1" aria-label={t.stack.activelyGrowing}>
                    ↑
                  </sup>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 font-label text-[0.65rem] text-on-surface-variant/40 uppercase tracking-widest">
          <span className="text-secondary" aria-hidden="true">
            ↑
          </span>{" "}
          {t.stack.activelyGrowing}
        </div>
      </div>
    </section>
  );
}
