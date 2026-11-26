'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

const ease = [0.22, 0.61, 0.36, 1] as const;

/** Fades + rises 16px when scrolled into view (once). Respects reduced motion via <MotionConfig>. */
export function Reveal({
  children,
  delay = 0,
  className,
  y = 16,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Staggers its direct <StaggerItem> children line by line (hero text). */
export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className, as = 'div' }: { children: ReactNode; className?: string; as?: 'div' | 'span' }) {
  const variants = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
  };
  if (as === 'span') {
    return (
      <motion.span className={className ?? 'block'} variants={variants}>
        {children}
      </motion.span>
    );
  }
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
