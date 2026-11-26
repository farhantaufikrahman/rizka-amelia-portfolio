'use client';

import { organizationPage as o } from '@/lib/content';
import { useT } from '@/lib/store';
import { Body, Container, SerifTitle } from '@/components/ui/primitives';
import { Reveal } from '@/components/ui/Reveal';
import { LineIcon, Polaroid } from '@/components/decor/Decor';
import { TulipCorner } from '@/components/decor/TulipCluster';
import SectionHero from '@/components/sections/SectionHero';
import FooterCTA from '@/components/layout/FooterCTA';

export default function OrganizationView() {
  const { t } = useT();
  return (
    <>
      <SectionHero
        eyebrow={t(o.eyebrow)}
        title={[t(o.title[0]), t(o.title[1])]}
        desc={t(o.desc)}
        cta={{ label: t(o.cta), href: '#roles' }}
        visualClassName="h-[420px] sm:h-[540px]"
        visual={
          <div className="relative h-full">
            <Polaroid src={o.photos[0].src} alt={t(o.photos[0].alt)} rotate={4} className="absolute right-[4%] top-0 z-[1]" imgClassName="h-[160px] w-[230px] sm:h-[210px] sm:w-[300px]" />
            <Polaroid src={o.photos[1].src} alt={t(o.photos[1].alt)} rotate={-3} caption="FPTI UPI" className="absolute left-[6%] top-[38%] z-[2]" imgClassName="h-[190px] w-[270px] sm:h-[250px] sm:w-[360px]" />
            <TulipCorner side="right" scale={0.45} className="-bottom-12 right-0 z-10" />
          </div>
        }
      />
      <Container id="roles" className="grid scroll-mt-28 gap-10 py-10 lg:grid-cols-12">
        <Reveal className="flex flex-col gap-4 lg:col-span-5">
          <SerifTitle as="h2" size="md" accent lines={[t(o.rolesTitle[0]), t(o.rolesTitle[1])]} />
          <Body>{t(o.rolesBody)}</Body>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7">
          <ol>
          {o.roles.map((r, i) => (
              <li key={i} className="flex items-start gap-4 border-b border-line py-5">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-surface text-ink">
                  <LineIcon name="role" size={18} />
                </span>
                <div className="flex flex-col gap-1">
                  <p className="text-base font-semibold">{t(r.role)}</p>
                  <p className="text-sm text-muted">{t(r.org)}</p>
                  <p className="text-sm text-muted">{t(r.period)}</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-muted">{t(r.body)}</p>
                </div>
              </li>
          ))}
          </ol>
        </Reveal>
      </Container>
      <FooterCTA />
    </>
  );
}
