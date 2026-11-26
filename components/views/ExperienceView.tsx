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
  { src: '/images/work/ilove-emas-1.jpg', rot: 4, cls: 'left-[46%] top-0 z-[1]', img: 'h-[150px] w-[200px] sm:h-[190px] sm:w-[260px]' },
  { src: '/images/internship/agronesia-1.jpg', rot: -5, cls: 'left-[18%] top-[10%] z-[2]', img: 'h-[110px] w-[150px] sm:h-[140px] sm:w-[190px]' },
  { src: '/images/makeup/mua-5.jpg', rot: -3, cls: 'left-[4%] top-[44%] z-[3]', img: 'h-[170px] w-[130px] sm:h-[220px] sm:w-[170px]' },
  { src: '/images/work/ilove-emas-2.jpg', rot: 3, cls: 'left-[34%] top-[46%] z-[4]', img: 'h-[120px] w-[170px] sm:h-[160px] sm:w-[220px]' },
];

export default function ExperienceView() {
  const { t } = useT();

  return (
    <>
      <SectionHero
        eyebrow={t(experiencePage.eyebrow)}
        title={[t(experiencePage.title[0]), t(experiencePage.title[1])]}
        desc={t(experiencePage.desc)}
        cta={{ label: t(experiencePage.cta), href: '#roles' }}
        visualClassName="h-[420px] sm:h-[540px]"
        visual={
          <div className="relative h-full">
            {COLLAGE.map((c, i) => (
              <Polaroid key={c.src} src={c.src} alt={t(experiences[Math.min(i, experiences.length - 1)].role)} rotate={c.rot} className={cx('absolute', c.cls)} imgClassName={c.img} />
            ))}
            <TulipCorner side="right" scale={0.45} className="-bottom-10 right-0 z-10" />
          </div>
        }
      />

      <Container id="roles" className="scroll-mt-28 py-10">
        {experiences.map((e, i) => {
          const flip = i % 2 === 1;
          return (
            <Reveal key={e.slug} className="mb-14 grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
              <div className={cx('flex justify-center lg:col-span-5', flip && 'lg:order-2')}>
                <Link href={`/experience/${e.slug}`} aria-label={t(e.role)}>
                  <Polaroid src={e.cover.src} alt={t(e.cover.alt)} rotate={flip ? -4 : 4} imgClassName="h-[220px] w-[300px] sm:h-[250px] sm:w-[360px]" />
                </Link>
              </div>
              <div className={cx('flex max-w-[480px] flex-col gap-1.5 lg:col-span-7', flip && 'lg:order-1 lg:justify-self-end')}>
                <Link href={`/experience/${e.slug}`} className="text-lg font-semibold hover:text-rose">
                  {t(e.role)}
                </Link>
                <p className="text-sm text-muted">{t(e.org)}</p>
                <p className="text-sm text-muted">{t(e.period)}</p>
                <Body className="mt-1.5">{t(e.summary)}</Body>
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
