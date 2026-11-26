'use client';

import Link from 'next/link';
import { ui } from '@/lib/i18n';
import { navItems, site } from '@/lib/content';
import { useT } from '@/lib/store';
import { Body, Container, Eyebrow, PillLink } from '@/components/ui/primitives';
import { Reveal } from '@/components/ui/Reveal';
import { LineIcon } from '@/components/decor/Decor';
import { TulipCorner } from '@/components/decor/TulipCluster';

/** "Let's grow together" closing band + the footer navigation strip from the reference. */
export default function FooterCTA() {
  const { t } = useT();
  return (
    <footer className="relative mt-16 overflow-hidden bg-gradient-to-b from-transparent via-surface/80 to-surface pb-8 pt-32">
      <svg aria-hidden className="absolute left-0 top-8 h-[120px] w-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d="M0 90 C300 20 620 120 960 60 S1340 20 1440 50" stroke="var(--color-line)" strokeWidth="1" fill="none" />
      </svg>
      <TulipCorner side="right" scale={0.8} className="-bottom-4 -right-10 hidden sm:block" gustDelay={1.6} />
      <Container className="relative z-10">
        <Reveal className="flex flex-col gap-4">
          <Eyebrow>{t(ui.footer.eyebrow)}</Eyebrow>
          <h2 className="font-serif text-[clamp(2.4rem,5vw,4rem)] font-normal italic leading-[1.02] text-ink">
            {t(ui.footer.title1)}
            <br />
            <span className="text-shimmer">{t(ui.footer.title2)}</span>
          </h2>
          <Body>{t(ui.footer.body)}</Body>
          <PillLink href="/contact" className="mt-2">
            {t(ui.footer.cta)}
          </PillLink>
        </Reveal>

        <Reveal kind="blur" delay={0.1} className="mt-24">
          <div className="flex flex-col gap-5 rounded-[22px] border border-white/70 bg-card/80 px-5 py-4 backdrop-blur-md dark:border-white/10 lg:flex-row lg:items-center">
            <Link href="/" className="font-serif text-xl italic text-ink">
              {site.shortName}
            </Link>
            <nav aria-label={t({ en: 'Footer', id: 'Footer' })} className="flex flex-1 flex-wrap gap-x-4 gap-y-1">
              {[...navItems, { key: 'contact' as const, href: '/contact' }].map((n) => (
                <Link key={n.key} href={n.href} className="text-[13px] text-muted transition-colors hover:text-rose">
                  {t(ui.nav[n.key])}
                </Link>
              ))}
            </nav>
            <div className="flex gap-2">
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-all hover:-translate-y-0.5 hover:text-rose">
                <LineIcon name="linkedin" size={16} />
              </a>
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-all hover:-translate-y-0.5 hover:text-rose">
                <LineIcon name="instagram" size={16} />
              </a>
            </div>
          </div>
          <p className="mt-4 text-xs text-muted">
            © {new Date().getFullYear()} {site.name}. {t(ui.footer.rights)}
          </p>
        </Reveal>
      </Container>
    </footer>
  );
}
