'use client';

import { about, site } from '@/lib/content';
import type { L } from '@/lib/i18n';
import { useT } from '@/lib/store';
import { Body, Card, Container, Eyebrow, PillLink, SerifTitle } from '@/components/ui/primitives';
import { Reveal } from '@/components/ui/Reveal';
import { Halo, LineIcon, MaskedImage, Polaroid } from '@/components/decor/Decor';import { TulipCorner } from '@/components/decor/TulipCluster';
import SectionHero from '@/components/sections/SectionHero';
import FooterCTA from '@/components/layout/FooterCTA';

/** Reference layout: arch portrait hero → three values → quote card → story with photos. */
export default function AboutView() {
  const { t } = useT();
  const tt = (pair: [L, L]) => [t(pair[0]), t(pair[1])] as [string, string];

  return (
    <>
      <SectionHero
        eyebrow={t(about.eyebrow)}
        title={tt(about.title)}
        accent
        desc={t(about.desc)}
        cta={{ label: t(about.cta), href: '#journey' }}
        visual={
          <div className="relative mx-auto h-full w-full max-w-[460px]">
            <div className="animate-float absolute inset-x-[8%] bottom-[4%] top-0">
              <Halo className="inset-0 rounded-t-full rounded-b-[32px]" />
              <MaskedImage src={site.portrait.src} alt={t(site.portrait.alt)} priority objectPosition="60% 12%" className="absolute inset-[3%] rounded-t-full rounded-b-[28px] border-4 border-paper" />
            </div>
            <TulipCorner side="right" scale={0.55} className="-bottom-6 -right-16 z-20" gustDelay={1} />
          </div>
        }
      />

      <Container className="pb-10">
        <Reveal>
          <h2 className="mb-8 font-serif text-[clamp(2rem,3.4vw,2.6rem)] italic">{t(about.valuesTitle)}</h2>
        </Reveal>
        <div className="grid gap-y-10 sm:grid-cols-3 sm:divide-x sm:divide-line">
          {about.values.map((v, i) => (
            <Reveal key={v.icon} kind="bloom" delay={i * 0.15} className="flex flex-col items-center px-6 text-center">
              <span className="hover-wiggle animate-rise-bob flex h-16 w-16 items-center justify-center rounded-full border border-line bg-card text-rose shadow-[var(--shadow-soft)]" style={{ animationDelay: `${-i * 1.1}s` }}>
                <LineIcon name={v.icon as 'gem' | 'star' | 'heart'} size={28} />
              </span>
              <h3 className="mt-4 text-[15px] font-semibold text-ink">{t(v.title)}</h3>
              <p className="mt-1 max-w-[24ch] text-sm leading-relaxed text-muted">{t(v.caption)}</p>
            </Reveal>
          ))}
        </div>
      </Container>

      <Container className="py-10">
        <Reveal kind="tilt">
          <Card className="relative grid items-center gap-8 overflow-hidden p-8 sm:grid-cols-[1fr_auto] sm:p-12">
            <div>
              <span aria-hidden className="block font-serif text-7xl leading-none text-rose">&ldquo;</span>
              <p className="-mt-4 font-serif text-[clamp(2rem,4vw,3.2rem)] italic leading-[1.1] text-ink">
                {t(about.quote[0])}
                <br />
                <span className="text-shimmer">{t(about.quote[1])}</span>
              </p>
            </div>
            <div aria-hidden className="relative hidden h-[220px] w-[200px] justify-self-center sm:block">
              <TulipCorner side="left" scale={0.4} className="bottom-0 left-0" gustDelay={0.6} />
            </div>
          </Card>
        </Reveal>
      </Container>

      <Container id="journey" className="grid scroll-mt-28 items-center gap-12 py-16 lg:grid-cols-12">
        <Reveal kind="left" className="flex flex-col gap-4 lg:col-span-7">
          <Eyebrow>{t(about.journeyEyebrow)}</Eyebrow>
          <SerifTitle as="h2" size="md" accent lines={tt(about.journeyTitle)} />
          <Body className="max-w-[60ch]">{t(about.journey)}</Body>
          <div className="mt-2 flex flex-wrap gap-3">
            <PillLink href={site.cv}>{t(about.cv)}</PillLink>
            <PillLink href={site.linkedin} variant="outline">
              LinkedIn
            </PillLink>
          </div>
        </Reveal>
        <Reveal kind="right" delay={0.1} className="relative h-[360px] lg:col-span-5">
          <Polaroid src={about.photos[1].src} alt={t(about.photos[1].alt)} rotate={-6} drift={0} caption="Arunikaa" className="absolute left-0 top-0" imgClassName="h-[230px] w-[230px]" />
          <Polaroid src={about.photos[0].src} alt={t(about.photos[0].alt)} rotate={6} drift={3.5} caption="UNPAD · 2024" className="absolute bottom-0 right-0 z-10" imgClassName="h-[200px] w-[170px]" />
        </Reveal>
      </Container>

      <FooterCTA />
    </>
  );
}
