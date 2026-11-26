'use client';

import Link from 'next/link';
import { useCallback, useState } from 'react';
import { experiences, makeupPage, projects, site } from '@/lib/content';
import { ui } from '@/lib/i18n';
import { useT } from '@/lib/store';
import { Card, Container, Eyebrow, PillLink, SerifTitle } from '@/components/ui/primitives';
import { Reveal } from '@/components/ui/Reveal';
import { Halo, MaskedImage } from '@/components/decor/Decor';
import { TulipCorner } from '@/components/decor/TulipCluster';
import { Lightbox, PhotoGrid, PhotoTile } from '@/components/sections/Gallery';
import SectionHero from '@/components/sections/SectionHero';
import FooterCTA from '@/components/layout/FooterCTA';

/** Reference layout "Makeup Artist": round beauty portrait hero → 3 × 2 grid of looks → stats. */
function MakeupView() {
  const { t } = useT();
  const e = experiences.find((x) => x.slug === 'makeup-artist')!;
  const [index, setIndex] = useState<number | null>(null);
  const close = useCallback(() => setIndex(null), []);
  return (
    <>
      <SectionHero
        eyebrow={t(makeupPage.eyebrow)}
        title={[t(makeupPage.title[0]), t(makeupPage.title[1])]}
        accent
        desc={t(makeupPage.desc)}
        cta={{ label: t({ en: 'View Full Gallery', id: 'Lihat Semua Foto' }), href: '#looks' }}
        below={
          <PillLink href={site.arunikaa} variant="outline">
            {t(makeupPage.cta)}
          </PillLink>
        }
        visual={
          <div className="relative mx-auto aspect-square w-full max-w-[520px]">
            <div className="animate-float absolute inset-[4%]">
              <Halo className="inset-0 rounded-full" />
              <MaskedImage src={e.cover.src} alt={t(e.cover.alt)} priority objectPosition="50% 20%" className="absolute inset-[4%] rounded-full" />
            </div>
            <TulipCorner side="right" scale={0.5} className="-bottom-8 -right-10 z-20" gustDelay={1} />
          </div>
        }
      />
      <Container id="looks" className="scroll-mt-28 pb-6">
        <Reveal>
          <h2 className="mb-6 font-serif text-[clamp(2rem,3.4vw,2.6rem)] italic">{t(makeupPage.galleryTitle)}</h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {e.gallery.map((ph, i) => (
            <PhotoTile key={ph.src} photo={ph} index={i} onOpen={() => setIndex(i)} className="h-[240px] md:h-[340px]" />
          ))}
        </div>
        <Lightbox photos={e.gallery} index={index} onClose={close} onIndex={setIndex} />
        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {makeupPage.stats.map((s, i) => (
            <Reveal key={i} kind="bloom" delay={i * 0.12} className="flex flex-col items-center">
              {/* powder compact */}
              <div className="animate-rise-bob flex h-36 w-36 items-center justify-center rounded-full bg-[linear-gradient(145deg,#F6D9C4,#E9B9A0)] p-3 shadow-[var(--shadow-soft)]" style={{ animationDelay: `${-i}s` }}>
                <div className="flex h-full w-full items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#FFFFFF,#F8DCD6_55%,#EFC3C9)]">
                  <p className="font-serif text-4xl italic text-[#5B2C3A]">{t(s.value)}</p>
                </div>
              </div>
              <p className="mt-3 text-center text-[13px] text-muted">{t(s.label)}</p>
            </Reveal>
          ))}
        </div>
        <Reveal kind="tilt">
          <Card className="mt-12 grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-[13px] text-muted">
                {t(e.period)} · {t(e.type)}
              </p>
              <h3 className="mt-1 font-serif text-3xl italic">{t(e.org)}</h3>
            </div>
            <ul className="list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-muted marker:text-rose">
              {e.points.map((p, i) => (
                <li key={i}>{t(p)}</li>
              ))}
            </ul>
          </Card>
        </Reveal>
      </Container>
      <FooterCTA />
    </>
  );
}

/** Generic experience detail: hero + responsibilities + gallery. */
export default function ExperienceDetailView({ slug }: { slug: string }) {
  const { t } = useT();
  if (slug === 'makeup-artist') return <MakeupView />;
  const e = experiences.find((x) => x.slug === slug)!;
  const others = experiences.filter((x) => x.slug !== slug);
  const lookbook = slug === 'model-talent' ? projects.find((p) => p.slug === 'momies-bakery') : undefined;

  return (
    <>
      <Container className="pt-10">
        <Link href="/experience" className="group inline-flex items-center gap-2 text-[13px] text-muted hover:text-rose">
          <span aria-hidden className="transition-transform group-hover:-translate-x-1">←</span> {t(ui.nav.experience)}
        </Link>
      </Container>
      <SectionHero
        eyebrow={`${t(e.type)} · ${t(e.period)}`}
        title={[t(e.role), t(e.org).split(' · ')[0]]}
        accent
        desc={t(e.summary)}
        visual={
          <div className="relative mx-auto h-full w-full max-w-[560px]">
            <Halo className="left-[2%] top-[6%] h-[88%] w-[94%] -rotate-3 rounded-[32px]" />
            <div className="animate-float absolute left-[5%] top-[2%] h-[88%] w-[90%]">
              <MaskedImage src={e.cover.src} alt={t(e.cover.alt)} priority objectPosition={e.cover.pos ?? '50% 40%'} className="absolute inset-0 rounded-[28px]" />
            </div>
          </div>
        }
      />
      <Container className="grid gap-10 pb-10 lg:grid-cols-12">
        <Reveal kind="left" className="flex flex-col gap-4 lg:col-span-5">
          <Eyebrow>{t(e.org)}</Eyebrow>
          <SerifTitle as="h2" size="md" lines={[t(e.role), t(e.period)]} accent />
        </Reveal>
        <Reveal kind="tilt" delay={0.1} className="lg:col-span-7">
          <Card>
            <ul className="list-disc space-y-2.5 pl-5 text-[15px] leading-relaxed text-muted marker:text-rose">
              {e.points.map((p, i) => (
                <li key={i}>{t(p)}</li>
              ))}
            </ul>
          </Card>
        </Reveal>
      </Container>
      <Container className="pb-6">
        <PhotoGrid photos={e.gallery} columns="grid-cols-2 md:grid-cols-3" itemClassName="h-[220px] md:h-[300px]" />
        {lookbook && (
          <Reveal className="mt-8">
            <PillLink href={`/projects/${lookbook.slug}`}>{t({ en: 'See the full lookbook, grouped by look', id: 'Lihat lookbook lengkap per tampilan' })}</PillLink>
          </Reveal>
        )}
        <div className="mt-14 flex flex-wrap gap-3">
          {others.map((o) => (
            <Link key={o.slug} href={`/experience/${o.slug}`} className="rounded-full border border-line bg-card px-4 py-2 text-sm transition-all hover:-translate-y-0.5 hover:border-rose hover:text-rose">
              {t(o.role)} →
            </Link>
          ))}
        </div>
      </Container>
      <FooterCTA />
    </>
  );
}
