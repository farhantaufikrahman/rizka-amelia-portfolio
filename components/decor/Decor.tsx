'use client';

import Image from 'next/image';
import { motion, type MotionStyle } from 'framer-motion';
import { cx } from '@/components/ui/primitives';

const ease = [0.22, 0.61, 0.36, 1] as const;

/** Polaroid: thick white frame, slight tilt; straightens and lifts on hover. */
export function Polaroid({
  src,
  alt,
  rotate = 0,
  caption,
  className,
  style,
  imgClassName = 'h-[150px] w-[200px]',
  priority,
  sizes = '(min-width: 1024px) 360px, 60vw',
  drift = 0,
}: {
  src: string;
  alt: string;
  rotate?: number;
  caption?: string;
  className?: string;
  style?: MotionStyle;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
  /** Idle drift phase in seconds; each polaroid on a page gets a different one so they never move in step. */
  drift?: number;
}) {
  return (
    <motion.figure
      className={cx('animate-drift m-0 bg-paper p-2.5 shadow-[0_24px_40px_-20px_rgb(91_44_58/0.35)]', caption ? 'pb-2' : 'pb-2.5', className)}
      style={{ rotate, animationDelay: `${-drift}s`, animationDuration: `${8 + (drift % 4)}s`, ...style }}
      whileHover={{ rotate: 0, y: -6, zIndex: 20, boxShadow: '0 30px 50px -20px rgba(91,44,58,0.35)' }}
      transition={{ duration: 0.5, ease }}
    >
      <div className={cx('relative overflow-hidden', imgClassName)}>
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" priority={priority} />
      </div>
      {caption && <figcaption className="pt-1.5 text-center font-serif text-base italic text-[#5B2C3A]">{caption}</figcaption>}
    </motion.figure>
  );
}

/** Photo revealed with a soft circular mask; shape set via className (rounded-full, arch, blob). */
export function MaskedImage({
  src,
  alt,
  className,
  objectPosition = '62% 12%',
  priority,
  sizes = '(min-width: 1024px) 560px, 90vw',
}: {
  src: string;
  alt: string;
  className?: string;
  objectPosition?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <motion.div
      // `absolute` callers size it with inset/width/height; otherwise it is a normal relative box.
      // (A hard-coded `relative` here used to override `absolute` and collapse the photo to 0px.)
      className={cx(/\babsolute\b/.test(className ?? '') ? '' : 'relative', 'overflow-hidden shadow-[var(--shadow-photo)]', className)}
      initial={{ clipPath: 'circle(0% at 50% 60%)' }}
      animate={{ clipPath: 'circle(75% at 50% 50%)' }}
      transition={{ duration: 1.6, ease, delay: 0.2 }}
    >
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" style={{ objectPosition }} />
    </motion.div>
  );
}

/** Soft pink halo behind portraits. */
export function Halo({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cx('animate-breathe absolute bg-[radial-gradient(circle_at_40%_30%,#FFFFFF,#F6E1DF_60%,#F0C8CC)] dark:bg-[radial-gradient(circle_at_40%_30%,#4A2F38,#2B1D23_65%,#1E1418)]', className)}
    />
  );
}

/** Circular text badge that slowly rotates. */
export function RotatingBadge({ text, className }: { text: string; className?: string }) {
  return (
    <div className={cx('rounded-full bg-paper/90 shadow-[0_16px_30px_-16px_rgb(91_44_58/0.3)]', className)}>
      <svg viewBox="0 0 136 136" className="animate-spin-slow h-full w-full" aria-hidden>
        <defs>
          <path id="badge-ring" d="M68 68 m-48 0 a48 48 0 1 1 96 0 a48 48 0 1 1 -96 0" />
        </defs>
        <text fontFamily="var(--font-cormorant), serif" fontStyle="italic" fontSize="14" letterSpacing="2" fill="#5B2C3A">
          <textPath href="#badge-ring">{text}</textPath>
        </text>
        <path d="M68 86 C68 80 68 76 68 71 M61 64 C60 57 64 52 68 51 C72 52 76 57 75 64 C73 67 63 67 61 64Z" stroke="#E48A9A" strokeWidth="1.5" fill="#FBEFED" />
      </svg>
    </div>
  );
}

/** Thin line icons used across pages (stroke follows currentColor). */
export function LineIcon({ name, size = 28, className }: { name: keyof typeof ICONS; size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      {ICONS[name]}
    </svg>
  );
}

const ICONS = {
  heart: <path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z" />,
  star: <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" />,
  gem: (
    <>
      <path d="M6 3h12l4 6-10 12L2 9z" />
      <path d="M2 9h20M12 21L8 9l4-6 4 6z" />
    </>
  ),
  tulip: <path d="M12 21v-8M12 18c-3-1-4-3-4-5M7 4c1 3 3 5 5 6 2-1 4-3 5-6-1 4-2 6-5 7-3-1-4-3-5-7zM12 2c-1.5 2-1.5 5 0 8 1.5-3 1.5-6 0-8z" />,
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M8 10v6M8 7v.5M12 16v-6M12 12.5a2.5 2.5 0 015 0V16" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5v.5" />
    </>
  ),
  role: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20a7 7 0 0114 0" />
    </>
  ),
  mic: (
    <>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5.5 11a6.5 6.5 0 0013 0M12 17.5V21M9 21h6" />
    </>
  ),
  brush: (
    <>
      <path d="M14 4l6 6-7.5 7.5-6-6z" />
      <path d="M6.5 11.5C4 12 3 14 3.5 17c-.3 1.6-1 2.6-1.5 3 3.5.5 6.5-.5 8-3.5" />
    </>
  ),
  laptop: (
    <>
      <rect x="4" y="5" width="16" height="11" rx="1.5" />
      <path d="M2 19h20" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5z" />
    </>
  ),
  file: (
    <>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v4h4M9 12h6M9 16h6" />
    </>
  ),
  flask: <path d="M9 3h6M10 3v6L4.5 19a1.5 1.5 0 001.3 2h12.4a1.5 1.5 0 001.3-2L14 9V3M7 15h10" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" />
    </>
  ),
  cap: (
    <>
      <path d="M2 9l10-5 10 5-10 5z" />
      <path d="M6 11v5c3 2 9 2 12 0v-5M22 9v6" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9" r="2.3" />
      <path d="M3 20a6 6 0 0112 0M15 14.5a5 5 0 016 5.5" />
    </>
  ),
  notebook: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1.5" />
      <path d="M9 3v18M12 8h4M12 12h4" />
    </>
  ),
};
