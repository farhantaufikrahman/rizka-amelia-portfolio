'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCallback, useState } from 'react';
import { certificatesPage, education } from '@/lib/content';
import { Lightbox } from '@/components/sections/Gallery';
import type { L } from '@/lib/i18n';
import { useT } from '@/lib/store';
import { Body, Card, Container, Eyebrow, PillLink, SerifTitle } from '@/components/ui/primitives';
import { Reveal } from '@/components/ui/Reveal';
import { LineIcon, OrgLogo, Polaroid } from '@/components/decor/Decor';
import { BookStack, Diploma, LabGlass } from '@/components/decor/Illustrations';
import { TulipCorner } from '@/components/decor/TulipCluster';
import SectionHero from '@/components/sections/SectionHero';
import FooterCTA from '@/components/layout/FooterCTA';

const ease = [0.22, 0.61, 0.36, 1] as const;

/** Reference layout: tulip hero → vertical timeline (text card + photo per stop) → thesis banner. */
export default function EducationView() {
  const { t } = useT();
  const tt = (pair: [L, L]) => [t(pair[0]), t(pair[1])] as [string, string];
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const mainCert = certificatesPage.items[0];
  // page 2 of the BNSP certificate stays on /certificates; the others are listed here
  const moreCerts = certificatesPage.items.map((item, index) => ({ item, index })).filter(({ index }) => index >= 2);

  return (
    <>
      <SectionHero
        eyebrow={t(education.eyebrow)}
        title={tt(education.title)}
        accent
        desc={t(education.desc)}
        cta={{ label: t(education.cta), href: '#chapters' }}
        below={
          <PillLink href="#certificates" variant="outline">
            {t(education.certCta)}
          </PillLink>
        }
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
            <TulipCorner side="right" scale={0.28} className="-bottom-4 right-0 z-10" gustDelay={1.2} />
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
                      <div className="mt-1 flex items-center gap-3">
                        {item.logo && <OrgLogo logo={item.logo} size={48} />}
                        <h2 className="font-serif text-[26px] italic leading-tight text-ink">{t(item.title)}</h2>
                      </div>
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

      <Container id="certificates" className="scroll-mt-28 py-12">
        <Reveal className="mb-8 flex flex-col gap-3">
          <Eyebrow>{t(education.certCta)}</Eyebrow>
          <SerifTitle as="h2" size="md" accent lines={tt(education.certTitle)} />
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-12">
          {/* BNSP gets the main spot; the other certificates sit beside it, smaller */}
          <Reveal kind="tilt" className="lg:col-span-7">
            <Card className="grid h-full items-center gap-6 sm:grid-cols-[180px_1fr]">
              <button type="button" onClick={() => setOpen(0)} aria-label={t(mainCert.title)} className="relative mx-auto block h-[230px] w-[170px] cursor-zoom-in overflow-hidden rounded-xl border border-line bg-white">
                <Image src={mainCert.photo.src} alt={t(mainCert.photo.alt)} fill sizes="180px" className="object-contain p-1" />
              </button>
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-muted">{t(education.certMain)}</p>
                <div className="mt-2 flex items-center gap-3">
                  {mainCert.logo && <OrgLogo logo={mainCert.logo} size={52} className="m-1" />}
                  <h3 className="font-serif text-[26px] italic leading-tight text-ink">{t({ en: 'Skilled Instructor (Instruktur Terampil)', id: 'Instruktur Terampil' })}</h3>
                </div>
                <p className="mt-2 text-sm text-muted">Badan Nasional Sertifikasi Profesi (BNSP)</p>
                <p className="mt-1 text-sm text-muted">{t(mainCert.meta)}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <PillLink href={certificatesPage.pdf} variant="outline">
                    {t(certificatesPage.openPdf)}
                  </PillLink>
                </div>
              </div>
            </Card>
          </Reveal>
          <div className="flex flex-col gap-4 lg:col-span-5">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-muted">{t(education.certMore)}</p>
            {moreCerts.map(({ item, index }) => (
              <Reveal key={item.photo.src} kind="right">
                <button type="button" onClick={() => setOpen(index)} className="group flex w-full items-center gap-4 rounded-[18px] border border-white/70 bg-card p-3 text-left shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5 dark:border-white/10">
                  <span className="relative block h-[64px] w-[84px] flex-none overflow-hidden rounded-lg bg-white">
                    <Image src={item.photo.src} alt={t(item.photo.alt)} fill sizes="84px" className="object-contain" />
                  </span>
                  <span>
                    <span className="block font-serif text-lg italic leading-tight text-ink group-hover:text-rose">{t(item.title)}</span>
                    <span className="mt-0.5 block text-[12px] text-muted">{t(item.meta)}</span>
                  </span>
                </button>
              </Reveal>
            ))}
            <PillLink href="/certificates" className="self-start" arrow>
              {t(education.certAll)}
            </PillLink>
          </div>
        </div>
        <Lightbox photos={certificatesPage.items.map((i) => i.photo)} index={open} onClose={close} onIndex={setOpen} />
      </Container>

      <FooterCTA />
    </>
  );
}
