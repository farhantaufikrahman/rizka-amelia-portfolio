'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { projects, projectsPage as pp } from '@/lib/content';
import { useT } from '@/lib/store';
import { ArrowCircle, Container, PillLink } from '@/components/ui/primitives';
import { Reveal } from '@/components/ui/Reveal';
import { Polaroid } from '@/components/decor/Decor';
import { LabGlass } from '@/components/decor/Illustrations';
import { TulipCorner } from '@/components/decor/TulipCluster';
import SectionHero from '@/components/sections/SectionHero';
import FooterCTA from '@/components/layout/FooterCTA';

const ease = [0.22, 0.61, 0.36, 1] as const;

/** Reference layout: project cards (cover, title, kicker, arrow) → plum case-study banner. */
export default function ProjectsView() {
  const { t } = useT();
  const thesis = projects.find((p) => p.slug === 'sop-hedonic-testing')!;
  // Professional projects first; creative ones last, with a label.
  const cards = [...projects]
    .sort((a, b) => (a.category === b.category ? 0 : a.category === 'professional' ? -1 : 1))
    .map((p) => ({ p, img: p.cover }));
  return (
    <>
      <SectionHero
        eyebrow={t(pp.eyebrow)}
        title={[t(pp.title[0]), t(pp.title[1])]}
        accent
        desc={t(pp.desc)}
        cta={{ label: t(pp.cta), href: '#list' }}
        visualClassName="h-[420px] sm:h-[540px]"
        visual={
          <div className="relative h-full">
            <Polaroid src={thesis.steps![1].photos[0].src} alt={t(thesis.steps![1].photos[0].alt)} rotate={-5} drift={0} caption={t({ en: 'SOP draft', id: 'Draf SOP' })} className="absolute left-[6%] top-[4%] z-[2]" imgClassName="h-[230px] w-[170px] sm:h-[290px] sm:w-[220px]" />
            <Polaroid src={thesis.steps![0].photos[1].src} alt={t(thesis.steps![0].photos[1].alt)} rotate={5} drift={2.2} caption={t({ en: 'Thesis · 2024', id: 'Skripsi · 2024' })} className="absolute right-[6%] top-[22%]" imgClassName="h-[190px] w-[160px] sm:h-[240px] sm:w-[200px]" />
            <LabGlass className="animate-bob absolute bottom-[2%] right-[34%] z-[3] w-28" />
            <TulipCorner side="right" scale={0.3} className="-bottom-6 right-0 z-10" gustDelay={1.3} />
          </div>
        }
      />
      <Container id="list" className="scroll-mt-28 pb-6">
        <div className="grid gap-6 sm:grid-cols-2">
          {cards.map(({ p, img }, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 60, rotateY: i ? -20 : 20 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1, ease, delay: i * 0.12 }}
              style={{ transformPerspective: 1000 }}
            >
              <Link href={`/projects/${p.slug}`} className="group block rounded-[24px] border border-white/70 bg-card p-3 shadow-[var(--shadow-soft)] backdrop-blur-md transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-photo)] dark:border-white/10">
                <span className="relative block h-[260px] overflow-hidden rounded-[18px] sm:h-[320px]">
                  <span className="animate-ken-burns absolute inset-0 block" style={{ animationDelay: `${-i * 6}s` }}>
                    <Image src={img.src} alt={t(img.alt)} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" style={img.pos ? { objectPosition: img.pos } : undefined} />
                  </span>
                </span>
                <span className="flex items-center gap-4 px-2 pb-2 pt-4">
                  <span className="flex-1">
                    <span className="block font-serif text-[26px] italic leading-tight text-ink transition-colors group-hover:text-rose">
                      {t(p.title[0])} {t(p.title[1])}
                    </span>
                    <span className="mt-1 flex flex-wrap items-center gap-2 text-[13px] text-muted">
                      {p.category === 'creative' && (
                        <span className="rounded-full border border-rose/30 bg-rose/10 px-2 py-0.5 text-[11px] font-medium text-ink">{t(pp.creativeLabel)}</span>
                      )}
                      {t(p.kicker)}
                    </span>
                  </span>
                  <ArrowCircle />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* case study banner, as in the reference */}
        <Reveal kind="tilt" className="mt-10">
          <div className="relative grid items-center gap-6 overflow-hidden rounded-[26px] bg-[linear-gradient(120deg,#6E3446,#5B2C3A_55%,#7A3D50)] p-8 text-[#FBEFED] shadow-[var(--shadow-photo)] sm:grid-cols-[1fr_auto] sm:p-10">
            <span aria-hidden className="animate-light-sweep absolute -inset-y-10 left-0 w-1/4 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)]" />
            <div className="relative">
              <p className="font-serif text-sm italic text-[#F3B3BE]">{t(pp.caseKicker)}</p>
              <p className="mt-2 font-serif text-[clamp(1.8rem,3.4vw,2.6rem)] italic leading-[1.1]">
                {t(thesis.title[0])}
                <br />
                {t(thesis.title[1])}
              </p>
              <PillLink href={`/projects/${thesis.slug}`} className="mt-5 bg-[#FBEFED] text-[#5B2C3A]">
                {t(pp.caseCta)}
              </PillLink>
            </div>
            <Polaroid src={thesis.steps![3].photos[1].src} alt={t(thesis.steps![3].photos[1].alt)} rotate={6} drift={1} className="relative hidden justify-self-end sm:block" imgClassName="h-[180px] w-[150px]" />
          </div>
        </Reveal>
      </Container>
      <FooterCTA />
    </>
  );
}
