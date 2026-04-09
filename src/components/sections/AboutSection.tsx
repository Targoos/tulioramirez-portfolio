import { useLanguage } from "@/i18n";
import { STAT_VALS } from "@/data/constants";

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-24 px-6 md:py-32 bg-surface/30 relative border-y border-outline-variant/10"
    >
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <span className="font-label text-primary text-xs uppercase tracking-[0.4em] block mb-12">
            {t.about.sectionLabel}
          </span>
          <h2
            id="about-heading"
            className="font-serif-italic italic text-4xl md:text-6xl leading-tight text-on-surface"
          >
            {t.about.quoteBefore}
            <span className="text-secondary">{t.about.quoteHighlight}</span>
            {t.about.quoteAfter}
          </h2>
          <div className="mt-12 h-[1px] w-full bg-outline-variant/30" aria-hidden="true" />
          <p className="mt-12 font-body text-lg text-on-surface-variant leading-relaxed max-w-xl">
            {t.about.paragraph}
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-px bg-outline-variant/20 border border-outline-variant/20">
          {STAT_VALS.map((val, i) => (
            <div
              key={val}
              className="bg-background p-6 md:p-8 flex flex-col justify-between h-full w-full md:aspect-square hover:bg-surface transition-colors"
            >
              <dd className="font-headline text-5xl md:text-6xl text-primary leading-none">{val}</dd>
              <dt className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                {t.about.stats[i]}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
