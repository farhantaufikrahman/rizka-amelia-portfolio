'use client';

import Link from 'next/link';
import { projects, projectsPage } from '@/lib/content';
import { useT } from '@/lib/store';
import { Body, Card, Container, SerifTitle } from '@/components/ui/primitives';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal';
import { MaskedImage } from '@/components/decor/Decor';
import { TulipCorner } from '@/components/decor/TulipCluster';
import { PhotoGrid } from '@/components/sections/Gallery';
import FooterCTA from '@/components/layout/FooterCTA';

/** "Portfolio detail" layout: back link, title, large cover, photo grid, steps. */
export default function ProjectDetailView({ slug }: { slug: string }) {
  const { t } = useT();
  const p = projects.find((x) => x.slug === slug)!;

  return (
    <>
      <Container className="pt-10">
        <Stagger className="flex flex-col gap-4">
          <StaggerItem>
            <Link href="/projects" className="text-[13px] text-muted hover:text-rose">
              ← {t(projectsPage.backToProjects)}
            </Link>
          </StaggerItem>
          <StaggerItem>
            <SerifTitle lines={[t(p.title[0]), t(p.title[1])]} />
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
          <MaskedImage src={p.cover.src} alt={t(p.cover.alt)} priority objectPosition="50% 45%" sizes="(min-width: 1240px) 1160px, 100vw" className="h-[320px] w-full rounded-[28px] sm:h-[460px] lg:h-[560px]" />
          <TulipCorner side="right" scale={0.5} className="-bottom-16 -right-20 z-10 hidden md:block" />
        </div>
      </Container>

      <Container className="pb-6">
        <PhotoGrid photos={p.gallery} masonry={p.gallery.length > 8} columns="grid-cols-2 md:grid-cols-4" itemClassName="h-[160px] md:h-[210px]" />
        {p.steps && (
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {p.steps.map((s, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <Card className="flex h-full flex-col gap-2">
                  <p className="font-serif text-[40px] italic leading-none text-rose">{String(i + 1).padStart(2, '0')}</p>
                  <h2 className="text-base font-semibold">{t(s.title)}</h2>
                  <p className="text-[15px] leading-relaxed text-muted">{t(s.body)}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        )}
      </Container>
      <FooterCTA />
    </>
  );
}
