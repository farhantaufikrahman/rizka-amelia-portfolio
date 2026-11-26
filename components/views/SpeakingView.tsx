'use client';

import { speakingPage as s } from '@/lib/content';
import { useT } from '@/lib/store';
import { Card, Container } from '@/components/ui/primitives';
import { Reveal } from '@/components/ui/Reveal';
import { Halo, LineIcon, MaskedImage } from '@/components/decor/Decor';
import { Spotlight } from '@/components/decor/Illustrations';
import { TulipCorner } from '@/components/decor/TulipCluster';
import { PhotoGrid } from '@/components/sections/Gallery';
import SectionHero from '@/components/sections/SectionHero';
import FooterCTA from '@/components/layout/FooterCTA';

/** Reference layout: speaker portrait in a spotlit circle → talks → event highlights. */
export default function SpeakingView() {
  const { t } = useT();
  return (
    <>
      <SectionHero
        eyebrow={t(s.eyebrow)}
        title={[t(s.title[0]), t(s.title[1])]}
        accent
        desc={t(s.desc)}
        cta={{ label: t(s.cta), href: '#events' }}
        visualClassName="h-[460px] sm:h-[580px]"
        visual={
          <div className="relative mx-auto h-full w-full max-w-[520px]">
            <Spotlight className="animate-breathe -top-10 left-[8%] h-[110%] w-[84%]" />
            <div className="animate-float absolute left-[10%] top-[4%] h-[86%] w-[76%]">
              <Halo className="inset-0 rounded-t-full rounded-b-[40px]" />
              {/* cropped on the speaker, bottom-left of the original stage photo */}
              <MaskedImage src={s.hero.src} alt={t(s.hero.alt)} priority objectPosition={s.hero.pos} className="absolute inset-[3%] rounded-t-full rounded-b-[36px] border-4 border-paper" />
            </div>
            <TulipCorner side="left" scale={0.45} className="-bottom-8 -left-8 z-20" gustDelay={0.2} />
          </div>
        }
      />
      <Container id="events" className="scroll-mt-28 pb-6">
        <div className="grid gap-6 md:grid-cols-2">
          {s.events.map((e, i) => (
            <Reveal key={i} kind="tilt" delay={i * 0.15}>
              <Card className="group relative h-full overflow-hidden transition-transform duration-500 hover:-translate-y-1">
                <span aria-hidden className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-rose/10 transition-transform duration-700 group-hover:scale-150" />
                <div className="flex items-center gap-3 text-rose">
                  <LineIcon name="mic" size={22} className="hover-wiggle" />
                  <p className="font-serif text-base italic">{t(e.when)}</p>
                </div>
                <h3 className="mt-3 font-serif text-[26px] italic leading-tight">{t(e.title)}</h3>
                <p className="mt-1 text-[13px] text-muted">{t(e.host)}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{t(e.body)}</p>
              </Card>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <h2 className="mb-6 mt-16 font-serif text-[clamp(2rem,3.4vw,2.6rem)] italic">{t(s.highlightsTitle)}</h2>
        </Reveal>
        <PhotoGrid photos={s.highlights} columns="grid-cols-2 md:grid-cols-3" itemClassName="h-[200px] md:h-[300px]" />
      </Container>
      <FooterCTA />
    </>
  );
}
