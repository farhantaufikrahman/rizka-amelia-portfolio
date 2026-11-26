'use client';

import { organizationPage as o } from '@/lib/content';
import { useT } from '@/lib/store';
import { Body, Container, SerifTitle } from '@/components/ui/primitives';
import { Reveal } from '@/components/ui/Reveal';
import { Polaroid } from '@/components/decor/Decor';
import { Bunting, Clothespin } from '@/components/decor/Illustrations';
import SectionHero from '@/components/sections/SectionHero';
import FooterCTA from '@/components/layout/FooterCTA';

/** Concept: a campus event — bunting across the top, photos pegged on a line, roles as lanyard ID cards. */
export default function OrganizationView() {
  const { t } = useT();
  return (
    <>
      <div className="relative">
        <Bunting className="pointer-events-none absolute inset-x-0 top-0 h-24 w-full opacity-90" />
      </div>
      <SectionHero
        eyebrow={t(o.eyebrow)}
        title={[t(o.title[0]), t(o.title[1])]}
        desc={t(o.desc)}
        cta={{ label: t(o.cta), href: '#roles' }}
        visualClassName="h-[440px] sm:h-[540px]"
        visual={
          <div className="relative h-full">
            <svg aria-hidden viewBox="0 0 600 120" preserveAspectRatio="none" className="absolute inset-x-0 top-6 h-24 w-full">
              <path d="M0 20 Q300 110 600 20" stroke="#B98A88" strokeWidth="2" fill="none" />
            </svg>
            {o.photos.map((ph, i) => (
              <div
                key={ph.src}
                className="animate-swing absolute"
                style={{ left: i === 0 ? '4%' : '48%', top: i === 0 ? '13%' : '16%', animationDelay: `${-i * 1.6}s` }}
              >
                <Clothespin className="absolute -top-5 left-1/2 z-20 h-11 w-4 -translate-x-1/2" />
                <Polaroid src={ph.src} alt={t(ph.alt)} rotate={i === 0 ? -3 : 4} caption={i === 1 ? 'FPTI UPI' : 'HIMAGRIN'} imgClassName="h-[170px] w-[220px] sm:h-[210px] sm:w-[280px]" />
              </div>
            ))}
          </div>
        }
      />
      <Container id="roles" className="scroll-mt-28 py-10">
        <Reveal className="mb-10 flex flex-col items-center gap-3 text-center">
          <SerifTitle as="h2" size="md" accent lines={[t(o.rolesTitle[0]), t(o.rolesTitle[1])]} />
          <Body className="text-center">{t(o.rolesBody)}</Body>
        </Reveal>
        <div className="mx-auto grid max-w-[900px] gap-10 md:grid-cols-2">
          {o.roles.map((r, i) => (
            <Reveal key={i} delay={i * 0.12} className="flex flex-col items-center">
              {/* lanyard */}
              <svg aria-hidden viewBox="0 0 120 90" className="h-20 w-28">
                <path d="M10 0 L56 80 M110 0 L64 80" stroke="#E48A9A" strokeWidth="8" />
                <rect x="50" y="74" width="20" height="14" rx="3" fill="#C9A27C" />
              </svg>
              <div className="animate-swing -mt-2 w-full max-w-[380px] rounded-2xl border border-line bg-card p-7 text-center shadow-[var(--shadow-photo)]" style={{ animationDuration: `${6 + i}s` }}>
                <span aria-hidden className="mx-auto mb-4 block h-2.5 w-14 rounded-full bg-blush shadow-[inset_0_1px_2px_rgba(91,44,58,0.3)]" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-rose">{t(r.period)}</p>
                <h3 className="mt-2 font-serif text-3xl italic">{t(r.role)}</h3>
                <p className="mt-1 text-sm font-medium">{t(r.org)}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{t(r.body)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
      <FooterCTA />
    </>
  );
}
