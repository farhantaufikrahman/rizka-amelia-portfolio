'use client';

import { ui } from '@/lib/i18n';
import { site } from '@/lib/content';
import { useT } from '@/lib/store';
import { Body, Container, PillLink } from '@/components/ui/primitives';
import { Reveal } from '@/components/ui/Reveal';
import { TulipCorner } from '@/components/decor/TulipCluster';

/** "Let's grow together" closing band shown at the bottom of most pages. */
export default function FooterCTA() {
  const { t } = useT();
  return (
    <footer className="relative mt-16 overflow-hidden bg-gradient-to-b from-transparent via-surface/90 to-surface pb-10 pt-32">
      <svg aria-hidden className="absolute left-0 top-8 h-[120px] w-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d="M0 90 C300 20 620 120 960 60 S1340 20 1440 50" stroke="var(--color-line)" strokeWidth="1" fill="none" />
      </svg>
      <TulipCorner side="right" scale={0.9} className="-right-10 -bottom-10 hidden sm:block" />
      <TulipCorner side="right" scale={0.45} className="-right-6 -bottom-6 sm:hidden" />
      <Container className="relative z-10">
        <Reveal className="flex flex-col gap-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-ink">{t(ui.footer.eyebrow)}</p>
          <h2 className="font-serif text-[clamp(2.4rem,5vw,4rem)] font-normal italic leading-[1.02] text-ink">
            {t(ui.footer.title1)}
            <br />
            {t(ui.footer.title2)}
          </h2>
          <Body>{t(ui.footer.body)}</Body>
          <PillLink href="/contact" className="mt-2">
            {t(ui.footer.cta)}
          </PillLink>
        </Reveal>
        <p className="relative z-10 mt-24 text-xs text-muted">
          © {new Date().getFullYear()} {site.name}. {t(ui.footer.rights)}
        </p>
      </Container>
    </footer>
  );
}
