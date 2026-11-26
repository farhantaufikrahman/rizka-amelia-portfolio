'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { Photo } from '@/lib/content';
import type { L } from '@/lib/i18n';
import { ui } from '@/lib/i18n';
import { useT } from '@/lib/store';
import { cx } from '@/components/ui/primitives';

const ease = [0.22, 0.61, 0.36, 1] as const;

/**
 * Full-screen photo viewer: Esc closes, ← / → navigate, body scroll is locked while open.
 * Rendered into <body> so animated (transformed/filtered) ancestors cannot trap it.
 */
export function Lightbox({ photos, index, onClose, onIndex }: { photos: Photo[]; index: number | null; onClose: () => void; onIndex: (i: number) => void }) {
  const { t } = useT();
  const n = photos.length;
  const open = index !== null;
  const [mounted, setMounted] = useState(false);
  const [dir, setDir] = useState(1);

  useEffect(() => setMounted(true), []);

  const go = useCallback(
    (step: number) => {
      setDir(step);
      onIndex(((index ?? 0) + step + n) % n);
    },
    [index, n, onIndex],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, go, onClose]);

  const current = index !== null ? photos[index] : null;
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {current && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={t(current.alt)}
          className="fixed inset-0 z-[95] flex flex-col items-center justify-center gap-4 bg-blush/95 p-4 backdrop-blur-md sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="relative h-[72vh] w-full max-w-5xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.div
                key={current.src}
                custom={dir}
                className="absolute inset-0"
                initial={{ opacity: 0, x: dir * 80, rotate: dir * 2 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                exit={{ opacity: 0, x: dir * -80, rotate: dir * -2 }}
                transition={{ duration: 0.45, ease }}
              >
                <Image src={current.src} alt={t(current.alt)} fill sizes="100vw" className="object-contain" />
              </motion.div>
            </AnimatePresence>
          </div>
          <p className="text-center font-serif text-xl italic text-ink" onClick={(e) => e.stopPropagation()}>
            {t(current.alt)} <span className="font-sans text-sm not-italic text-muted">· {(index ?? 0) + 1} / {n}</span>
          </p>
          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
            <button type="button" aria-label={t(ui.a11y.prev)} onClick={() => go(-1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink hover:border-rose hover:text-rose">
              <ChevronLeft size={18} />
            </button>
            <button type="button" aria-label={t(ui.a11y.close)} onClick={onClose} className="flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm text-on-ink">
              <X size={16} /> {t(ui.a11y.close)}
            </button>
            <button type="button" aria-label={t(ui.a11y.next)} onClick={() => go(1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink hover:border-rose hover:text-rose">
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

/** One photo tile: wiped open on scroll, then drifts in a slow Ken Burns zoom; lifts on hover. */
export function PhotoTile({
  photo,
  onOpen,
  className,
  index = 0,
  sizes = '(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw',
  label,
}: {
  photo: Photo;
  onOpen?: () => void;
  className?: string;
  index?: number;
  sizes?: string;
  label?: string;
}) {
  const { t } = useT();
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      aria-label={`${t(ui.a11y.enlarge)}: ${t(photo.alt)}`}
      initial={{ clipPath: 'inset(100% 0% 0% 0% round 18px)', y: 30 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 18px)', y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 1, ease, delay: (index % 4) * 0.1 }}
      whileHover={{ y: -6 }}
      className={cx('group relative block w-full cursor-zoom-in overflow-hidden rounded-[18px] shadow-[0_20px_40px_-26px_rgb(91_44_58/0.45)]', className)}
    >
      <span className="animate-ken-burns absolute inset-0 block" style={{ animationDelay: `${-index * 3.1}s`, animationDuration: `${16 + (index % 3) * 3}s` }}>
        <Image src={photo.src} alt={t(photo.alt)} fill sizes={sizes} className="object-cover" style={photo.pos ? { objectPosition: photo.pos } : undefined} />
      </span>
      <span className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(91,44,58,0.55))] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <span className="absolute inset-x-3 bottom-3 translate-y-3 text-left font-serif text-lg italic leading-tight text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        {label ?? t(photo.alt)}
      </span>
    </motion.button>
  );
}

/** Grid (or masonry) of photos that open in the lightbox. */
export function PhotoGrid({
  photos,
  columns = 'grid-cols-2 md:grid-cols-3',
  itemClassName = 'h-[220px] md:h-[300px]',
  masonry = false,
}: {
  photos: Photo[];
  columns?: string;
  itemClassName?: string;
  masonry?: boolean;
}) {
  const [index, setIndex] = useState<number | null>(null);
  const close = useCallback(() => setIndex(null), []);
  const heights = ['h-[340px]', 'h-[260px]', 'h-[300px]', 'h-[380px]', 'h-[240px]', 'h-[320px]'];

  return (
    <>
      <div className={masonry ? 'columns-2 gap-4 md:columns-3' : cx('grid gap-3.5', columns)}>
        {photos.map((ph, i) => (
          <PhotoTile
            key={ph.src + i}
            photo={ph}
            index={i}
            onOpen={() => setIndex(i)}
            className={masonry ? cx('mb-4 break-inside-avoid', heights[i % heights.length]) : itemClassName}
          />
        ))}
      </div>
      <Lightbox photos={photos} index={index} onClose={close} onIndex={setIndex} />
    </>
  );
}

/**
 * Several near-identical frames shown as ONE stack of prints instead of a wall of look-alikes.
 * The top print cross-fades to the next on its own (each stack on its own clock), and the
 * prints underneath fan out on hover. Clicking opens the whole look in the lightbox.
 */
export function LookStack({
  title,
  note,
  photos,
  index = 0,
  className,
}: {
  title: L;
  note: L;
  photos: Photo[];
  index?: number;
  className?: string;
}) {
  const { t, lang } = useT();
  const [top, setTop] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const [hover, setHover] = useState(false);
  const close = useCallback(() => setOpen(null), []);
  const n = photos.length;

  useEffect(() => {
    if (n < 2 || hover) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setTop((v) => (v + 1) % n), 3200 + index * 450);
    return () => window.clearInterval(id);
  }, [n, hover, index]);

  const order = Array.from({ length: n }, (_, k) => (top + k) % n);
  const fan = [0, -7, 6];

  return (
    <motion.figure
      className={cx('m-0 flex flex-col items-center', className)}
      initial={{ opacity: 0, y: 50, rotate: index % 2 ? 4 : -4 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease, delay: (index % 3) * 0.12 }}
    >
      <button
        type="button"
        onClick={() => setOpen(top)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        aria-label={`${t(ui.a11y.enlarge)}: ${t(title)} (${n} ${t(ui.common.photos)})`}
        className="relative aspect-[3/4] w-full max-w-[300px] cursor-zoom-in"
      >
        {order
          .slice()
          .reverse()
          .map((pi) => {
            const depth = order.indexOf(pi);
            const ph = photos[pi];
            return (
              <motion.span
                key={ph.src}
                className="absolute inset-0 block bg-paper p-2.5 pb-8 shadow-[0_24px_40px_-22px_rgb(91_44_58/0.45)]"
                animate={{
                  rotate: hover ? fan[depth] ?? 0 : depth === 0 ? 0 : (depth % 2 ? -3 : 3) * depth,
                  x: hover ? (depth === 0 ? 0 : depth % 2 ? -46 : 46) : depth * 3,
                  y: hover ? depth * -4 : depth * -5,
                  scale: 1 - depth * 0.03,
                  opacity: depth > 2 ? 0 : 1,
                }}
                transition={{ type: 'spring', stiffness: 160, damping: 20 }}
                style={{ zIndex: n - depth }}
              >
                <span className="relative block h-full w-full overflow-hidden">
                  <Image src={ph.src} alt={depth === 0 ? t(ph.alt) : ''} fill sizes="300px" className="object-cover" style={ph.pos ? { objectPosition: ph.pos } : undefined} />
                </span>
              </motion.span>
            );
          })}
        {n > 1 && (
          <span className="absolute -right-2 -top-2 z-20 flex h-8 min-w-8 items-center justify-center rounded-full bg-rose px-2 text-xs font-semibold text-white shadow-[var(--shadow-soft)]">
            {n}
          </span>
        )}
      </button>
      <figcaption className="mt-5 text-center">
        <span className="block font-serif text-2xl italic text-ink">{t(title)}</span>
        <span className="mt-0.5 block text-[13px] text-muted">{t(note)}</span>
        {n > 1 && (
          <span aria-hidden className="mt-2 flex justify-center gap-1.5">
            {photos.map((_, k) => (
              <span key={k + lang} className={cx('h-1.5 rounded-full transition-all duration-500', k === top ? 'w-5 bg-rose' : 'w-1.5 bg-line')} />
            ))}
          </span>
        )}
      </figcaption>
      <Lightbox photos={photos} index={open} onClose={close} onIndex={setOpen} />
    </motion.figure>
  );
}
