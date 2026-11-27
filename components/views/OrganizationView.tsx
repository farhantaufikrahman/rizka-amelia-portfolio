'use client';

import { motion } from 'framer-motion';
import { organizationPage as o } from '@/lib/content';
import { useT } from '@/lib/store';
import { Body, Card, Container, SerifTitle } from '@/components/ui/primitives';
import { Reveal } from '@/components/ui/Reveal';
import { LineIcon, Polaroid } from '@/components/decor/Decor';
import { Washi } from '@/components/decor/Illustrations';
import { TulipCorner } from '@/components/decor/TulipCluster';
import SectionHero from '@/components/sections/SectionHero';
import FooterCTA from '@/components/layout/FooterCTA';

/** Reference layout: taped polaroid collage hero → "My roles" list with line icons. */
export default function OrganizationView() {
  const { t } = useT();
  return (
    <>
      <SectionHero
        eyebrow={t(o.eyebrow)}
        title={[t(o.title[0]), t(o.title[1])]}
        accent
        desc={t(o.desc)}
        cta={{ label: t(o.cta), href: '#roles' }}
        visualClassName="h-[440px] sm:h-[540px]"
        visual={
          <div className="relative h-full">
            {o.photos.map((ph, i) => (
              <motion.div
                key={ph.src}
                className="absolute"
                style={{ left: i === 0 ? '2%' : '40%', top: i === 0 ? '24%' : '2%', zIndex: i === 0 ? 2 : 1 }}
                initial={{ opacity: 0, scale: 1.3, rotate: i ? 20 : -20 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 80, damping: 13, delay: 0.7 + i * 0.25 }}
              >
                <Washi className="-top-3 left-1/2 z-20 -translate-x-1/2 rotate-3" />
                <Polaroid
                  src={ph.src}
                  alt={t(ph.alt)}
                  rotate={i === 0 ? -5 : 4}
                  drift={i * 2.5}
                  caption={i === 1 ? 'FPTI UPI' : 'HIMAGRIN'}
                  imgClassName={i === 0 ? 'h-[180px] w-[260px] sm:h-[220px] sm:w-[330px]' : 'h-[220px] w-[210px] sm:h-[270px] sm:w-[260px]'}
                />
              </motion.div>
            ))}
            <TulipCorner side="right" scale={0.3} className="-bottom-6 right-0 z-10" gustDelay={1.3} />
          </div>
        }
      />
      <Container id="roles" className="scroll-mt-28 py-10">
        <Reveal className="mb-8 flex flex-col gap-3">
          <SerifTitle as="h2" size="md" accent lines={[t(o.rolesTitle[0]), t(o.rolesTitle[1])]} />
          <Body>{t(o.rolesBody)}</Body>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2">
          {o.roles.map((r, i) => (
            <Reveal key={i} kind="tilt" delay={i * 0.15}>
              <Card className="group flex h-full gap-5 transition-transform duration-500 hover:-translate-y-1">
                <span className="hover-wiggle animate-rise-bob flex h-14 w-14 flex-none items-center justify-center rounded-full border border-line bg-paper/70 text-rose" style={{ animationDelay: `${-i * 1.4}s` }}>
                  <LineIcon name={i === 0 ? 'notebook' : 'people'} size={26} />
                </span>
                <div>
                  <p className="font-serif text-sm italic text-rose">{t(r.period)}</p>
                  <h3 className="mt-1 font-serif text-[28px] italic leading-tight">{t(r.role)}</h3>
                  <p className="mt-1 text-sm font-medium">{t(r.org)}</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{t(r.body)}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
      <FooterCTA />
    </>
  );
}
