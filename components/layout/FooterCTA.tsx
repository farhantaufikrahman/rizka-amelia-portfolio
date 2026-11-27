'use client';

import { MessageCircle } from 'lucide-react';
import { ui } from '@/lib/i18n';
import { site } from '@/lib/content';
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
          {/* Only the social links here — the page navigation already lives in the top navbar. */}
          <div className="flex gap-3">
            {[
              { href: site.linkedin, label: 'LinkedIn', icon: <LineIcon name="linkedin" size={18} /> },
              { href: site.instagram, label: 'Instagram', icon: <LineIcon name="instagram" size={18} /> },
              { href: site.whatsapp, label: 'WhatsApp', icon: <MessageCircle size={18} strokeWidth={1.5} /> },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-card/80 text-ink backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-rose hover:text-rose">
                {s.icon}
              </a>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted">
            © {new Date().getFullYear()} {site.name}. {t(ui.footer.rights)}
          </p>
        </Reveal>
      </Container>
    </footer>
  );
}
