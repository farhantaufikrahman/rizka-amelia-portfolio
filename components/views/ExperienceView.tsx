'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { experiencePage as ep, experiences, organizationPage, type Logo, type Photo } from '@/lib/content';
import type { L } from '@/lib/i18n';
import { useT } from '@/lib/store';
import { ArrowCircle, Container, cx } from '@/components/ui/primitives';
import { Reveal } from '@/components/ui/Reveal';
import { OrgLogo, Polaroid } from '@/components/decor/Decor';
import { TulipCorner } from '@/components/decor/TulipCluster';
import SectionHero from '@/components/sections/SectionHero';
import FooterCTA from '@/components/layout/FooterCTA';

const ease = [0.22, 0.61, 0.36, 1] as const;

const COLLAGE = [
  { rot: -4, cls: 'left-[4%] top-[2%] z-[3]', img: 'h-[190px] w-[150px] sm:h-[250px] sm:w-[200px]' },
  { rot: 5, cls: 'left-[44%] top-0 z-[2]', img: 'h-[170px] w-[130px] sm:h-[220px] sm:w-[170px]' },
  { rot: -3, cls: 'left-[30%] top-[48%] z-[4]', img: 'h-[130px] w-[150px] sm:h-[170px] sm:w-[200px]' },
  { rot: 6, cls: 'right-[2%] top-[38%] z-[1]', img: 'h-[150px] w-[110px] sm:h-[200px] sm:w-[140px]' },
];

type Row = {
  href: string;
  cover: Photo;
  logo?: Logo | null;
  meta: string;
  title: L;
  summary: L;
  chips?: L[];
  chipsLabel?: L;
};

function RoleCard({ row, i }: { row: Row; i: number }) {
  const { t } = useT();
  return (
    <motion.li
      initial={{ opacity: 0, x: i % 2 ? 70 : -70 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease }}
    >
      <Link
        href={row.href}
        className="group grid grid-cols-[96px_1fr_auto] items-center gap-4 rounded-[22px] border border-white/70 bg-card p-3 pr-5 shadow-[var(--shadow-soft)] backdrop-blur-md transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-photo)] dark:border-white/10 sm:grid-cols-[180px_1fr_auto] sm:gap-6"
      >
        <span className="relative block h-[96px] overflow-hidden rounded-2xl sm:h-[120px]">
          <Image
            src={row.cover.src}
            alt={t(row.cover.alt)}
            fill
            sizes="180px"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            style={row.cover.pos ? { objectPosition: row.cover.pos } : undefined}
          />
        </span>
        <span className="flex flex-col gap-1">
          <span className="flex items-center gap-2 text-[12px] text-muted">
            {row.logo && <OrgLogo logo={row.logo} size={36} className="m-1" />}
            <span>{row.meta}</span>
          </span>
          <span className="font-serif text-2xl italic leading-tight text-ink transition-colors group-hover:text-rose sm:text-[28px]">{t(row.title)}</span>
          <span className="hidden text-sm leading-relaxed text-muted sm:block">{t(row.summary)}</span>
          {row.chips && (
            <span className="mt-1 hidden flex-wrap items-center gap-1.5 sm:flex">
              {row.chipsLabel && <span className="mr-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">{t(row.chipsLabel)}:</span>}
              {row.chips.map((f) => (
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
  );
}

function Section({ id, title, sub, rows, index }: { id: string; title: L; sub: L; rows: Row[]; index: number }) {
  const { t } = useT();
  return (
    <section id={id} className="mx-auto max-w-[920px] scroll-mt-28">
      <Reveal className="mb-5 flex items-end gap-4">
        <span aria-hidden className="font-serif text-5xl italic leading-none text-rose/40">0{index}</span>
        <div>
          <h2 className="font-serif text-[clamp(1.7rem,3vw,2.3rem)] italic leading-tight">{t(title)}</h2>
          <p className="mt-1 text-sm text-muted">{t(sub)}</p>
        </div>
      </Reveal>
      <ul className="flex flex-col gap-5">
        {rows.map((r, i) => (
          <RoleCard key={r.href + i} row={r} i={i} />
        ))}
      </ul>
    </section>
  );
}

/** Polaroid collage hero → Professional, then Organizational, then Freelance & Creative. */
export default function ExperienceView() {
  const { t } = useT();
  const fromExperience = (e: (typeof experiences)[number]): Row => ({
    href: `/experience/${e.slug}`,
    cover: e.cover,
    logo: e.logo,
    meta: `${t(e.org).split(' · ').find((s) => s !== t(e.type))} · ${t(e.period)} · ${t(e.type)}`,
    title: e.role,
    summary: e.summary,
    chips: e.group === 'creative' ? e.skillsShown : e.focus,
    chipsLabel: e.group === 'creative' ? ep.skillsShownLabel : undefined,
  });

  const professional = experiences.filter((e) => e.group === 'professional').map(fromExperience);
  const organizational: Row[] = organizationPage.roles.map((r) => ({
    href: '/organization',
    cover: r.photo,
    logo: null,
    meta: `${t(r.org)} · ${t(r.period)}`,
    title: r.role,
    summary: r.body,
    chips: r.tags,
  }));
  const creative: Row[] = [
    ...experiences.filter((e) => e.group === 'creative').map(fromExperience),
    {
      href: ep.speaking.href,
      cover: ep.speaking.cover,
      meta: t(ep.speaking.meta),
      title: ep.speaking.title,
      summary: ep.speaking.summary,
      chips: ep.speaking.skillsShown,
      chipsLabel: ep.skillsShownLabel,
    },
  ];

  return (
    <>
      <SectionHero
        reverse
        eyebrow={t(ep.eyebrow)}
        title={[t(ep.title[0]), t(ep.title[1])]}
        accent
        desc={t(ep.desc)}
        cta={{ label: t(ep.cta), href: '#professional' }}
        visualClassName="h-[420px] sm:h-[540px]"
        visual={
          <div className="relative h-full">
            {COLLAGE.map((c, i) => {
              const ph = ep.collage[i];
              return (
                <motion.div
                  key={ph.src}
                  className={cx('absolute', c.cls)}
                  initial={{ opacity: 0, y: -80, rotate: c.rot * 4 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 90, damping: 14, delay: 0.7 + i * 0.15 }}
                >
                  <Polaroid src={ph.src} alt={t(ph.alt)} rotate={c.rot} drift={i * 1.7} imgClassName={c.img} />
                </motion.div>
              );
            })}
            <TulipCorner side="right" scale={0.3} className="-bottom-6 right-0 z-10" gustDelay={1.4} />
          </div>
        }
      />

      <Container className="flex flex-col gap-16 pb-8">
        <Section id="professional" index={1} title={ep.sections.professional.title} sub={ep.sections.professional.sub} rows={professional} />
        <Section id="organizational" index={2} title={ep.sections.organizational.title} sub={ep.sections.organizational.sub} rows={organizational} />
        <Section id="creative" index={3} title={ep.sections.creative.title} sub={ep.sections.creative.sub} rows={creative} />
      </Container>

      <FooterCTA />
    </>
  );
}
