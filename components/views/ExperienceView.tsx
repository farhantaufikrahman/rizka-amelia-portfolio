'use client';

import Link from 'next/link';
import { experiencePage, experiences } from '@/lib/content';
import { ui } from '@/lib/i18n';
import { useT } from '@/lib/store';
import { Body, Container, cx } from '@/components/ui/primitives';
import { Reveal } from '@/components/ui/Reveal';
import { Polaroid } from '@/components/decor/Decor';
import { TulipCorner } from '@/components/decor/TulipCluster';
import SectionHero from '@/components/sections/SectionHero';
import FooterCTA from '@/components/layout/FooterCTA';

const COLLAGE = [
  { i: 0, rot: 4, cls: 'left-[42%] top-0 z-[1]', img: 'h-[150px] w-[200px] sm:h-[190px] sm:w-[260px]' },
  { i: 1, rot: -5, cls: 'left-[10%] top-[8%] z-[2]', img: 'h-[110px] w-[150px] sm:h-[140px] sm:w-[190px]' },
  { i: 2, rot: -3, cls: 'left-[2%] top-[44%] z-[3]', img: 'h-[170px] w-[130px] sm:h-[220px] sm:w-[170px]' },
  { i: 3, rot: 3, cls: 'left-[36%] top-[46%] z-[4]', img: 'h-[170px] w-[130px] sm:h-[220px] sm:w-[170px]' },
];

/** A tulip bud marker for each stop along the path. */
function Bud() {
  return (
    <svg aria-hidden viewBox="0 0 40 52" className="animate-sway h-12 w-10">
      <path d="M20 52 V30" stroke="#6E9B5A" strokeWidth="2.5" />
      <path d="M20 46 C10 42 8 34 10 28 C14 36 18 40 20 42" fill="#9CC285" />
      <path d="M10 6 C12 18 16 24 20 28 C24 24 28 18 30 6 C29 22 26 30 20 32 C14 30 11 22 10 6 Z" fill="#F3B3BE" />
      <path d="M20 2 C16 10 16 20 20 28 C24 20 24 10 20 2 Z" fill="#FCE0E4" />
    </svg>
  );
}

/** Concept: a garden path — each role is a stop along a winding trail marked by a tulip bud. */
export default function ExperienceView() {
  const { t } = useT();

  return (
    <>
      <SectionHero
        reverse
        eyebrow={t(experiencePage.eyebrow)}
        title={[t(experiencePage.title[0]), t(experiencePage.title[1])]}
        desc={t(experiencePage.desc)}
        cta={{ label: t(experiencePage.cta), href: '#path' }}
        visualClassName="h-[420px] sm:h-[540px]"
        visual={
          <div className="relative h-full">
            {COLLAGE.map((c) => {
              const e = experiences[c.i];
              return <Polaroid key={e.slug} src={e.cover.src} alt={t(e.cover.alt)} rotate={c.rot} className={cx('absolute', c.cls)} imgClassName={c.img} />;
            })}
            <TulipCorner side="left" scale={0.42} className="-bottom-10 left-[58%] z-10" />
          </div>
        }
      />

      <Container id="path" className="relative scroll-mt-28 py-10">
        {/* the winding trail */}
        <svg aria-hidden viewBox="0 0 200 1000" preserveAspectRatio="none" className="absolute left-1/2 top-0 hidden h-full w-40 -translate-x-1/2 lg:block">
          <path d="M100 0 C20 120 180 240 100 360 S20 600 100 720 S180 900 100 1000" stroke="var(--color-rose)" strokeOpacity="0.55" strokeWidth="3" strokeDasharray="2 14" strokeLinecap="round" fill="none" />
        </svg>
        {experiences.map((e, i) => {
          const flip = i % 2 === 1;
          return (
            <Reveal key={e.slug} className="relative mb-16 grid items-center gap-8 lg:grid-cols-2 lg:gap-24">
              <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
                <Bud />
              </div>
              <div className={cx('flex justify-center', flip && 'lg:order-2')}>
                <Link href={`/experience/${e.slug}`} aria-label={t(e.role)}>
                  <Polaroid src={e.cover.src} alt={t(e.cover.alt)} rotate={flip ? -4 : 4} imgClassName="h-[220px] w-[300px] sm:h-[250px] sm:w-[360px]" />
                </Link>
              </div>
              <div className={cx('flex max-w-[440px] flex-col gap-1.5', flip ? 'lg:order-1 lg:justify-self-end lg:text-right' : '')}>
                <p className="font-serif text-lg italic text-rose">0{i + 1}</p>
                <Link href={`/experience/${e.slug}`} className="font-serif text-3xl italic hover:text-rose">
                  {t(e.role)}
                </Link>
                <p className="text-sm text-muted">{t(e.org)}</p>
                <p className="text-sm text-muted">{t(e.period)}</p>
                <Body className={cx('mt-1.5', flip && 'lg:ml-auto')}>{t(e.summary)}</Body>
                <Link href={`/experience/${e.slug}`} className="mt-2 text-sm font-medium text-ink underline decoration-rose underline-offset-4">
                  {t(ui.common.viewDetails)} →
                </Link>
              </div>
            </Reveal>
          );
        })}
      </Container>

      <FooterCTA />
    </>
  );
}
