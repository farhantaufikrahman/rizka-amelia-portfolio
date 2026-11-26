'use client';

import Link from 'next/link';
import { experiences, makeupPage, site } from '@/lib/content';
import { ui } from '@/lib/i18n';
import { useT } from '@/lib/store';
import { Card, Container, Eyebrow, SerifTitle } from '@/components/ui/primitives';
import { Reveal } from '@/components/ui/Reveal';
import { Halo, MaskedImage } from '@/components/decor/Decor';
import { TulipCorner } from '@/components/decor/TulipCluster';
import { PhotoGrid } from '@/components/sections/Gallery';
import SectionHero from '@/components/sections/SectionHero';
import FooterCTA from '@/components/layout/FooterCTA';

/** /experience/makeup-artist — the image-led beauty page. */
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
        visual={
          <div className="relative mx-auto h-full w-full max-w-[520px]">
            <Halo className="left-0 top-[4%] h-[92%] w-[94%] -rotate-[5deg] rounded-[48%_52%_44%_56%/42%_40%_60%_58%]" />
            <MaskedImage src={e.cover.src} alt={t(e.cover.alt)} priority objectPosition="50% 20%" className="absolute left-[4%] top-0 h-[94%] w-[90%] rounded-[48%_52%_44%_56%/42%_40%_60%_58%]" />
            <TulipCorner side="left" scale={0.5} className="-bottom-10 -left-10 z-20" />
          </div>
        }
      />
      <Container className="pb-6">
        <Reveal>
          <h2 className="mb-6 font-serif text-4xl italic">{t(makeupPage.galleryTitle)}</h2>
        </Reveal>
        <PhotoGrid photos={e.gallery} columns="grid-cols-2 md:grid-cols-3" itemClassName="h-[220px] md:h-[300px]" />
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {makeupPage.stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.08} className="text-center">
              <p className="font-serif text-5xl italic leading-none">{t(s.value)}</p>
              <p className="mt-2 text-[13px] text-muted">{t(s.label)}</p>
            </Reveal>
          ))}
        </div>
        <Card className="mt-12 grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-[13px] text-muted">{t(e.period)} · {t(e.type)}</p>
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
