'use client';

import { about, site } from '@/lib/content';
import { useT } from '@/lib/store';
import { Container, Eyebrow, PillLink, SerifTitle } from '@/components/ui/primitives';
import { Reveal } from '@/components/ui/Reveal';
import { LineIcon, Polaroid } from '@/components/decor/Decor';
import { PressedTulip, Stamp, Washi } from '@/components/decor/Illustrations';
import SectionHero from '@/components/sections/SectionHero';
import FooterCTA from '@/components/layout/FooterCTA';

/** Concept: a personal diary — lined notebook page, taped polaroid, pressed tulip, stamps. */
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
          <div className="relative mx-auto h-full w-full max-w-[520px]">
            {/* notebook page */}
            <div className="paper-lined absolute inset-x-[4%] bottom-[2%] top-[6%] -rotate-2 rounded-md shadow-[var(--shadow-photo)]">
              <span aria-hidden className="absolute inset-y-0 left-12 w-px bg-rose/50" />
              <div aria-hidden className="absolute inset-y-6 left-3 flex flex-col justify-between">
                {Array.from({ length: 9 }, (_, i) => (
                  <span key={i} className="h-3.5 w-3.5 rounded-full bg-blush shadow-[inset_0_1px_2px_rgba(91,44,58,0.25)]" />
                ))}
              </div>
              <p className="absolute bottom-8 left-16 font-serif text-2xl italic text-[#5B2C3A]">{t(site.location)}</p>
            </div>
            <div className="absolute left-[22%] top-0 z-10">
              <Washi className="-top-3 left-1/2 z-20 -translate-x-1/2 rotate-3" />
              <Polaroid src={site.portrait.src} alt={t(site.portrait.alt)} priority rotate={3} caption="Rizka Amelia" imgClassName="h-[300px] w-[230px] sm:h-[360px] sm:w-[280px]" />
            </div>
            <PressedTulip className="animate-sway absolute bottom-[4%] right-[6%] z-20 h-48 w-20 rotate-[18deg]" />
          </div>
        }
      />

      <Container className="pb-6">
        <div className="mx-auto grid max-w-[760px] gap-8 sm:grid-cols-3">
          {about.values.map((v, i) => (
            <Reveal key={v.icon} delay={i * 0.12}>
              <Stamp icon={<LineIcon name={v.icon as 'gem' | 'star' | 'heart'} size={30} />} label={t(v.title)} sub={t(v.caption)} rotate={[-6, 4, -2][i]} />
            </Reveal>
          ))}
        </div>
      </Container>

      <Container id="journey" className="grid scroll-mt-28 items-center gap-12 py-20 lg:grid-cols-12">
        <Reveal className="relative lg:col-span-7">
          <div className="paper-lined relative rotate-[-0.6deg] rounded-md px-8 pb-10 pt-12 text-[#5B2C3A] shadow-[var(--shadow-photo)] sm:px-14">
            <Washi className="-top-3 left-10 -rotate-6" />
            <Washi className="-top-3 right-10 rotate-6" color="rgba(168,185,160,0.6)" />
            <Eyebrow>{t(about.journeyEyebrow)}</Eyebrow>
            <SerifTitle as="h2" size="md" accent lines={tt(about.journeyTitle)} className="mt-4" />
            <p className="mt-5 text-[15px] leading-8 text-[#7D5F66]">{t(about.journey)}</p>
            <p className="mt-6 text-right font-serif text-3xl italic text-[#E48A9A]">— Rizka</p>
          </div>
        </Reveal>
        <div className="relative flex flex-col items-center gap-6 lg:col-span-5">
          <div className="relative h-[380px] w-full max-w-[400px]">
            <Polaroid src={about.photos[0].src} alt={t(about.photos[0].alt)} rotate={5} className="absolute right-0 top-0" imgClassName="h-[200px] w-[260px]" />
            <Polaroid src={about.photos[1].src} alt={t(about.photos[1].alt)} rotate={-7} className="absolute bottom-0 left-0 z-10" imgClassName="h-[150px] w-[200px]" />
            <PressedTulip className="absolute -bottom-4 right-4 z-20 h-36 w-14 -rotate-12" />
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <PillLink href={site.cv}>{t(about.cv)}</PillLink>
            <PillLink href={site.linkedin} variant="outline">
              LinkedIn
            </PillLink>
          </div>
        </div>
      </Container>

      <FooterCTA />
    </>
  );
}
