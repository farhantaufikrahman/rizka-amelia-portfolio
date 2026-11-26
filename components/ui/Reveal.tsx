'use client';

import { motion, useScroll, useSpring, useTransform, type Variants } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

const ease = [0.22, 0.61, 0.36, 1] as const;

/** How an element arrives when it scrolls into view. Each kind of content gets its own entrance. */
export type RevealKind = 'rise' | 'left' | 'right' | 'bloom' | 'tilt' | 'curtain' | 'blur';

const KINDS: Record<RevealKind, Variants> = {
  // text blocks: rise out of a soft blur
  rise: { hidden: { opacity: 0, y: 28, filter: 'blur(6px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)' } },
  left: { hidden: { opacity: 0, x: -48 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 48 }, show: { opacity: 1, x: 0 } },
  // icons and round things: open like a bud
  bloom: { hidden: { opacity: 0, scale: 0.6, rotate: -14 }, show: { opacity: 1, scale: 1, rotate: 0 } },
  // cards: swing up from a tilt, as if set down on the table
  tilt: { hidden: { opacity: 0, y: 40, rotateX: 28, rotate: -2 }, show: { opacity: 1, y: 0, rotateX: 0, rotate: 0 } },
  // photos: wiped open from the bottom
  curtain: { hidden: { opacity: 0.2, clipPath: 'inset(100% 0% 0% 0% round 24px)' }, show: { opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 24px)' } },
  blur: { hidden: { opacity: 0, filter: 'blur(14px)', scale: 1.04 }, show: { opacity: 1, filter: 'blur(0px)', scale: 1 } },
};

/** Animates its children in when scrolled into view (once). Respects reduced motion via <MotionConfig>. */
export function Reveal({
  children,
  delay = 0,
  className,
  kind = 'rise',
  duration = 0.9,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  kind?: RevealKind;
  duration?: number;
  /** @deprecated kept for older call sites */
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      style={kind === 'tilt' ? { transformPerspective: 900 } : undefined}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={KINDS[kind]}
      transition={{ duration, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Staggers its direct <StaggerItem> children line by line. `inView` waits until scrolled to. */
export function Stagger({ children, className, inView = false, gap = 0.12 }: { children: ReactNode; className?: string; inView?: boolean; gap?: number }) {
  const v = { hidden: {}, show: { transition: { staggerChildren: gap, delayChildren: inView ? 0.05 : 0.55 } } };
  return inView ? (
    <motion.div className={className} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={v}>
      {children}
    </motion.div>
  ) : (
    <motion.div className={className} initial="hidden" animate="show" variants={v}>
      {children}
    </motion.div>
  );
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.85, ease } },
};

export function StaggerItem({ children, className, as = 'div' }: { children: ReactNode; className?: string; as?: 'div' | 'span' | 'li' }) {
  if (as === 'span') {
    return (
      <motion.span className={className ?? 'block'} variants={itemVariants}>
        {children}
      </motion.span>
    );
  }
  if (as === 'li') {
    return (
      <motion.li className={className} variants={itemVariants}>
        {children}
      </motion.li>
    );
  }
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

/** Words of a headline rise one after another (used for the big hero names). */
export function SplitWords({ text, className, delay = 0.6 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(' ');
  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', rotate: 6 }}
            animate={{ y: '0%', rotate: 0 }}
            transition={{ duration: 0.9, ease, delay: delay + i * 0.09 }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Moves its children against the scroll for depth. `speed` is the travel in px across the viewport. */
export function Parallax({ children, speed = 60, className }: { children: ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/** A tulip stem that grows along the top of the window as the page is read. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  const left = useTransform(scaleX, (v) => `${v * 100}%`);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]">
      <motion.div className="h-full origin-left bg-[linear-gradient(90deg,#9CC285,#E48A9A)]" style={{ scaleX }} />
      <motion.svg width="14" height="16" viewBox="0 0 14 16" className="absolute -top-[6px] -ml-[7px]" style={{ left }}>
        <path d="M1 3 C2 8 4 11 7 13 C10 11 12 8 13 3 C12 9 10 12 7 13 C4 12 2 9 1 3 Z M7 0 C5 4 5 9 7 13 C9 9 9 4 7 0 Z" fill="#E48A9A" />
      </motion.svg>
    </div>
  );
}
