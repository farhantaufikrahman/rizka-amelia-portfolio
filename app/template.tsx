'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';

const ease = [0.76, 0, 0.24, 1] as const;

/**
 * Page transition, replayed on every route change (a template re-mounts per route):
 * a blush veil with a blooming tulip rises off the screen like a curtain with a petal-shaped
 * hem, while the new page comes into focus underneath.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[90] flex items-center justify-center"
        initial={{ y: '0%' }}
        animate={{ y: '-112%' }}
        transition={{ duration: 0.9, ease, delay: 0.25 }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(160deg,#FBEFED,#F6D6DA_55%,#F0BCC5)] dark:bg-[linear-gradient(160deg,#2B1D23,#3A2530_60%,#4A2F3A)]" />
        {/* petal-shaped hem */}
        <svg className="absolute left-0 top-full h-[12vh] w-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path
            d="M0 0 H1440 V40 C1380 110 1300 110 1240 50 C1180 110 1100 110 1040 50 C980 110 900 110 840 50 C780 110 700 110 640 50 C580 110 500 110 440 50 C380 110 300 110 240 50 C180 110 100 110 40 50 C20 70 8 70 0 60 Z"
            className="fill-[#F0BCC5] dark:fill-[#4A2F3A]"
          />
        </svg>
        <motion.svg
          width="64"
          height="80"
          viewBox="0 0 24 30"
          className="relative"
          initial={{ scale: 0.6, opacity: 0, rotate: -12 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <path d="M12 29 C12 23 12 18 12 13" stroke="#6E9B5A" strokeWidth="1.2" fill="none" />
          <path d="M12 25 C7 23 5 19 6 15 C8 19 10 21 12 22" stroke="#6E9B5A" strokeWidth="1.1" fill="#9CC285" />
          <path d="M6 6 C8 9 10 12 12 14 C14 12 16 9 18 6 C17 11 15 13 12 14 C9 13 7 11 6 6 Z M12 3 C10 6 10 10 12 14 C14 10 14 6 12 3 Z" stroke="#E48A9A" strokeWidth="1" fill="#F6C2CA" />
        </motion.svg>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.985, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1], delay: 0.45 }}
        // A leftover filter/transform would turn this into the containing block for `position: fixed`
        // children (lightbox, dialogs), so clear both once the entrance is done.
        onAnimationComplete={() => {
          if (ref.current) {
            ref.current.style.filter = 'none';
            ref.current.style.transform = 'none';
          }
        }}
        ref={ref}
      >
        {children}
      </motion.div>
    </>
  );
}
