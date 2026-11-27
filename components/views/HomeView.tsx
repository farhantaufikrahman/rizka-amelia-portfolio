'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { home, site } from '@/lib/content';
import { useT } from '@/lib/store';
import { Body, Container, Eyebrow, PillLink } from '@/components/ui/primitives';
import { Parallax, Reveal, SplitWords, Stagger, StaggerItem } from '@/components/ui/Reveal';
import { Halo, MaskedImage, RotatingBadge } from '@/components/decor/Decor';
import { TulipCorner } from '@/components/decor/TulipCluster';
import FooterCTA from '@/components/layout/FooterCTA';

const ease = [0.22, 0.61, 0.36, 1] as const;

/** Endless ribbon of the creative roles, with a tulip between each. */
function RoleRibbon() {
  const { t } = useT();
  const items = [...home.roles, ...home.roles];
  return (
    <div className="relative overflow-hidden border-y border-line bg-card/60 py-4 backdrop-blur-sm [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
      <div className="animate-marquee flex w-max items-center gap-10 hover:[animation-play-state:paused]">
        {items.map((r, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap font-serif text-2xl italic text-ink sm:text-3xl" aria-hidden={i >= home.roles.length}>
            {t(r)}
            <svg width="18" height="22" viewBox="0 0 24 30" aria-hidden className="animate-spin-slow text-rose" style={{ animationDuration: `${10 + (i % 3) * 4}s` }}>
              <path d="M6 6 C8 9 10 12 12 14 C14 12 16 9 18 6 C17 11 15 13 12 14 C9 13 7 11 6 6 Z M12 3 C10 6 10 10 12 14 C14 10 14 6 12 3 Z" fill="currentColor" opacity="0.8" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function HomeView() {
  const { t } = useT();

  return (
    <>
      <Container className="grid items-center gap-12 pb-12 pt-10 lg:min-h-[660px] lg:grid-cols-12 lg:gap-6 lg:pt-6">
        <Stagger className="relative z-10 flex flex-col gap-5 lg:col-span-6 lg:pt-10">
          <StaggerItem>
            <Eyebrow>{t(home.hello)}</Eyebrow>
          </StaggerItem>
          <h1 className="font-serif font-normal italic">
            <SplitWords text={site.shortName} className="block text-[clamp(3.2rem,7vw,5.6rem)] leading-[1.02] text-ink" delay={0.6} />
            <StaggerItem as="span" className="text-shimmer mt-2 block text-[clamp(1.75rem,3.4vw,2.6rem)] leading-[1.15]">
              {t(home.headline)}
            </StaggerItem>
          </h1>
          <StaggerItem>
            <Body className="max-w-[46ch] text-[17px]">{t(home.intro)}</Body>
          </StaggerItem>
          <StaggerItem className="mt-1 flex flex-wrap gap-3.5">
            <PillLink href="/experience">{t(home.ctaPrimary)}</PillLink>
            <PillLink href={site.cv} variant="outline">
              {t(home.ctaSecondary)}
            </PillLink>
          </StaggerItem>
        </Stagger>

        <Parallax speed={30} className="relative mx-auto aspect-square w-full max-w-[560px] lg:col-span-6 lg:max-w-none">
          <motion.svg
            aria-hidden
            viewBox="0 0 640 640"
            className="absolute -inset-[4%] h-[108%] w-[108%]"
            initial={{ opacity: 0, rotate: -40 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 1.6, ease, delay: 0.5 }}
          >
            <circle cx="320" cy="320" r="300" stroke="var(--color-line)" strokeWidth="1" fill="none" strokeDasharray="2 8" />
            <path d="M40 470 C120 600 300 650 470 590" stroke="var(--color-rose)" strokeOpacity="0.5" strokeWidth="1" fill="none" />
          </motion.svg>
          {/* a spark of light circling the portrait */}
          <div aria-hidden className="absolute left-1/2 top-1/2 h-0 w-0 [--orbit:min(46vw,290px)]">
            <span className="animate-orbit absolute -ml-2 -mt-2 block h-4 w-4 rounded-full bg-[radial-gradient(circle,#FFF7DC,rgba(255,214,150,0.7)_40%,transparent_70%)] shadow-[0_0_18px_6px_rgba(255,226,170,0.6)]" />
          </div>
          <div className="animate-float absolute inset-[3%]">
            <Halo className="inset-0 rounded-full" />
            <MaskedImage src={site.portraitCircle.src} alt={t(site.portraitCircle.alt)} priority objectPosition={site.portraitCircle.pos} className="absolute inset-0 rounded-full" />
          </div>
          <RotatingBadge text={t(home.badge)} className="absolute right-0 top-[4%] z-30 h-[88px] w-[88px] sm:h-[136px] sm:w-[136px]" />
          <TulipCorner side="left" scale={0.3} className="-bottom-4 -left-2 z-20 sm:-left-6" gustDelay={0.4} />
        </Parallax>
      </Container>

      <Reveal kind="blur">
        <RoleRibbon />
      </Reveal>

      <section className="relative">
        <Container className="pb-6 pt-16">
          <Reveal className="flex items-end gap-4">
            <div>
              <h2 className="font-serif text-[clamp(2rem,3.4vw,2.6rem)] font-normal italic">{t(home.worksTitle)}</h2>
              <p className="mt-1 text-sm text-muted">{t(home.worksSub)}</p>
            </div>
            <span aria-hidden className="mb-3 hidden h-px flex-1 bg-line sm:block" />
            <PillLink href="/experience" variant="outline" className="border-0 bg-transparent px-0 py-0 shadow-none hover:shadow-none" arrow>
              {t(home.worksAll)}
            </PillLink>
          </Reveal>
          <div className="mt-7 grid grid-cols-2 gap-4 md:grid-cols-4">
            {home.works.map((w, i) => (
              <motion.div
                key={w.href}
                initial={{ opacity: 0, y: 60, rotate: i % 2 ? 3 : -3 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, ease, delay: i * 0.1 }}
                className={i % 2 ? 'md:mt-10' : undefined}
              >
                <Link href={w.href} className="group relative block h-[230px] overflow-hidden rounded-[22px] shadow-[0_24px_44px_-26px_rgb(91_44_58/0.45)] md:h-[280px]">
                  <span className="animate-ken-burns absolute inset-0 block" style={{ animationDelay: `${-i * 4}s` }}>
                    <Image src={w.photo.src} alt={t(w.photo.alt)} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" style={w.photo.pos ? { objectPosition: w.photo.pos } : undefined} />
                  </span>
                  <span className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,rgba(91,44,58,0.75))]" />
                  <span className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-2 text-white">
                    <span className="flex flex-col">
                      <span className="font-serif text-[22px] italic leading-tight md:text-2xl">{t(w.label)}</span>
                      <span className="mt-1 text-[11px] leading-snug text-white/85">{t(w.sub)}</span>
                    </span>
                    <span aria-hidden className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-white/25 backdrop-blur-sm transition-transform duration-500 group-hover:rotate-[-45deg] group-hover:bg-rose">
                      <svg width="13" height="9" viewBox="0 0 16 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M1 5h13M10 1l4 4-4 4" /></svg>
                    </span>
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
          <Reveal delay={0.1} className="mt-16">
            <div className="grid gap-6 rounded-[24px] border border-white/70 bg-card p-6 shadow-[var(--shadow-soft)] backdrop-blur-md dark:border-white/10 sm:p-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <h2 className="font-serif text-[clamp(1.7rem,3vw,2.2rem)] italic">{t(home.backgroundTitle)}</h2>
                <p className="mt-2 max-w-[70ch] text-[15px] leading-relaxed text-muted">{t(home.background)}</p>
              </div>
              <div className="flex flex-wrap gap-3 md:flex-col">
                {home.backgroundLinks.map((l, i) => (
                  <PillLink key={l.href} href={l.href} variant={i ? 'outline' : undefined}>
                    {t(l.label)}
                  </PillLink>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.2} className="mt-10">
            <p className="max-w-[60ch] text-sm leading-relaxed text-muted">
              {t(home.footnote)}{' '}
              <Link href="/experience#creative" className="underline decoration-rose underline-offset-4 hover:text-rose">
                {t(home.footnoteLink)}
              </Link>
            </p>
          </Reveal>
        </Container>
      </section>

      <FooterCTA />
    </>
  );
}
