import Fireflies from './Fireflies';
import { TulipCluster } from '@/components/decor/TulipCluster';

/**
 * Page-wide ambient layer (fixed, behind content) — a living tulip garden:
 * sun rays, tulips bending in travelling gusts of wind with light caught in their petals,
 * fireflies carrying their glow, butterflies on their own flight paths, and drifting petals.
 * Everything that travels across the screen is hidden for reduced-motion users.
 */
const FALLING = [
  { left: '6%', delay: '0s', dur: '19s', w: 26, kind: 'petal' },
  { left: '19%', delay: '-7s', dur: '24s', w: 30, kind: 'leaf' },
  { left: '33%', delay: '-12s', dur: '21s', w: 22, kind: 'petal' },
  { left: '48%', delay: '-3s', dur: '26s', w: 18, kind: 'petal' },
  { left: '61%', delay: '-15s', dur: '23s', w: 30, kind: 'leaf' },
  { left: '74%', delay: '-9s', dur: '20s', w: 26, kind: 'petal' },
  { left: '88%', delay: '-18s', dur: '25s', w: 20, kind: 'petal' },
] as const;

/** Slow, see-through butterflies: long flight loops and a lazy wing beat so they stay in the background. */
const BUTTERFLIES = [
  { path: 'flutter-a', dur: '80s', delay: '-10s', size: 38, a: '#F3B3BE', b: '#FCE0E4', edge: '#E48A9A' },
  { path: 'flutter-b', dur: '95s', delay: '-40s', size: 32, a: '#F6C7A7', b: '#FFF1E6', edge: '#E0A27E' },
  { path: 'flutter-c', dur: '70s', delay: '-25s', size: 26, a: '#D9C6F0', b: '#F8F2FD', edge: '#B59AD8' },
  { path: 'flutter-d', dur: '75s', delay: '-55s', size: 28, a: '#FBD3DA', b: '#FFFFFF', edge: '#E48A9A' },
];

function Butterfly({ size, a, b, edge }: { size: number; a: string; b: string; edge: string }) {
  const wing = (mirror: boolean) => (
    <svg width={size / 2} height={size * 0.84} viewBox="0 0 30 50" style={{ transform: mirror ? 'scaleX(-1)' : undefined }} className="block overflow-visible">
      <path d="M30 22 C18 0 0 2 2 16 C4 26 18 26 30 23Z" fill={a} stroke={edge} strokeWidth="0.8" />
      <path d="M30 25 C20 29 8 41 14 45 C20 48 27 38 30 28Z" fill={b} stroke={edge} strokeWidth="0.8" />
      <circle cx="12" cy="13" r="2.4" fill="#FFFFFF" opacity="0.8" />
      <circle cx="17" cy="38" r="1.6" fill={edge} opacity="0.5" />
    </svg>
  );
  return (
    <div className="relative flex opacity-45 drop-shadow-[0_6px_6px_rgba(91,44,58,0.1)] dark:opacity-40" style={{ perspective: 160 }}>
      <div className="animate-wing-l">{wing(false)}</div>
      <div className="animate-wing-r">{wing(true)}</div>
      <span className="absolute left-1/2 top-[18%] h-[62%] w-[3px] -translate-x-1/2 rounded-full bg-[#5B2C3A]" />
      <svg className="absolute left-1/2 top-0 -translate-x-1/2" width="16" height="10" viewBox="0 0 16 10">
        <path d="M7 10 C6 5 3 3 1 2 M9 10 C10 5 13 3 15 2" stroke="#5B2C3A" strokeWidth="0.9" fill="none" />
      </svg>
    </div>
  );
}

export default function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(900px 700px at 78% 18%, var(--color-glow), transparent 60%),' +
            'radial-gradient(800px 600px at 8% 88%, var(--color-surface), transparent 65%),' +
            'var(--color-blush)',
        }}
      />

      {/* Sun rays from the top-right corner (moonlight on the night theme) */}
      <div className="absolute -right-[10vw] -top-[20vh] h-[140vh] w-[70vw] opacity-70 dark:opacity-30">
        {[
          { r: '28deg', w: 120, d: '0s', o: 0.55 },
          { r: '38deg', w: 70, d: '-3s', o: 0.4 },
          { r: '48deg', w: 160, d: '-6s', o: 0.35 },
          { r: '60deg', w: 90, d: '-2s', o: 0.3 },
        ].map((ray, i) => (
          <span
            key={i}
            className="animate-ray absolute right-[20%] top-0 h-full blur-2xl"
            style={{
              width: ray.w,
              ['--r' as string]: ray.r,
              animationDelay: ray.d,
              opacity: ray.o,
              background: 'linear-gradient(180deg, rgba(255,250,236,0.95), rgba(255,236,240,0.35) 55%, transparent)',
            }}
          />
        ))}
      </div>

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="none">
        <path d="M-40 760 C300 640 520 860 900 720 S1300 560 1500 640" stroke="var(--color-line)" strokeWidth="1" fill="none" />
        <path d="M620 40 C760 120 820 320 760 520" stroke="var(--color-rose)" strokeOpacity="0.3" strokeWidth="1" fill="none" />
      </svg>

      {/* Gusts of wind — timed with the tulips' gust */}
      {[
        { top: '58%', left: '-4%', d: '-9s' },
        { top: '72%', left: '40%', d: '-7.6s' },
      ].map((g, i) => (
        <svg key={i} data-ambient-moving width="620" height="70" viewBox="0 0 560 70" className="absolute" style={{ top: g.top, left: g.left }}>
          <path className="animate-gust" style={{ animationDelay: g.d }} d="M10 34 C120 10 220 58 330 34 S480 20 550 38" stroke="var(--color-rose)" strokeOpacity="0.45" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <path className="animate-gust" style={{ animationDelay: `calc(${g.d} + 0.4s)` }} d="M60 52 C160 34 260 66 380 50" stroke="var(--color-rose)" strokeOpacity="0.3" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        </svg>
      ))}

      {/* Tulip meadow in both bottom corners; the right one gusts ~1.6s after the left one */}
      <div className="absolute bottom-[-10vh] left-[-7vw] origin-bottom-left scale-[0.36] opacity-85 sm:scale-[0.45] lg:scale-[0.55] dark:opacity-75">
        <TulipCluster side="left" gustDelay={0} />
      </div>
      <div className="absolute bottom-[-10vh] right-[-7vw] origin-bottom-right scale-[0.32] opacity-85 sm:scale-[0.42] lg:scale-[0.5] dark:opacity-75">
        <TulipCluster side="right" gustDelay={1.6} />
      </div>

      {/* Fireflies */}
      <div data-ambient-moving className="absolute inset-0">
        <Fireflies />
      </div>

      {/* Butterflies */}
      {BUTTERFLIES.map((b, i) => (
        <div
          key={i}
          data-ambient-moving
          className="absolute left-0 top-0"
          style={{ animation: `${b.path} ${b.dur} ease-in-out ${b.delay} infinite` }}
        >
          <div className="animate-hover-bob" style={{ animationDelay: `${-i * 1.4}s` }}>
            <Butterfly size={b.size} a={b.a} b={b.b} edge={b.edge} />
          </div>
        </div>
      ))}

      {/* Falling petals and tulip leaves */}
      {FALLING.map((p, i) =>
        p.kind === 'petal' ? (
          <svg key={i} data-ambient-moving className="animate-fall absolute top-0" width={p.w} height={Math.round(p.w * 0.62)} viewBox="0 0 26 16" style={{ left: p.left, animationDelay: p.delay, animationDuration: p.dur }}>
            <path d="M1 11 C6 2 19 0 25 5 C19 13 8 16 1 11 Z" fill="var(--color-petal)" opacity="0.75" />
            <path d="M4 10 C10 7 16 6 22 6" stroke="#FFFFFF" strokeWidth="0.8" fill="none" opacity="0.6" />
          </svg>
        ) : (
          <svg key={i} data-ambient-moving className="animate-fall absolute top-0" width={p.w} height={Math.round(p.w * 0.4)} viewBox="0 0 40 16" style={{ left: p.left, animationDelay: p.delay, animationDuration: p.dur }}>
            <path d="M1 8 C10 0 30 0 39 8 C30 15 10 15 1 8 Z" fill="#9CC285" opacity="0.7" />
            <path d="M3 8 H36" stroke="#6E9B5A" strokeWidth="0.8" opacity="0.7" />
          </svg>
        ),
      )}
    </div>
  );
}
