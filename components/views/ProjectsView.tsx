'use client';

import Image from 'next/image';
import Link from 'next/link';
import { projects, projectsPage as pp } from '@/lib/content';
import { ui } from '@/lib/i18n';
import { useT } from '@/lib/store';
import { Card, Container, Eyebrow, SerifTitle } from '@/components/ui/primitives';
import { Reveal } from '@/components/ui/Reveal';
import { Polaroid } from '@/components/decor/Decor';
import { TulipCorner } from '@/components/decor/TulipCluster';
import SectionHero from '@/components/sections/SectionHero';
import FooterCTA from '@/components/layout/FooterCTA';

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
            <Polaroid src={thesis.gallery[0].src} alt={t(thesis.gallery[0].alt)} rotate={3} className="absolute bottom-[4%] right-[14%] z-[3]" imgClassName="h-[120px] w-[160px] sm:h-[150px] sm:w-[200px]" />
            <TulipCorner side="right" scale={0.42} className="-bottom-12 right-0 z-10" />
          </div>
        }
      />
      <Container id="list" className="grid scroll-mt-28 gap-6 pb-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.1}>
            <Link href={`/projects/${p.slug}`} className="group block">
              <Card className="flex h-full flex-col gap-4 p-4">
                <div className="relative h-[280px] overflow-hidden rounded-2xl">
                  <Image src={p.cover.src} alt={t(p.cover.alt)} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex flex-col gap-2 px-2 pb-2">
                  <Eyebrow>{t(p.kicker)}</Eyebrow>
                  <SerifTitle as="h2" size="md" lines={[t(p.title[0]), t(p.title[1])]} accent />
                  <p className="text-[15px] leading-relaxed text-muted">{t(p.summary)}</p>
                  <span className="mt-1 text-sm font-medium underline decoration-rose underline-offset-4">{t(ui.common.viewDetails)} →</span>
                </div>
              </Card>
            </Link>
          </Reveal>
        ))}
      </Container>
      <FooterCTA />
    </>
  );
}
