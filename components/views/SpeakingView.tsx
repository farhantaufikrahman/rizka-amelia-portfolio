'use client';

import { speakingPage as s } from '@/lib/content';
import { useT } from '@/lib/store';
import { Card, Container } from '@/components/ui/primitives';
import { Reveal } from '@/components/ui/Reveal';
import { Halo, MaskedImage } from '@/components/decor/Decor';
import { TulipCorner } from '@/components/decor/TulipCluster';
import { PhotoGrid } from '@/components/sections/Gallery';
import SectionHero from '@/components/sections/SectionHero';
import FooterCTA from '@/components/layout/FooterCTA';

export default function SpeakingView() {
  const { t } = useT();
  return (
    <>
      <SectionHero
        eyebrow={t(s.eyebrow)}
        title={[t(s.title[0]), t(s.title[1])]}
        desc={t(s.desc)}
        cta={{ label: t(s.cta), href: '#events' }}
        visual={
          <div className="relative mx-auto h-full w-full max-w-[560px]">
            <Halo className="left-0 top-[6%] h-[88%] w-[96%] -rotate-[4deg] rounded-[46%_54%_50%_50%/40%_44%_56%_60%]" />
            <MaskedImage src={s.hero.src} alt={t(s.hero.alt)} priority objectPosition="60% 40%" className="absolute left-[4%] top-0 h-[92%] w-[90%] rounded-[46%_54%_50%_50%/40%_44%_56%_60%]" />
            <TulipCorner side="left" scale={0.5} className="-bottom-12 -left-12 z-20" />
          </div>
        }
      />
      <Container id="events" className="scroll-mt-28 pb-6">
        <Reveal>
          <h2 className="mb-6 font-serif text-4xl italic">{t(s.highlightsTitle)}</h2>
        </Reveal>
        <PhotoGrid photos={s.highlights} columns="grid-cols-2 md:grid-cols-4" itemClassName="h-[180px] md:h-[240px]" />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {s.events.map((e, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <Card className="flex h-full flex-col gap-2">
                <p className="text-[13px] text-muted">{t(e.when)}</p>
                <h3 className="text-base font-semibold">{t(e.title)}</h3>
                <p className="text-[13px] text-muted">{t(e.host)}</p>
                <p className="text-[15px] leading-relaxed text-muted">{t(e.body)}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
      <FooterCTA />
    </>
  );
}
