'use client';

import Image from 'next/image';
import { useCallback, useState } from 'react';
import { certificatesPage as c } from '@/lib/content';
import { useT } from '@/lib/store';
import { Container, PillLink, cx } from '@/components/ui/primitives';
import { Reveal } from '@/components/ui/Reveal';
import { Polaroid } from '@/components/decor/Decor';
import { TulipCorner } from '@/components/decor/TulipCluster';
import { Lightbox } from '@/components/sections/Gallery';
import SectionHero from '@/components/sections/SectionHero';
import FooterCTA from '@/components/layout/FooterCTA';

export default function CertificatesView() {
  const { t } = useT();
  const [index, setIndex] = useState<number | null>(null);
  const close = useCallback(() => setIndex(null), []);
  const photos = c.items.map((i) => i.photo);

  return (
    <>
      <SectionHero
        eyebrow={t(c.eyebrow)}
        title={[t(c.title[0]), t(c.title[1])]}
        desc={t(c.desc)}
        cta={{ label: t(c.cta), href: '#all' }}
        visualClassName="h-[440px] sm:h-[540px]"
        visual={
          <div className="relative h-full">
            <Polaroid src={c.items[0].photo.src} alt={t(c.items[0].photo.alt)} rotate={-4} caption="BNSP · 2024" className="absolute left-[10%] top-0 z-[1]" imgClassName="h-[250px] w-[180px] sm:h-[290px] sm:w-[210px]" />
            <Polaroid src={c.items[2].photo.src} alt={t(c.items[2].photo.alt)} rotate={5} className="absolute right-[4%] top-[10%] z-[2]" imgClassName="h-[140px] w-[200px] sm:h-[170px] sm:w-[240px]" />
            <Polaroid src={c.items[3].photo.src} alt={t(c.items[3].photo.alt)} rotate={-2} caption="SMAN 1 Subang" className="absolute bottom-[2%] right-[14%] z-[3]" imgClassName="h-[130px] w-[180px] sm:h-[160px] sm:w-[220px]" />
            <TulipCorner side="right" scale={0.42} className="-bottom-12 right-0 z-10" />
          </div>
        }
      />
      <Container id="all" className="scroll-mt-28 pb-6">
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {c.items.map((item, i) => (
            <Reveal key={item.photo.src} delay={i * 0.08}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                className={cx('group flex w-full cursor-zoom-in flex-col gap-3 rounded-[22px] border border-line bg-card p-4 text-left shadow-[var(--shadow-soft)]')}
              >
                <span className="relative mx-auto block h-[200px] w-[150px] overflow-hidden bg-paper shadow-[0_24px_40px_-20px_rgb(91_44_58/0.35)] sm:h-[240px] sm:w-[180px]">
                  <Image src={item.photo.src} alt={t(item.photo.alt)} fill sizes="200px" className="object-contain p-1.5 transition-transform duration-700 group-hover:scale-105" />
                </span>
                <span className="font-serif text-xl italic">{t(item.title)}</span>
                <span className="text-[13px] text-muted">{t(item.meta)}</span>
              </button>
            </Reveal>
          ))}
        </div>
        <div className="mt-8">
          <PillLink href={c.pdf} variant="outline">
            {t(c.openPdf)}
          </PillLink>
        </div>
      </Container>
      <Lightbox photos={photos} index={index} onClose={close} onIndex={setIndex} />
      <FooterCTA />
    </>
  );
}
