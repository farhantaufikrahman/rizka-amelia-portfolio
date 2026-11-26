'use client';

import { speakingPage as s } from '@/lib/content';
import { useT } from '@/lib/store';
import { Container } from '@/components/ui/primitives';
import { Reveal } from '@/components/ui/Reveal';
import { MaskedImage } from '@/components/decor/Decor';
import { CurtainSwag, Microphone, Spotlight, Ticket } from '@/components/decor/Illustrations';
import { PhotoGrid } from '@/components/sections/Gallery';
import SectionHero from '@/components/sections/SectionHero';
import FooterCTA from '@/components/layout/FooterCTA';

/** Concept: on stage — velvet curtains, a spotlight on the speaker, events as admission tickets. */
export default function SpeakingView() {
  const { t } = useT();
  return (
    <>
      <div className="relative">
        <CurtainSwag side="left" className="pointer-events-none absolute left-0 top-0 z-0 w-[34vw] max-w-[360px]" />
        <CurtainSwag side="right" className="pointer-events-none absolute right-0 top-0 z-0 w-[34vw] max-w-[360px]" />
      </div>
      <SectionHero
        reverse
        tulips={false}
        eyebrow={t(s.eyebrow)}
        title={[t(s.title[0]), t(s.title[1])]}
        desc={t(s.desc)}
        cta={{ label: t(s.cta), href: '#events' }}
        visualClassName="h-[460px] sm:h-[580px]"
        visual={
          <div className="relative mx-auto h-full w-full max-w-[520px]">
            <Spotlight className="-top-10 left-[8%] h-[110%] w-[84%]" />
            {/* stage-shaped frame, cropped on the speaker (bottom-left of the original photo) */}
            <MaskedImage
              src={s.hero.src}
              alt={t(s.hero.alt)}
              priority
              objectPosition={s.hero.pos}
              className="absolute left-[14%] top-[4%] h-[86%] w-[66%] rounded-t-[200px] rounded-b-[24px] border-[10px] border-paper"
            />
            <Microphone className="absolute bottom-0 left-0 z-10 h-56 w-20" />
            <div aria-hidden className="absolute bottom-0 left-[6%] right-[6%] h-4 rounded-full bg-ink/10 blur-md" />
          </div>
        }
      />
      <Container id="events" className="scroll-mt-28 pb-6">
        <div className="grid gap-6 md:grid-cols-2">
          {s.events.map((e, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <Ticket
                stub={
                  <>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.25em]">Admit one</span>
                    <span className="font-serif text-3xl italic leading-none">{t(e.when).split(' · ')[0]}</span>
                    <span className="text-[11px] opacity-80">{t(e.when).split(' · ')[1]}</span>
                  </>
                }
              >
                <h3 className="font-serif text-2xl italic leading-tight">{t(e.title)}</h3>
                <p className="mt-1 text-[13px] text-muted">{t(e.host)}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{t(e.body)}</p>
              </Ticket>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <h2 className="mb-6 mt-16 font-serif text-4xl italic">{t(s.highlightsTitle)}</h2>
        </Reveal>
        <PhotoGrid photos={s.highlights} columns="grid-cols-2 md:grid-cols-4" itemClassName="h-[200px] md:h-[280px]" />
      </Container>
      <FooterCTA />
    </>
  );
}
