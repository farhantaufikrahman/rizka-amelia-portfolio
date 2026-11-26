'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { education } from '@/lib/content';
import type { L } from '@/lib/i18n';
import { useT } from '@/lib/store';
import { Body, Card, Container, Eyebrow, PillLink, SerifTitle } from '@/components/ui/primitives';
import { Reveal } from '@/components/ui/Reveal';
import { LineIcon, Polaroid } from '@/components/decor/Decor';
import { BookStack, Diploma, LabGlass } from '@/components/decor/Illustrations';
import { TulipCorner } from '@/components/decor/TulipCluster';
import SectionHero from '@/components/sections/SectionHero';
import FooterCTA from '@/components/layout/FooterCTA';

const ease = [0.22, 0.61, 0.36, 1] as const;

/** Reference layout: tulip hero → vertical timeline (text card + photo per stop) → thesis banner. */
export default function EducationView() {
  const { t } = useT();
  const tt = (pair: [L, L]) => [t(pair[0]), t(pair[1])] as [string, string];

  return (
    <>
      <SectionHero
        eyebrow={t(education.eyebrow)}
        title={tt(education.title)}
        accent
        desc={t(education.desc)}
        cta={{ label: t(education.cta), href: '#chapters' }}
        visual={
          <div className="relative mx-auto h-full w-full max-w-[600px]">
            <div className="animate-breathe absolute left-[8%] top-[6%] flex aspect-square w-[60%] flex-col items-center justify-center gap-3 rounded-full bg-[radial-gradient(circle_at_40%_30%,#FFFFFF,#F6E1DF_60%,#F2CDD2)] shadow-[var(--shadow-photo)] dark:bg-[radial-gradient(circle_at_40%_30%,#4A2F38,#2B1D23_65%)]">
              <LineIcon name="cap" size={42} className="animate-rise-bob text-rose" />
              <p className="text-center font-serif text-[clamp(1.8rem,3vw,2.4rem)] italic leading-[1.1] text-rose">
                {t(education.quote[0])}
                <br />
                {t(education.quote[1])}
              </p>
            </div>
            <BookStack className="absolute bottom-0 left-0 z-10 w-[58%]" />
            <Polaroid src="/images/teaching/smkn4-garut-1.jpg" alt={t({ en: 'With students at SMKN 4 Garut', id: 'Bersama siswa SMKN 4 Garut' })} rotate={6} drift={1.5} caption="SMKN 4 Garut" className="absolute right-[2%] top-0 z-20" imgClassName="h-[170px] w-[140px] sm:h-[210px] sm:w-[170px]" />
            <TulipCorner side="right" scale={0.45} className="-bottom-8 right-0 z-10" gustDelay={1.2} />
          </div>
        }
      />

      <Container id="chapters" className="scroll-mt-28 py-10">
        <div className="relative mx-auto max-w-[860px]">
          {/* the timeline line draws itself as you scroll */}
          <motion.span
            aria-hidden
            className="absolute bottom-6 left-[11px] top-6 w-px origin-top bg-[linear-gradient(180deg,var(--color-rose),var(--color-line))]"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.6, ease }}
          />
          <ol className="flex flex-col gap-8">
            {education.timeline.map((item, i) => (
              <li key={i} className="relative pl-12">
                <span aria-hidden className="absolute left-0 top-9 flex h-6 w-6 items-center justify-center">
                  <span className="animate-pulse-ring absolute h-3 w-3 rounded-full bg-rose/60" style={{ animationDelay: `${i * 0.6}s` }} />
                  <span className="relative h-3 w-3 rounded-full border-2 border-paper bg-rose shadow" />
                </span>
                <Reveal kind="right" delay={i * 0.1}>
                  <Card className="grid items-center gap-5 p-5 sm:grid-cols-[1fr_200px] sm:p-6">
                    <div>
                      <p className="font-serif text-sm italic text-rose">{t(item.period)}</p>
                      <h2 className="mt-1 font-serif text-[26px] italic leading-tight text-ink">{t(item.title)}</h2>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{t(item.sub)}</p>
                    </div>
                    {item.photo ? (
                      <div className="group relative h-[150px] overflow-hidden rounded-2xl">
                        <span className="animate-ken-burns absolute inset-0 block" style={{ animationDelay: `${-i * 5}s` }}>
                          <Image src={item.photo.src} alt={t(item.photo.alt)} fill sizes="200px" className="object-cover" style={item.photo.pos ? { objectPosition: item.photo.pos } : undefined} />
                        </span>
                      </div>
                    ) : (
                      <div className="flex h-[150px] items-center justify-center rounded-2xl bg-surface/70">
                        <Diploma className="animate-float w-[70%]" />
                      </div>
                    )}
                  </Card>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Container>

      <Container id="thesis" className="scroll-mt-28 py-12">
        <Reveal kind="tilt">
          <div className="paper-grid relative grid items-center gap-8 overflow-hidden rounded-[24px] p-8 text-[#5B2C3A] shadow-[var(--shadow-photo)] sm:p-12 lg:grid-cols-12">
            <div className="flex flex-col gap-4 lg:col-span-8">
              <Eyebrow>{t(education.thesisEyebrow)}</Eyebrow>
              <SerifTitle as="h2" size="md" accent lines={tt(education.thesisTitle)} />
              <Body>{t(education.thesisBody)}</Body>
              <PillLink href="/projects/sop-hedonic-testing">{t(education.thesisCta)}</PillLink>
            </div>
            <LabGlass className="animate-float mx-auto w-48 lg:col-span-4" />
          </div>
        </Reveal>
      </Container>

      <FooterCTA />
    </>
  );
}
