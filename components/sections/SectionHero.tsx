'use client';

import type { ReactNode } from 'react';
import { Body, Container, Eyebrow, PillLink, SerifTitle, cx } from '@/components/ui/primitives';
import { Stagger, StaggerItem } from '@/components/ui/Reveal';
import { TulipCorner } from '@/components/decor/TulipCluster';

/**
 * Shared inner-page hero: left = eyebrow + 2-line italic title + description + pill CTA,
 * right = a page-specific visual. Tulips sit in the bottom-left corner.
 */
export default function SectionHero({
  eyebrow,
  title,
  accent = false,
  desc,
  cta,
  visual,
  below,
  visualClassName = 'h-[420px] sm:h-[520px] lg:h-[600px]',
  reverse = false,
  decor,
  tulips = true,
}: {
  eyebrow: string;
  title: [string, string];
  accent?: boolean;
  desc: string;
  cta?: { label: string; href: string };
  visual: ReactNode;
  below?: ReactNode;
  visualClassName?: string;
  /** Put the visual on the left and the text on the right. */
  reverse?: boolean;
  /** Extra page-specific decoration layered behind the hero. */
  decor?: ReactNode;
  /** Show the default bottom corner tulips. */
  tulips?: boolean;
}) {
  return (
    <Container className="grid min-h-[calc(100svh-120px)] items-center gap-10 pb-16 pt-10 lg:grid-cols-12 lg:gap-8 lg:pt-6">
      {tulips && <TulipCorner side={reverse ? 'right' : 'left'} scale={0.62} className={cx('-bottom-24 hidden lg:block', reverse ? '-right-40' : '-left-40')} />}
      {decor}
      <Stagger className={cx('relative z-10 flex flex-col gap-5 lg:col-span-5', reverse && 'lg:order-2')}>
        <StaggerItem>
          <Eyebrow>{eyebrow}</Eyebrow>
        </StaggerItem>
        <StaggerItem>
          <SerifTitle lines={title} accent={accent} />
        </StaggerItem>
        <StaggerItem>
          <Body>{desc}</Body>
        </StaggerItem>
        {cta && (
          <StaggerItem>
            <PillLink href={cta.href}>{cta.label}</PillLink>
          </StaggerItem>
        )}
        {below && <StaggerItem>{below}</StaggerItem>}
      </Stagger>
      <div className={cx('relative z-10 lg:col-span-7', reverse && 'lg:order-1', visualClassName)}>{visual}</div>
    </Container>
  );
}
