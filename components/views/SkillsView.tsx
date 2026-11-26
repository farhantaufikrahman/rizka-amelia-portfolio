'use client';

import { skillsPage } from '@/lib/content';
import { useT } from '@/lib/store';
import { Chip, Container } from '@/components/ui/primitives';
import { Reveal } from '@/components/ui/Reveal';
import { Halo, MaskedImage } from '@/components/decor/Decor';
import { SeedPacket } from '@/components/decor/Illustrations';
import { TulipCorner } from '@/components/decor/TulipCluster';
import SectionHero from '@/components/sections/SectionHero';
import FooterCTA from '@/components/layout/FooterCTA';

const TINTS = ['#F3B3BE', '#F6C7A7', '#D9C6F0', '#BFD6F2', '#E48A9A', '#F7DC94', '#C8E3B4'];

/** Concept: a garden shop — every skill group is a packet of seeds. */
export default function SkillsView() {
  const { t } = useT();
  const groups = [...skillsPage.featured, ...skillsPage.more];

  return (
    <>
      <SectionHero
        eyebrow={t(skillsPage.eyebrow)}
        title={[t(skillsPage.title[0]), t(skillsPage.title[1])]}
        desc={t(skillsPage.desc)}
        cta={{ label: t({ en: 'Explore Skills', id: 'Lihat Keahlian' }), href: '#packets' }}
        visual={
          <div className="relative mx-auto aspect-square w-full max-w-[480px]">
            <Halo className="inset-0 rounded-full" />
            <MaskedImage src={skillsPage.photo.src} alt={t(skillsPage.photo.alt)} className="absolute inset-[7%] rounded-full" />
            <TulipCorner side="right" scale={0.55} className="-bottom-10 -right-10 z-20" />
          </div>
        }
      />
      <Container id="packets" className="scroll-mt-28 pb-6">
        <div className="grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((g, i) => (
            <Reveal key={g.name.en} delay={(i % 4) * 0.08} className={i % 2 ? 'lg:mt-10' : undefined}>
              <SeedPacket title={t(g.name)} tint={TINTS[i % TINTS.length]}>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <Chip key={s.en}>{t(s)}</Chip>
                  ))}
                </div>
              </SeedPacket>
            </Reveal>
          ))}
        </div>
      </Container>
      <FooterCTA />
    </>
  );
}
