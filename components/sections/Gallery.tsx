'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { Photo } from '@/lib/content';
import { ui } from '@/lib/i18n';
import { useT } from '@/lib/store';
import { cx } from '@/components/ui/primitives';

/** Full-screen photo viewer: Esc closes, ← / → navigate, body scroll is locked while open. */
export function Lightbox({ photos, index, onClose, onIndex }: { photos: Photo[]; index: number | null; onClose: () => void; onIndex: (i: number) => void }) {
  const { t } = useT();
  const n = photos.length;
  const open = index !== null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onIndex(((index ?? 0) + 1) % n);
      if (e.key === 'ArrowLeft') onIndex(((index ?? 0) - 1 + n) % n);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, index, n, onClose, onIndex]);

  const current = index !== null ? photos[index] : null;

  return (
    <AnimatePresence>
      {current && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={t(current.alt)}
          className="fixed inset-0 z-[70] flex flex-col items-center justify-center gap-4 bg-blush/95 p-4 backdrop-blur-md sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            key={current.src}
            className="relative h-[72vh] w-full max-w-5xl"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={current.src} alt={t(current.alt)} fill sizes="100vw" className="object-contain" />
          </motion.div>
          <p className="font-serif text-xl italic text-ink" onClick={(e) => e.stopPropagation()}>
            {t(current.alt)} <span className="font-sans text-sm not-italic text-muted">· {(index ?? 0) + 1} / {n}</span>
          </p>
          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
            <button type="button" aria-label={t(ui.a11y.prev)} onClick={() => onIndex(((index ?? 0) - 1 + n) % n)} className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink">
              <ChevronLeft size={18} />
            </button>
            <button type="button" aria-label={t(ui.a11y.close)} onClick={onClose} className="flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm text-on-ink">
              <X size={16} /> {t(ui.a11y.close)}
            </button>
            <button type="button" aria-label={t(ui.a11y.next)} onClick={() => onIndex(((index ?? 0) + 1) % n)} className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink">
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
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
  const { t } = useT();
  const [index, setIndex] = useState<number | null>(null);
  const close = useCallback(() => setIndex(null), []);
  const heights = ['h-[340px]', 'h-[260px]', 'h-[300px]', 'h-[380px]', 'h-[240px]', 'h-[320px]'];

  return (
    <>
      <div className={masonry ? 'columns-2 gap-4 md:columns-3 lg:columns-4' : cx('grid gap-3.5', columns)}>
        {photos.map((ph, i) => (
          <motion.button
            key={ph.src + i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`${t(ui.a11y.enlarge)}: ${t(ph.alt)}`}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: (i % 4) * 0.06 }}
            className={cx(
              'group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl shadow-[0_20px_40px_-26px_rgb(91_44_58/0.4)]',
              masonry ? cx('mb-4 break-inside-avoid', heights[i % heights.length]) : itemClassName,
            )}
          >
            <Image
              src={ph.src}
              alt={t(ph.alt)}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-105"
            />
          </motion.button>
        ))}
      </div>
      <Lightbox photos={photos} index={index} onClose={close} onIndex={setIndex} />
    </>
  );
}
