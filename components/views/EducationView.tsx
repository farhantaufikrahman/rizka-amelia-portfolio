'use client';

import { education } from '@/lib/content';
import type { L } from '@/lib/i18n';
import { useT } from '@/lib/store';
import { Body, Container, Eyebrow, PillLink, SerifTitle } from '@/components/ui/primitives';
import { Reveal } from '@/components/ui/Reveal';
import { LineIcon, Polaroid } from '@/components/decor/Decor';
import { BookStack, Diploma, LabGlass } from '@/components/decor/Illustrations';
import SectionHero from '@/components/sections/SectionHero';
import FooterCTA from '@/components/layout/FooterCTA';

/** Concept: a study desk — stacked books, graduation cap, diploma, bookmarked chapters. */
export default function EducationView() {
  const { t } = useT();
  const tt = (pair: [L, L]) => [t(pair[0]), t(pair[1])] as [string, string];

  return (
    <>
      <SectionHero
        eyebrow={t(education.eyebrow)}
        title={tt(education.title)}
        desc={t(education.desc)}
        cta={{ label: t(education.cta), href: '#chapters' }}
        visual={
          <div className="relative mx-auto h-full w-full max-w-[600px]">
            <div className="absolute left-[8%] top-[6%] flex aspect-square w-[62%] flex-col items-center justify-center gap-3 rounded-full bg-[radial-gradient(circle_at_40%_30%,#FFFFFF,#F6E1DF_60%,#F2CDD2)] shadow-[var(--shadow-photo)] dark:bg-[radial-gradient(circle_at_40%_30%,#4A2F38,#2B1D23_65%)]">
              <LineIcon name="tulip" size={42} className="text-rose" />
              <p className="text-center font-serif text-[clamp(1.8rem,3vw,2.4rem)] italic leading-[1.1] text-rose">
                {t(education.quote[0])}
                <br />
                {t(education.quote[1])}
              </p>
            </div>
            <BookStack className="absolute bottom-0 left-0 z-10 w-[64%]" />
            <Diploma className="animate-bob absolute bottom-[30%] right-0 z-10 w-[40%] rotate-[-8deg]" />
            <Polaroid src={education.timeline[1].photo.src} alt={t(education.timeline[1].photo.alt)} rotate={6} caption="SMKN 4 Garut" className="absolute right-[2%] top-0 z-20" imgClassName="h-[130px] w-[170px] sm:h-[150px] sm:w-[200px]" />
          </div>
        }
      />

      <Container id="chapters" className="scroll-mt-28 py-10">
        <div className="grid gap-6 md:grid-cols-3">
          {education.timeline.map((item, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <article className="relative flex h-full flex-col gap-4 rounded-r-2xl rounded-l-md border-l-[10px] border-rose/70 bg-card p-6 pt-10 shadow-[var(--shadow-soft)]">
                {/* bookmark ribbon */}
                <span aria-hidden className="absolute -top-2 right-6 h-16 w-7 bg-rose [clip-path:polygon(0_0,100%_0,100%_100%,50%_78%,0_100%)]" />
                <p className="font-serif text-sm italic text-rose">{t({ en: 'Chapter', id: 'Bab' })} {i + 1}</p>
                <p className="text-[13px] text-muted">{t(item.period)}</p>
                <h2 className="font-serif text-[28px] italic leading-tight">{t(item.title)}</h2>
                <p className="text-sm text-muted">{t(item.sub)}</p>
                <Polaroid src={item.photo.src} alt={t(item.photo.alt)} rotate={i % 2 ? -3 : 3} className="mt-auto self-center" imgClassName="h-[150px] w-[210px]" />
              </article>
            </Reveal>
          ))}
        </div>
      </Container>

      <Container id="thesis" className="scroll-mt-28 py-12">
        <Reveal>
          <div className="paper-grid relative grid items-center gap-8 rounded-[24px] p-8 text-[#5B2C3A] shadow-[var(--shadow-photo)] sm:p-12 lg:grid-cols-12">
            <div className="flex flex-col gap-4 lg:col-span-8">
              <Eyebrow>{t(education.thesisEyebrow)}</Eyebrow>
              <SerifTitle as="h2" size="md" accent lines={tt(education.thesisTitle)} />
              <Body>{t(education.thesisBody)}</Body>
              <PillLink href="/projects/sop-hedonic-testing">
                {t(education.thesisCta)}
              </PillLink>
            </div>
            <LabGlass className="mx-auto w-48 lg:col-span-4" />
          </div>
        </Reveal>
      </Container>

      <FooterCTA />
    </>
  );
}
