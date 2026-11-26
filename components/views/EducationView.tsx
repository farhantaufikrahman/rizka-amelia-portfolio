'use client';

import { education } from '@/lib/content';
import { useT } from '@/lib/store';
import { Body, Container, Eyebrow, PillLink, SerifTitle } from '@/components/ui/primitives';
import { Reveal } from '@/components/ui/Reveal';
import { LineIcon, Polaroid } from '@/components/decor/Decor';
import SectionHero from '@/components/sections/SectionHero';
import FooterCTA from '@/components/layout/FooterCTA';

export default function EducationView() {
  const { t } = useT();
  const tt = (pair: [{ en: string; id: string }, { en: string; id: string }]) => [t(pair[0]), t(pair[1])] as [string, string];
  const last = education.timeline.length - 1;

  return (
    <>
      <SectionHero
        eyebrow={t(education.eyebrow)}
        title={tt(education.title)}
        desc={t(education.desc)}
        cta={{ label: t(education.cta), href: '#thesis' }}
        visualClassName="h-auto"
        visual={
          <ol className="relative ml-2 border-l border-line lg:ml-14">
            {education.timeline.map((item, i) => (
              <li key={i} className="relative grid items-center gap-6 pb-9 pl-10 sm:grid-cols-[1fr_220px]">
                <span
                  aria-hidden
                  className={`absolute -left-[9px] top-1/2 -mt-[9px] h-[18px] w-[18px] rounded-full shadow-[0_0_0_7px_rgb(228_138_154/0.18)] ${i === last ? 'bg-ink' : 'bg-rose'}`}
                />
                <Reveal delay={i * 0.1} className="flex flex-col gap-1">
                  <p className="text-[13px] text-muted">{t(item.period)}</p>
                  <p className="text-base font-semibold">{t(item.title)}</p>
                  <p className="text-[13px] text-muted">{t(item.sub)}</p>
                </Reveal>
                <Polaroid src={item.photo.src} alt={t(item.photo.alt)} rotate={i % 2 ? -4 : 4} className="justify-self-start" imgClassName="h-[140px] w-[190px]" />
              </li>
            ))}
          </ol>
        }
      />

      <Container id="thesis" className="grid scroll-mt-28 items-center gap-12 py-16 lg:grid-cols-12">
        <Reveal className="flex justify-center lg:col-span-5">
          <div className="flex aspect-square w-[300px] flex-col items-center justify-center gap-3 rounded-full bg-[radial-gradient(circle_at_40%_30%,#FFFFFF,#F6E1DF_60%,#F2CDD2)] shadow-[var(--shadow-photo)] dark:bg-[radial-gradient(circle_at_40%_30%,#4A2F38,#2B1D23_65%)]">
            <LineIcon name="tulip" size={40} className="text-rose" />
            <p className="text-center font-serif text-[34px] italic leading-[1.1] text-rose">
              {t(education.quote[0])}
              <br />
              {t(education.quote[1])}
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col gap-4 lg:col-span-7">
          <Eyebrow>{t(education.thesisEyebrow)}</Eyebrow>
          <SerifTitle as="h2" size="md" accent lines={tt(education.thesisTitle)} />
          <Body>{t(education.thesisBody)}</Body>
          <PillLink href="/projects/sop-hedonic-testing">{t(education.thesisCta)}</PillLink>
        </Reveal>
      </Container>

      <FooterCTA />
    </>
  );
}
