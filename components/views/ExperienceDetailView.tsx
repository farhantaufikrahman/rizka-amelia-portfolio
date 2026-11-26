'use client';

import Image from 'next/image';
import Link from 'next/link';
import { experiences, makeupPage, site } from '@/lib/content';
import { ui } from '@/lib/i18n';
import { useT } from '@/lib/store';
import { Card, Container, Eyebrow, SerifTitle } from '@/components/ui/primitives';
import { Reveal } from '@/components/ui/Reveal';
import { Halo, MaskedImage } from '@/components/decor/Decor';
import { Lipstick, MakeupBrush, VanityMirror } from '@/components/decor/Illustrations';
import { PhotoGrid } from '@/components/sections/Gallery';
import SectionHero from '@/components/sections/SectionHero';
import FooterCTA from '@/components/layout/FooterCTA';

/** Concept: a vanity table — oval mirror ringed with twinkling bulbs, lipstick and brush, powder-compact stats. */
function MakeupView() {
  const { t } = useT();
  const e = experiences.find((x) => x.slug === 'makeup-artist')!;
  return (
    <>
      <SectionHero
        eyebrow={t(makeupPage.eyebrow)}
        title={[t(makeupPage.title[0]), t(makeupPage.title[1])]}
        accent
        desc={t(makeupPage.desc)}
        cta={{ label: t(makeupPage.cta), href: site.arunikaa }}
        tulips={false}
        visual={
          <div className="relative mx-auto h-full w-full max-w-[520px]">
            <VanityMirror className="absolute left-[10%] top-[2%] h-[88%] w-[76%]">
              <Image src={e.cover.src} alt={t(e.cover.alt)} fill priority sizes="(min-width: 1024px) 420px, 80vw" className="object-cover" style={{ objectPosition: '50% 22%' }} />
            </VanityMirror>
            <Lipstick className="animate-bob absolute bottom-0 left-0 z-10 h-36 w-14 -rotate-12" />
            <MakeupBrush className="animate-sway absolute bottom-0 right-[2%] z-10 h-48 w-14 rotate-[14deg]" />
          </div>
        }
      />
      <Container className="pb-6">
        <Reveal>
          <h2 className="mb-6 font-serif text-4xl italic">{t(makeupPage.galleryTitle)}</h2>
        </Reveal>
        <PhotoGrid photos={e.gallery} masonry />
        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {makeupPage.stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.1} className="flex flex-col items-center">
              {/* powder compact */}
              <div className="flex h-36 w-36 items-center justify-center rounded-full bg-[linear-gradient(145deg,#F6D9C4,#E9B9A0)] p-3 shadow-[var(--shadow-soft)]">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#FFFFFF,#F8DCD6_55%,#EFC3C9)]">
                  <p className="font-serif text-4xl italic text-[#5B2C3A]">{t(s.value)}</p>
                </div>
              </div>
              <p className="mt-3 text-center text-[13px] text-muted">{t(s.label)}</p>
            </Reveal>
          ))}
        </div>
        <Card className="mt-12 grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-[13px] text-muted">
              {t(e.period)} · {t(e.type)}
            </p>
            <h3 className="mt-1 font-serif text-3xl italic">{t(e.org)}</h3>
          </div>
          <ul className="list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-muted">
            {e.points.map((p, i) => (
              <li key={i}>{t(p)}</li>
            ))}
          </ul>
        </Card>
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

  return (
    <>
      <Container className="pt-10">
        <Link href="/experience" className="text-[13px] text-muted hover:text-rose">
          ← {t(ui.nav.experience)}
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
            <MaskedImage src={e.cover.src} alt={t(e.cover.alt)} priority objectPosition="50% 40%" className="absolute left-[5%] top-[2%] h-[88%] w-[90%] rounded-[28px]" />
          </div>
        }
      />
      <Container className="grid gap-10 pb-10 lg:grid-cols-12">
        <Reveal className="flex flex-col gap-4 lg:col-span-5">
          <Eyebrow>{t(e.org)}</Eyebrow>
          <SerifTitle as="h2" size="md" lines={[t(e.role), t(e.period)]} accent />
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7">
          <Card>
            <ul className="list-disc space-y-2.5 pl-5 text-[15px] leading-relaxed text-muted">
              {e.points.map((p, i) => (
                <li key={i}>{t(p)}</li>
              ))}
            </ul>
          </Card>
        </Reveal>
      </Container>
      <Container className="pb-6">
        <PhotoGrid photos={e.gallery} columns={e.gallery.length > 6 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-3'} itemClassName="h-[200px] md:h-[260px]" />
        <div className="mt-14 flex flex-wrap gap-3">
          {others.map((o) => (
            <Link key={o.slug} href={`/experience/${o.slug}`} className="rounded-full border border-line bg-card px-4 py-2 text-sm hover:text-rose">
              {t(o.role)} →
            </Link>
          ))}
        </div>
      </Container>
      <FooterCTA />
    </>
  );
}
