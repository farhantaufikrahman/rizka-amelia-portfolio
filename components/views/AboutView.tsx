'use client';

import { about, site } from '@/lib/content';
import { useT } from '@/lib/store';
import { Body, Card, Container, Eyebrow, PillLink, SerifTitle } from '@/components/ui/primitives';
import { Reveal } from '@/components/ui/Reveal';
import { Halo, LineIcon, MaskedImage, Polaroid } from '@/components/decor/Decor';
import { TulipCorner } from '@/components/decor/TulipCluster';
import SectionHero from '@/components/sections/SectionHero';
import FooterCTA from '@/components/layout/FooterCTA';

export default function AboutView() {
  const { t } = useT();
  const tt = (pair: typeof about.title) => [t(pair[0]), t(pair[1])] as [string, string];

  return (
    <>
      <SectionHero
        eyebrow={t(about.eyebrow)}
        title={tt(about.title)}
        desc={t(about.desc)}
        cta={{ label: t(about.cta), href: '#journey' }}
        visual={
          <div className="relative mx-auto h-full w-full max-w-[480px]">
            <Halo className="left-[2%] top-[4%] h-[94%] w-[92%] -rotate-[5deg] rounded-[50%_50%_46%_54%/42%_42%_58%_58%]" />
            <MaskedImage src={site.portrait.src} alt={t(site.portrait.alt)} priority className="absolute left-[6%] top-0 h-[94%] w-[88%] rounded-[220px_220px_48%_52%/220px_220px_40%_40%]" />
            <TulipCorner side="right" scale={0.6} className="-bottom-8 -right-10 z-20" />
          </div>
        }
      />

      <Container className="pb-6">
        <div className="mx-auto grid max-w-[860px] gap-5 sm:grid-cols-3">
          {about.values.map((v, i) => (
            <Reveal key={v.icon} delay={i * 0.1}>
              <Card className="flex flex-col items-center gap-2 px-5 py-7 text-center">
                <LineIcon name={v.icon as 'gem' | 'star' | 'heart'} size={32} className="text-ink" />
                <p className="text-[15px] font-semibold">{t(v.title)}</p>
                <p className="text-[13px] text-muted">{t(v.caption)}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>

      <Container id="journey" className="grid scroll-mt-28 items-center gap-12 py-20 lg:grid-cols-12">
        <Reveal className="flex flex-col gap-4 lg:col-span-6">
          <Eyebrow>{t(about.journeyEyebrow)}</Eyebrow>
          <SerifTitle as="h2" size="md" accent lines={tt(about.journeyTitle)} />
          <Body className="max-w-[52ch]">{t(about.journey)}</Body>
          <div className="mt-2 flex flex-wrap gap-3">
            <PillLink href={site.cv}>{t(about.cv)}</PillLink>
            <PillLink href={site.linkedin} variant="outline">
              LinkedIn
            </PillLink>
          </div>
        </Reveal>
        <div className="relative h-[420px] lg:col-span-6">
          <Polaroid src={about.photos[0].src} alt={t(about.photos[0].alt)} rotate={4} className="absolute left-[22%] top-[4%]" imgClassName="h-[230px] w-[280px] sm:h-[260px] sm:w-[340px]" />
          <Polaroid src={about.photos[1].src} alt={t(about.photos[1].alt)} rotate={-6} className="absolute bottom-0 left-0 z-10" imgClassName="h-[140px] w-[180px] sm:h-[150px] sm:w-[200px]" />
        </div>
      </Container>

      <FooterCTA />
    </>
  );
}
