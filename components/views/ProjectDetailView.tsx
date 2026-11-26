'use client';

import Link from 'next/link';
import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { projects, projectsPage } from '@/lib/content';
import { useT } from '@/lib/store';
import { Body, Card, Container, SerifTitle, cx } from '@/components/ui/primitives';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal';
import { MaskedImage } from '@/components/decor/Decor';
import { TulipCorner } from '@/components/decor/TulipCluster';
import { Lightbox, LookStack, PhotoGrid, PhotoTile } from '@/components/sections/Gallery';
import FooterCTA from '@/components/layout/FooterCTA';

const ease = [0.22, 0.61, 0.36, 1] as const;

/** One step of the SOP: number, text, and the photos that show it (step 1 sits left, step 2 right, …). */
function Step({ step, i }: { step: NonNullable<(typeof projects)[number]['steps']>[number]; i: number }) {
  const { t } = useT();
  const [index, setIndex] = useState<number | null>(null);
  const close = useCallback(() => setIndex(null), []);
  const flip = i % 2 === 1;
  return (
    <li className="grid items-center gap-6 md:grid-cols-12">
      <Reveal kind={flip ? 'right' : 'left'} className={cx('md:col-span-5', flip && 'md:order-2')}>
        <Card className="relative overflow-hidden">
          <motion.span
            aria-hidden
            className="absolute -right-2 -top-6 font-serif text-[120px] italic leading-none text-rose/15"
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease }}
          >
            {i + 1}
          </motion.span>
          <p className="font-serif text-sm italic text-rose">{t({ en: 'Step', id: 'Langkah' })} {i + 1}</p>
          <h2 className="mt-1 font-serif text-3xl italic text-ink">{t(step.title)}</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-muted">{t(step.body)}</p>
        </Card>
      </Reveal>
      <div className={cx('grid gap-3 md:col-span-7', step.photos.length === 3 ? 'grid-cols-3' : 'grid-cols-2', flip && 'md:order-1')}>
        {step.photos.map((ph, k) => (
          <PhotoTile key={ph.src} photo={ph} index={k} onOpen={() => setIndex(k)} className={cx('h-[200px] md:h-[260px]', k === 1 && 'md:mt-8')} sizes="(min-width: 768px) 20vw, 33vw" />
        ))}
      </div>
      <Lightbox photos={step.photos} index={index} onClose={close} onIndex={setIndex} />
    </li>
  );
}

/** Project detail: title → large cover → either an illustrated procedure or a lookbook grouped by look. */
export default function ProjectDetailView({ slug }: { slug: string }) {
  const { t } = useT();
  const p = projects.find((x) => x.slug === slug)!;
  // The cover is already shown large at the top, so leave it out of the sets below.
  const notCover = <T extends { photos: { src: string }[] }>(x: T) => ({ ...x, photos: x.photos.filter((ph) => ph.src !== p.cover.src) });
  const steps = p.steps?.map(notCover);
  const looks = p.looks?.map(notCover).filter((l) => l.photos.length > 0);

  return (
    <>
      <Container className="pt-10">
        <Stagger className="flex flex-col gap-4">
          <StaggerItem>
            <Link href="/projects" className="group inline-flex items-center gap-2 text-[13px] text-muted hover:text-rose">
              <span aria-hidden className="transition-transform group-hover:-translate-x-1">←</span> {t(projectsPage.backToProjects)}
            </Link>
          </StaggerItem>
          <StaggerItem>
            <SerifTitle lines={[t(p.title[0]), t(p.title[1])]} accent />
          </StaggerItem>
          <StaggerItem>
            <p className="text-[13px] text-muted">{t(p.kicker)}</p>
          </StaggerItem>
          <StaggerItem>
            <Body className="max-w-[60ch]">{t(p.summary)}</Body>
          </StaggerItem>
        </Stagger>
      </Container>

      <Container className="py-8">
        <div className="relative">
          <MaskedImage src={p.cover.src} alt={t(p.cover.alt)} priority objectPosition={p.cover.pos ?? '50% 45%'} sizes="(min-width: 1240px) 1160px, 100vw" className="h-[320px] w-full rounded-[28px] sm:h-[460px] lg:h-[540px]" />
          <TulipCorner side="right" scale={0.5} className="-bottom-16 -right-20 z-10 hidden md:block" gustDelay={1.4} />
        </div>
      </Container>

      <Container className="pb-6">
        {steps && (
          <ol className="flex flex-col gap-14">
            {steps.map((s, i) => (
              <Step key={i} step={s} i={i} />
            ))}
          </ol>
        )}
        {looks && (
          <>
            <Reveal>
              <p className="mb-10 max-w-[56ch] text-sm text-muted">
                {t({
                  en: 'Frames from the same look are stacked together — hover to fan them out, tap to see every frame.',
                  id: 'Bingkai dari tampilan yang sama ditumpuk jadi satu — arahkan kursor untuk membukanya, ketuk untuk melihat semua.',
                })}
              </p>
            </Reveal>
            <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {looks.map((l, i) => (
                <LookStack key={l.title.en} title={l.title} note={l.note} photos={l.photos} index={i} />
              ))}
            </div>
          </>
        )}
        {p.gallery.length > 0 && <PhotoGrid photos={p.gallery} columns="grid-cols-2 md:grid-cols-4" itemClassName="h-[160px] md:h-[210px]" />}
      </Container>
      <FooterCTA />
    </>
  );
}
