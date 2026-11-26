'use client';

import { motion } from 'framer-motion';
import { skillsPage } from '@/lib/content';
import { useT } from '@/lib/store';
import { Chip, Container } from '@/components/ui/primitives';
import { Halo, LineIcon } from '@/components/decor/Decor';
import { TulipCorner } from '@/components/decor/TulipCluster';
import SectionHero from '@/components/sections/SectionHero';
import FooterCTA from '@/components/layout/FooterCTA';

const ease = [0.22, 0.61, 0.36, 1] as const;
type Icon = 'mic' | 'brush' | 'laptop' | 'compass' | 'file' | 'flask' | 'globe';

/** Reference layout: one row per skill group — line icon, group name, chips. */
export default function SkillsView() {
  const { t } = useT();
  const groups = [...skillsPage.featured, ...skillsPage.more];

  return (
    <>
      <SectionHero
        eyebrow={t(skillsPage.eyebrow)}
        title={[t(skillsPage.title[0]), t(skillsPage.title[1])]}
        accent
        desc={t(skillsPage.desc)}
        cta={{ label: t({ en: 'Explore Skills', id: 'Lihat Keahlian' }), href: '#list' }}
        visual={
          <div className="relative mx-auto aspect-square w-full max-w-[460px]">
            <Halo className="inset-[6%] rounded-full" />
            <svg aria-hidden viewBox="0 0 100 100" className="animate-spin-slow absolute inset-0 h-full w-full" style={{ animationDuration: '60s' }}>
              <circle cx="50" cy="50" r="46" stroke="var(--color-rose)" strokeOpacity="0.4" strokeWidth="0.3" strokeDasharray="1 2" fill="none" />
            </svg>
            {/* each skill icon circles the garden on its own orbit */}
            {groups.map((g, i) => (
              <div key={g.name.en} aria-hidden className="absolute left-1/2 top-1/2 h-0 w-0" style={{ ['--orbit' as string]: `${150 + (i % 3) * 30}px` }}>
                <span
                  className="animate-orbit absolute -ml-6 -mt-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/80 bg-card text-rose shadow-[var(--shadow-soft)] backdrop-blur-sm"
                  style={{ animationDuration: `${26 + (i % 3) * 8}s`, animationDelay: `${-(i / groups.length) * 30}s` }}
                >
                  <LineIcon name={(g as { icon: Icon }).icon} size={20} />
                </span>
              </div>
            ))}
            <TulipCorner side="left" scale={0.62} className="bottom-[8%] left-[18%] z-10" gustDelay={0.8} />
          </div>
        }
      />
      <Container id="list" className="scroll-mt-28 pb-6">
        <ul className="mx-auto flex max-w-[900px] flex-col divide-y divide-line rounded-[26px] border border-white/70 bg-card px-5 shadow-[var(--shadow-soft)] backdrop-blur-md dark:border-white/10 sm:px-8">
          {groups.map((g, i) => (
            <motion.li
              key={g.name.en}
              className="group grid grid-cols-[52px_1fr] items-start gap-4 py-6 sm:grid-cols-[52px_220px_1fr] sm:items-center"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, ease, delay: 0.05 }}
            >
              <span className="hover-wiggle flex h-12 w-12 items-center justify-center rounded-2xl bg-surface text-rose transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
                <LineIcon name={(g as { icon: Icon }).icon} size={24} />
              </span>
              <h2 className="font-serif text-2xl italic text-ink">{t(g.name)}</h2>
              <motion.div
                className="col-span-2 flex flex-wrap gap-2 sm:col-span-1"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.2 + i * 0.02 } } }}
              >
                {g.items.map((s) => (
                  <motion.span key={s.en} variants={{ hidden: { opacity: 0, scale: 0.6, y: 8 }, show: { opacity: 1, scale: 1, y: 0 } }} transition={{ type: 'spring', stiffness: 260, damping: 18 }}>
                    <Chip>{t(s)}</Chip>
                  </motion.span>
                ))}
              </motion.div>
            </motion.li>
          ))}
        </ul>
      </Container>
      <FooterCTA />
    </>
  );
}
