'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { experiencePage, experiences } from '@/lib/content';
import { useT } from '@/lib/store';
import { ArrowCircle, Container, cx } from '@/components/ui/primitives';
import { Polaroid } from '@/components/decor/Decor';
import { TulipCorner } from '@/components/decor/TulipCluster';
import SectionHero from '@/components/sections/SectionHero';
import FooterCTA from '@/components/layout/FooterCTA';

const ease = [0.22, 0.61, 0.36, 1] as const;

const COLLAGE = [
  { i: 0, rot: -4, cls: 'left-[4%] top-[2%] z-[3]', img: 'h-[190px] w-[150px] sm:h-[250px] sm:w-[200px]' },
  { i: 1, rot: 5, cls: 'left-[44%] top-0 z-[2]', img: 'h-[170px] w-[130px] sm:h-[220px] sm:w-[170px]' },
  { i: 2, rot: -3, cls: 'left-[30%] top-[48%] z-[4]', img: 'h-[130px] w-[150px] sm:h-[170px] sm:w-[200px]' },
  { i: 3, rot: 6, cls: 'right-[2%] top-[38%] z-[1]', img: 'h-[150px] w-[110px] sm:h-[200px] sm:w-[140px]' },
];

/** Reference layout: polaroid collage hero → list of role cards (thumbnail, title, summary, arrow). */
export default function ExperienceView() {
  const { t } = useT();

  return (
    <>
      <SectionHero
        reverse
        eyebrow={t(experiencePage.eyebrow)}
        title={[t(experiencePage.title[0]), t(experiencePage.title[1])]}
        accent
        desc={t(experiencePage.desc)}
        cta={{ label: t(experiencePage.cta), href: '#roles' }}
        visualClassName="h-[420px] sm:h-[540px]"
        visual={
          <div className="relative h-full">
            {COLLAGE.map((c) => {
              const e = experiences[c.i];
              return (
                <motion.div
                  key={e.slug}
                  className={cx('absolute', c.cls)}
                  initial={{ opacity: 0, y: -80, rotate: c.rot * 4 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 90, damping: 14, delay: 0.7 + c.i * 0.15 }}
                >
                  <Polaroid src={e.cover.src} alt={t(e.cover.alt)} rotate={c.rot} drift={c.i * 1.7} imgClassName={c.img} />
                </motion.div>
              );
            })}
            <TulipCorner side="right" scale={0.3} className="-bottom-6 right-0 z-10" gustDelay={1.4} />
          </div>
        }
      />

      <Container id="roles" className="scroll-mt-28 pb-8">
        <ul className="mx-auto flex max-w-[920px] flex-col gap-5">
          {experiences.map((e, i) => (
            <motion.li
              key={e.slug}
              initial={{ opacity: 0, x: i % 2 ? 70 : -70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, ease }}
            >
              <Link
                href={`/experience/${e.slug}`}
                className="group grid grid-cols-[96px_1fr_auto] items-center gap-4 rounded-[22px] border border-white/70 bg-card p-3 pr-5 shadow-[var(--shadow-soft)] backdrop-blur-md transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-photo)] dark:border-white/10 sm:grid-cols-[180px_1fr_auto] sm:gap-6"
              >
                <span className="relative block h-[96px] overflow-hidden rounded-2xl sm:h-[120px]">
                  <Image
                    src={e.cover.src}
                    alt={t(e.cover.alt)}
                    fill
                    sizes="180px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    style={e.cover.pos ? { objectPosition: e.cover.pos } : undefined}
                  />
                </span>
                <span className="flex flex-col gap-1">
                  <span className="text-[12px] text-muted">
                    {t(e.period)} · {t(e.type)}
                  </span>
                  <span className="font-serif text-2xl italic leading-tight text-ink transition-colors group-hover:text-rose sm:text-[28px]">{t(e.role)}</span>
                  <span className="hidden text-sm leading-relaxed text-muted sm:block">{t(e.summary)}</span>
                  {e.focus && (
                    <span className="mt-1 hidden flex-wrap gap-1.5 sm:flex">
                      {e.focus.map((f) => (
                        <span key={f.en} className="rounded-full border border-rose/30 bg-rose/10 px-2.5 py-0.5 text-[11px] font-medium text-ink">
                          {t(f)}
                        </span>
                      ))}
                    </span>
                  )}
                </span>
                <ArrowCircle />
              </Link>
            </motion.li>
          ))}
        </ul>
      </Container>

      <FooterCTA />
    </>
  );
}
