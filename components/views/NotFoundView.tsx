'use client';

import { notFoundPage as nf } from '@/lib/content';
import { useT } from '@/lib/store';
import { PillLink } from '@/components/ui/primitives';
import { Stagger, StaggerItem } from '@/components/ui/Reveal';
import { TulipCorner } from '@/components/decor/TulipCluster';

export default function NotFoundView() {
  const { t } = useT();
  return (
    <section className="relative flex min-h-[calc(100svh-100px)] items-end justify-center overflow-hidden px-5 pt-10">
      <TulipCorner side="left" scale={0.62} className="-left-10 hidden md:block" />
      <TulipCorner side="right" scale={0.62} className="-right-10 hidden md:block" />
      <div className="relative flex h-[600px] w-full max-w-[460px] flex-col items-center justify-center gap-3.5 rounded-t-[230px] bg-gradient-to-b from-card to-surface p-10 text-center shadow-[inset_0_0_0_1px_var(--color-line),var(--shadow-photo)]">
        <div aria-hidden className="absolute top-10 h-[220px] w-[280px] rounded-t-[140px] bg-gradient-to-b from-blush to-surface shadow-[inset_0_0_0_1px_var(--color-line)]" />
        <Stagger className="relative mt-32 flex flex-col items-center gap-3.5">
          <StaggerItem>
            <p className="font-serif text-[120px] italic leading-none text-rose">404</p>
          </StaggerItem>
          <StaggerItem>
            <h1 className="font-serif text-3xl italic">{t(nf.title)}</h1>
          </StaggerItem>
          <StaggerItem>
            <p className="max-w-[30ch] text-sm leading-relaxed text-muted">{t(nf.body)}</p>
          </StaggerItem>
          <StaggerItem>
            <PillLink href="/">{t(nf.cta)}</PillLink>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
