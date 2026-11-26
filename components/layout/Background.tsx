/**
 * Page-wide ambient layer (fixed, behind content):
 * blush gradients, hairline curves, butterflies, birds, gusts of wind,
 * and tulip petals + leaves drifting down. Pure CSS animation; disabled for reduced motion.
 */
const FALLING = [
  { left: '6%', delay: '0s', dur: '19s', w: 26, kind: 'petal' },
  { left: '17%', delay: '-7s', dur: '24s', w: 30, kind: 'leaf' },
  { left: '28%', delay: '-12s', dur: '21s', w: 22, kind: 'petal' },
  { left: '41%', delay: '-3s', dur: '26s', w: 18, kind: 'petal' },
  { left: '53%', delay: '-15s', dur: '23s', w: 34, kind: 'leaf' },
  { left: '62%', delay: '-9s', dur: '20s', w: 28, kind: 'petal' },
  { left: '74%', delay: '-18s', dur: '25s', w: 22, kind: 'petal' },
  { left: '84%', delay: '-5s', dur: '22s', w: 30, kind: 'leaf' },
  { left: '93%', delay: '-11s', dur: '27s', w: 18, kind: 'petal' },
] as const;

const BUTTERFLIES = [
  { top: '22vh', cls: 'animate-fly', delay: '-4s', dur: '34s', size: 40, a: '#F3B3BE', b: '#FCE0E4' },
  { top: '58vh', cls: 'animate-fly-back', delay: '-17s', dur: '42s', size: 32, a: '#F6C7A7', b: '#FFF1E6' },
  { top: '78vh', cls: 'animate-fly', delay: '-26s', dur: '38s', size: 28, a: '#D9C6F0', b: '#F8F2FD' },
];

function Butterfly({ size, a, b }: { size: number; a: string; b: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 50" className="drop-shadow-[0_6px_6px_rgba(91,44,58,0.15)]">
      <g className="animate-flap" style={{ transformOrigin: '100% 50%' }}>
        <path d="M30 24 C18 2 2 4 4 18 C6 28 20 28 30 25Z" fill={a} stroke="#E48A9A" strokeWidth="0.8" />
        <path d="M30 26 C20 30 10 42 16 46 C22 48 28 38 30 29Z" fill={b} stroke="#E48A9A" strokeWidth="0.8" />
      </g>
      <g className="animate-flap" style={{ transformOrigin: '0% 50%' }}>
        <path d="M30 24 C42 2 58 4 56 18 C54 28 40 28 30 25Z" fill={a} stroke="#E48A9A" strokeWidth="0.8" />
        <path d="M30 26 C40 30 50 42 44 46 C38 48 32 38 30 29Z" fill={b} stroke="#E48A9A" strokeWidth="0.8" />
      </g>
      <ellipse cx="30" cy="26" rx="1.8" ry="9" fill="#5B2C3A" />
      <path d="M29 17 C27 11 24 9 22 8 M31 17 C33 11 36 9 38 8" stroke="#5B2C3A" strokeWidth="1" fill="none" />
    </svg>
  );
}

export default function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(900px 700px at 78% 22%, var(--color-glow), transparent 60%),' +
            'radial-gradient(800px 600px at 8% 88%, var(--color-surface), transparent 65%),' +
            'var(--color-blush)',
        }}
      />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="none">
        <path d="M-40 760 C300 640 520 860 900 720 S1300 560 1500 640" stroke="var(--color-line)" strokeWidth="1" fill="none" />
        <path d="M620 40 C760 120 820 320 760 520" stroke="var(--color-rose)" strokeOpacity="0.35" strokeWidth="1" fill="none" />
      </svg>

      {/* Wind */}
      {[
        { top: '30%', left: '6%', d: '0s' },
        { top: '64%', left: '44%', d: '-4s' },
      ].map((g, i) => (
        <svg key={i} width="560" height="70" viewBox="0 0 560 70" className="absolute" style={{ top: g.top, left: g.left }}>
          <path className="animate-gust" style={{ animationDelay: g.d }} d="M10 34 C120 10 220 58 330 34 S480 20 550 38" stroke="var(--color-rose)" strokeOpacity="0.45" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <path className="animate-gust" style={{ animationDelay: `calc(${g.d} - 3s)` }} d="M60 52 C160 34 260 66 380 50" stroke="var(--color-rose)" strokeOpacity="0.3" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        </svg>
      ))}

      {/* Birds */}
      <div className="animate-glide absolute left-0" style={{ top: '9vh' }}>
        <svg width="90" height="40" viewBox="0 0 90 40" className="opacity-60">
          <path className="animate-beat" d="M2 20 Q12 9 22 20 Q32 9 42 20" stroke="var(--color-ink)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path className="animate-beat" style={{ animationDelay: '-0.35s' }} d="M52 32 Q59 25 66 32 Q73 25 80 32" stroke="var(--color-ink)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      </div>
      <div className="animate-glide absolute left-0" style={{ top: '16vh', animationDelay: '-14s', animationDuration: '36s' }}>
        <svg width="50" height="26" viewBox="0 0 50 26" className="opacity-50">
          <path className="animate-beat" d="M2 14 Q12 4 22 14 Q32 4 42 14" stroke="var(--color-ink)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      </div>

      {/* Butterflies */}
      {BUTTERFLIES.map((b, i) => (
        <div key={i} className={`${b.cls} absolute left-0`} style={{ top: b.top, animationDelay: b.delay, animationDuration: b.dur }}>
          <div className="animate-bob" style={{ animationDelay: b.delay }}>
            <Butterfly size={b.size} a={b.a} b={b.b} />
          </div>
        </div>
      ))}

      {/* Falling petals and tulip leaves */}
      {FALLING.map((p, i) =>
        p.kind === 'petal' ? (
          <svg key={i} className="animate-fall absolute top-0" width={p.w} height={Math.round(p.w * 0.62)} viewBox="0 0 26 16" style={{ left: p.left, animationDelay: p.delay, animationDuration: p.dur }}>
            <path d="M1 11 C6 2 19 0 25 5 C19 13 8 16 1 11 Z" fill="var(--color-petal)" opacity="0.75" />
            <path d="M4 10 C10 7 16 6 22 6" stroke="#FFFFFF" strokeWidth="0.8" fill="none" opacity="0.6" />
          </svg>
        ) : (
          <svg key={i} className="animate-fall absolute top-0" width={p.w} height={Math.round(p.w * 0.4)} viewBox="0 0 40 16" style={{ left: p.left, animationDelay: p.delay, animationDuration: p.dur }}>
            <path d="M1 8 C10 0 30 0 39 8 C30 15 10 15 1 8 Z" fill="#9CC285" opacity="0.7" />
            <path d="M3 8 H36" stroke="#6E9B5A" strokeWidth="0.8" opacity="0.7" />
          </svg>
        ),
      )}
    </div>
  );
}
