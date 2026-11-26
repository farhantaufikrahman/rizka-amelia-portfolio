'use client';

import Image from 'next/image';
import Link from 'next/link';
import { projects, projectsPage as pp } from '@/lib/content';
import { ui } from '@/lib/i18n';
import { useT } from '@/lib/store';
import { Container, Eyebrow, SerifTitle } from '@/components/ui/primitives';
import { Reveal } from '@/components/ui/Reveal';
import { Polaroid } from '@/components/decor/Decor';
import { LabGlass, Washi } from '@/components/decor/Illustrations';
import { TulipCorner } from '@/components/decor/TulipCluster';
import SectionHero from '@/components/sections/SectionHero';
import FooterCTA from '@/components/layout/FooterCTA';

/** Concept: two very different projects — a lab notebook and a magazine cover. */
export default function ProjectsView() {
  const { t } = useT();
  const [thesis, momies] = projects;
  return (
    <>
      <SectionHero
        eyebrow={t(pp.eyebrow)}
        title={[t(pp.title[0]), t(pp.title[1])]}
        desc={t(pp.desc)}
        cta={{ label: t(pp.cta), href: '#list' }}
        visualClassName="h-[420px] sm:h-[540px]"
        visual={
          <div className="relative h-full">
            <Polaroid src={thesis.gallery[2].src} alt={t(thesis.gallery[2].alt)} rotate={4} caption="Thesis · 2024" className="absolute right-[6%] top-0" imgClassName="h-[160px] w-[230px] sm:h-[210px] sm:w-[300px]" />
            <Polaroid src={momies.gallery[2].src} alt={t(momies.gallery[2].alt)} rotate={-5} caption="Momies Bakery" className="absolute left-[6%] top-[30%] z-[2]" imgClassName="h-[200px] w-[150px] sm:h-[250px] sm:w-[190px]" />
            <LabGlass className="animate-bob absolute bottom-[2%] right-[10%] z-[3] w-36" />
            <TulipCorner side="right" scale={0.4} className="-bottom-12 right-0 z-10" />
          </div>
        }
      />
      <Container id="list" className="grid scroll-mt-28 items-start gap-10 pb-6 md:grid-cols-2">
        {/* Lab notebook */}
        <Reveal>
          <Link href={`/projects/${thesis.slug}`} className="group block">
            <div className="paper-grid relative rounded-[20px] p-6 text-[#5B2C3A] shadow-[var(--shadow-photo)] transition-transform duration-500 group-hover:-translate-y-1.5 sm:p-8">
              <Washi className="-top-3 left-8 -rotate-6" color="rgba(168,185,160,0.65)" />
              <div className="flex items-start justify-between gap-4">
                <Eyebrow>{t(thesis.kicker)}</Eyebrow>
                <LabGlass className="w-20 flex-none" />
              </div>
              <SerifTitle as="h2" size="md" lines={[t(thesis.title[0]), t(thesis.title[1])]} accent className="mt-2" />
              <p className="mt-3 text-[15px] leading-relaxed text-[#7D5F66]">{t(thesis.summary)}</p>
              <div className="relative mt-6 h-[240px] overflow-hidden rounded-xl">
                <Image src={thesis.cover.src} alt={t(thesis.cover.alt)} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <span className="mt-4 inline-block text-sm font-medium underline decoration-[#E48A9A] underline-offset-4">{t(ui.common.viewDetails)} →</span>
            </div>
          </Link>
        </Reveal>
        {/* Magazine cover */}
        <Reveal delay={0.12} className="md:mt-16">
          <Link href={`/projects/${momies.slug}`} className="group relative block aspect-[3/4] overflow-hidden rounded-[20px] shadow-[var(--shadow-photo)]">
            <Image src={momies.gallery[2].src} alt={t(momies.gallery[2].alt)} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(91,44,58,0.55),transparent_30%,transparent_60%,rgba(91,44,58,0.75))]" />
            <p className="absolute left-6 right-6 top-5 font-serif text-[clamp(2.6rem,6vw,4.2rem)] italic leading-none text-white">Momies</p>
            <p className="absolute right-6 top-[5.2rem] text-[10px] font-semibold uppercase tracking-[0.3em] text-white/90 sm:top-24">Bakery · Lookbook</p>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <p className="text-[11px] uppercase tracking-[0.25em] opacity-90">{t(momies.kicker)}</p>
              <p className="mt-2 font-serif text-xl italic leading-snug">{t(momies.summary)}</p>
              <span className="mt-3 inline-block text-sm underline underline-offset-4">{t(ui.common.viewDetails)} →</span>
            </div>
          </Link>
        </Reveal>
      </Container>
      <FooterCTA />
    </>
  );
}
