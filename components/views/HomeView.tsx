'use client';

import Image from 'next/image';
import Link from 'next/link';
import { home, site } from '@/lib/content';
import { useT } from '@/lib/store';
import { Body, Container, PillLink } from '@/components/ui/primitives';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal';
import { Halo, MaskedImage, RotatingBadge } from '@/components/decor/Decor';
import { TulipCorner } from '@/components/decor/TulipCluster';
import FooterCTA from '@/components/layout/FooterCTA';

export default function HomeView() {
  const { t } = useT();

  return (
    <>
      <Container className="grid items-center gap-12 pb-10 pt-10 lg:min-h-[640px] lg:grid-cols-12 lg:gap-6 lg:pt-6">
        <Stagger className="relative z-10 flex flex-col gap-5 lg:col-span-6 lg:pt-10">
          <StaggerItem>
            <p className="flex items-center gap-3.5 text-[11px] font-semibold uppercase tracking-[0.3em]">
              <span aria-hidden className="h-px w-10 bg-ink" />
              {t(home.hello)}
              <span aria-hidden className="h-px w-28 bg-line" />
            </p>
          </StaggerItem>
          <h1 className="font-serif text-[clamp(3.4rem,7vw,6rem)] font-normal italic leading-[1.02]">
            <StaggerItem as="span" className="block text-ink">
              {site.shortName}
            </StaggerItem>
            <StaggerItem as="span" className="block text-rose">
              {t(home.tagline1)}
            </StaggerItem>
            <StaggerItem as="span" className="block text-rose">
              {t(home.tagline2)}
            </StaggerItem>
          </h1>
          <StaggerItem>
            <Body className="max-w-[34ch] text-[17px]">{t(home.intro)}</Body>
          </StaggerItem>
          <StaggerItem className="mt-1 flex flex-wrap gap-3.5">
            <PillLink href="/about">{t(home.ctaPrimary)}</PillLink>
            <PillLink href="/contact" variant="outline">
              {t(home.ctaSecondary)}
            </PillLink>
          </StaggerItem>
        </Stagger>

        <div className="relative mx-auto aspect-square w-full max-w-[560px] lg:col-span-6 lg:max-w-none">
          <svg aria-hidden viewBox="0 0 640 640" className="absolute -inset-[4%] h-[108%] w-[108%]">
            <circle cx="330" cy="310" r="292" stroke="var(--color-line)" strokeWidth="1" fill="none" />
            <path d="M40 470 C120 600 300 650 470 590" stroke="var(--color-rose)" strokeOpacity="0.5" strokeWidth="1" fill="none" />
          </svg>
          <Halo className="inset-[3%] rounded-full" />
          <MaskedImage src={site.portrait.src} alt={t(site.portrait.alt)} priority objectPosition="62% 10%" className="absolute inset-[3%] rounded-full" />
          <RotatingBadge text={t(home.badge)} className="absolute right-0 top-[4%] z-30 h-[104px] w-[104px] sm:h-[136px] sm:w-[136px]" />
          <TulipCorner side="left" scale={0.72} className="-bottom-14 -left-6 z-20" />
        </div>
      </Container>

      <section className="relative">
        <TulipCorner side="left" scale={0.9} className="-left-40 bottom-[-180px] hidden xl:block" />
        <Container className="pb-8 xl:pl-[200px]">
          <Reveal>
            <div className="flex items-center gap-4">
              <h2 className="font-serif text-3xl font-medium">{t(home.worksTitle)}</h2>
              <span aria-hidden className="h-px w-16 bg-line" />
              <span className="flex-1" />
              <PillLink href="/experience" variant="outline" className="border-0 bg-transparent px-0 py-0 shadow-none hover:shadow-none" arrow>
                {t(home.worksAll)}
              </PillLink>
            </div>
            <p className="mb-5 mt-1 text-sm text-muted">{t(home.worksSub)}</p>
          </Reveal>
          <div className="grid grid-cols-2 gap-3.5 md:grid-cols-4">
            {home.works.map((w, i) => (
              <Reveal key={w.href} delay={i * 0.08}>
                <Link href={w.href} className="group relative block h-[200px] overflow-hidden rounded-2xl shadow-[0_20px_40px_-24px_rgb(91_44_58/0.35)] md:h-[220px]">
                  <Image src={w.photo.src} alt={t(w.photo.alt)} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <FooterCTA />
    </>
  );
}
