'use client';

import { skillsPage } from '@/lib/content';
import { useT } from '@/lib/store';
import { Card, Chip, Container } from '@/components/ui/primitives';
import { Reveal } from '@/components/ui/Reveal';
import { Halo, MaskedImage } from '@/components/decor/Decor';
import { TulipCorner } from '@/components/decor/TulipCluster';
import SectionHero from '@/components/sections/SectionHero';
import FooterCTA from '@/components/layout/FooterCTA';

export default function SkillsView() {
  const { t } = useT();
  return (
    <>
      <SectionHero
        eyebrow={t(skillsPage.eyebrow)}
        title={[t(skillsPage.title[0]), t(skillsPage.title[1])]}
        desc={t(skillsPage.desc)}
        below={
          <div className="mt-2 flex flex-col gap-5">
            {skillsPage.featured.map((g) => (
              <div key={g.name.en} className="flex flex-col gap-2.5">
                <p className="text-sm font-semibold">{t(g.name)}</p>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <Chip key={s.en}>{t(s)}</Chip>
                  ))}
                </div>
              </div>
            ))}
          </div>
        }
        visual={
          <div className="relative mx-auto aspect-square w-full max-w-[480px]">
            <Halo className="inset-0 rounded-full" />
            <MaskedImage src={skillsPage.photo.src} alt={t(skillsPage.photo.alt)} className="absolute inset-[7%] rounded-full" />
            <TulipCorner side="right" scale={0.55} className="-bottom-10 -right-10 z-20" />
          </div>
        }
      />
      <Container className="pb-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skillsPage.more.map((g, i) => (
            <Reveal key={g.name.en} delay={i * 0.08}>
              <Card className="flex h-full flex-col gap-3">
                <h2 className="font-serif text-[26px] italic">{t(g.name)}</h2>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <Chip key={s.en}>{t(s)}</Chip>
                  ))}
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
