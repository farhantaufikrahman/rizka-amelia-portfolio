'use client';

import { useId } from 'react';
import { cx } from '@/components/ui/primitives';

/**
 * Watercolor-style tulip cluster drawn in SVG (520 × 640 box).
 *
 * Want hand-painted PNG tulips instead? Put transparent PNGs in /public/images/tulips/
 * and pass `src="/images/tulips/corner-left.png"` — the SVG is skipped.
 */
type Props = { side?: 'left' | 'right'; className?: string; src?: string };

const SPEC = [
  { x: 10, L: 330, s: 0.95, rot: -10 },
  { x: 110, L: 420, s: 1.08, rot: -3 },
  { x: 210, L: 300, s: 0.9, rot: 7 },
  { x: -30, L: 200, s: 0.8, rot: -18 },
  { x: 290, L: 210, s: 0.72, rot: 15, bud: true },
  { x: 160, L: 170, s: 0.78, rot: 3 },
  { x: 60, L: 120, s: 0.62, rot: -6, bud: true },
];

export function TulipCluster({ side = 'left', className, src }: Props) {
  const uid = useId().replace(/:/g, '');
  const id = (n: string) => `${uid}-${n}`;
  const url = (n: string) => `url(#${id(n)})`;

  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt="" aria-hidden className={cx('pointer-events-none select-none', className)} />;
  }

  return (
    <div
      aria-hidden
      className={cx('pointer-events-none relative h-[640px] w-[520px] select-none', className)}
      style={{ transform: side === 'right' ? 'scaleX(-1)' : undefined }}
    >
      <svg width="0" height="0" className="absolute">
        <defs>
          <radialGradient id={id('p1')} cx="0.5" cy="0.15" r="0.95">
            <stop offset="0" stopColor="#FDE9EC" />
            <stop offset="0.55" stopColor="#F3B3BE" />
            <stop offset="1" stopColor="#E48A9A" />
          </radialGradient>
          <linearGradient id={id('p2')} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FFF4F5" />
            <stop offset="0.6" stopColor="#F6C2CA" />
            <stop offset="1" stopColor="#EB9CAA" />
          </linearGradient>
          <radialGradient id={id('p3')} cx="0.42" cy="0.32" r="0.8">
            <stop offset="0" stopColor="#FFFFFF" />
            <stop offset="0.45" stopColor="#FCE0E4" />
            <stop offset="1" stopColor="#F0A9B5" />
          </radialGradient>
          <linearGradient id={id('stem')} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#A9CB8F" />
            <stop offset="1" stopColor="#6E9B5A" />
          </linearGradient>
          <linearGradient id={id('leaf')} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#6E9B5A" />
            <stop offset="0.6" stopColor="#9CC285" />
            <stop offset="1" stopColor="#CFE3BE" />
          </linearGradient>
          <filter id={id('wc')} x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves={2} seed={3} result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale={5} result="d" />
            <feGaussianBlur in="d" stdDeviation="0.5" />
          </filter>
          <filter id={id('soft')} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
        </defs>
      </svg>

      <svg width="520" height="300" viewBox="0 0 520 300" className="absolute bottom-0 left-0 overflow-visible">
        <ellipse cx="240" cy="200" rx="220" ry="90" fill="#F6CDD3" opacity="0.35" filter={url('soft')} />
      </svg>

      {SPEC.map((t, i) => {
        const B = 150 + t.L;
        const leaf =
          i % 2 === 0
            ? `M100 ${B} C58 ${B - t.L * 0.25} 44 ${B - t.L * 0.55} 52 ${B - t.L * 0.8} C70 ${B - t.L * 0.52} 88 ${B - t.L * 0.28} 104 ${B - 8} Z`
            : `M100 ${B} C142 ${B - t.L * 0.22} 156 ${B - t.L * 0.5} 150 ${B - t.L * 0.72} C132 ${B - t.L * 0.48} 114 ${B - t.L * 0.26} 96 ${B - 8} Z`;
        return (
          <div
            key={i}
            className="absolute bottom-0 w-[200px]"
            style={{ left: t.x, height: B, transform: `rotate(${t.rot}deg) scale(${t.s})`, transformOrigin: '50% 100%' }}
          >
            <svg
              viewBox={`0 0 200 ${B}`}
              width={200}
              height={B}
              className="animate-sway block overflow-visible drop-shadow-[0_18px_18px_rgba(196,120,135,0.18)]"
              style={{ animationDelay: `${-i * 0.9}s`, animationDuration: `${5.5 + (i % 3) * 0.8}s` }}
            >
              <path d={`M100 146 C104 ${146 + t.L * 0.4} 96 ${146 + t.L * 0.72} 100 ${B}`} stroke={url('stem')} strokeWidth="6" fill="none" strokeLinecap="round" />
              <path d={leaf} fill={url('leaf')} opacity="0.95" />
              <g filter={url('wc')}>
                <ellipse cx="100" cy="90" rx="62" ry="58" fill="#F7C9CF" opacity="0.25" />
                <path d="M100 22 C76 26 56 46 52 84 C50 116 70 142 100 146 Z" fill={url('p1')} />
                <path d="M100 22 C124 26 144 46 148 84 C150 116 130 142 100 146 Z" fill={url('p1')} />
                {!t.bud && (
                  <>
                    <path d="M46 36 C64 48 80 76 84 110 C86 130 94 142 100 146 C70 144 50 124 46 92 C43 70 43 52 46 36 Z" fill={url('p2')} opacity="0.95" />
                    <path d="M154 36 C136 48 120 76 116 110 C114 130 106 142 100 146 C130 144 150 124 154 92 C157 70 157 52 154 36 Z" fill={url('p2')} opacity="0.95" />
                  </>
                )}
                <path d="M100 30 C84 50 78 92 82 124 C86 146 114 146 118 124 C122 92 116 50 100 30 Z" fill={url('p3')} />
                <path d="M100 42 C94 70 92 104 96 136 M70 70 C66 96 72 122 88 140 M130 70 C134 96 128 122 112 140" stroke="#FFFFFF" strokeWidth="1.6" fill="none" opacity="0.55" strokeLinecap="round" />
                <path d="M90 146 C94 152 106 152 110 146 C106 142 94 142 90 146 Z" fill="#8DB67A" />
              </g>
            </svg>
          </div>
        );
      })}

      <svg width="520" height="300" viewBox="0 0 520 300" className="animate-sway absolute bottom-0 left-0 overflow-visible" style={{ animationDuration: '8s' }}>
        <path d="M120 300 C70 240 40 160 52 80 C84 150 112 220 150 290 Z" fill={url('leaf')} opacity="0.95" />
        <path d="M200 300 C186 230 196 150 236 90 C232 160 230 230 232 298 Z" fill={url('leaf')} opacity="0.85" />
        <path d="M300 300 C340 250 380 200 430 180 C394 222 360 262 330 300 Z" fill={url('leaf')} opacity="0.9" />
        <path d="M60 300 C20 260 0 220 -10 170 C30 210 60 250 90 300 Z" fill={url('leaf')} opacity="0.8" />
      </svg>
    </div>
  );
}

/** A tulip cluster pinned to a corner of its (relative) parent. */
export function TulipCorner({
  side = 'left',
  className,
  scale = 0.62,
}: {
  side?: 'left' | 'right';
  className?: string;
  scale?: number;
}) {
  return (
    <div
      aria-hidden
      className={cx('pointer-events-none absolute bottom-0 z-0 dark:opacity-85', side === 'left' ? 'left-0' : 'right-0', className)}
      style={{ transform: `scale(${scale})`, transformOrigin: side === 'left' ? '0 100%' : '100% 100%' }}
    >
      <TulipCluster side={side} />
    </div>
  );
}
