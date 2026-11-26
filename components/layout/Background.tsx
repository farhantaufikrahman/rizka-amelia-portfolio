/** Page-wide ambient layer: blush gradients, hairline curves, a soft wave and falling petals. */
const PETALS = [
  { left: '8%', delay: '0s', dur: '19s', w: 26 },
  { left: '22%', delay: '-6s', dur: '23s', w: 20 },
  { left: '37%', delay: '-12s', dur: '21s', w: 24 },
  { left: '49%', delay: '-3s', dur: '25s', w: 18 },
  { left: '58%', delay: '-9s', dur: '20s', w: 28 },
  { left: '70%', delay: '-15s', dur: '24s', w: 22 },
  { left: '82%', delay: '-5s', dur: '22s', w: 26 },
  { left: '91%', delay: '-11s', dur: '26s', w: 18 },
];

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
      {PETALS.map((p, i) => (
        <svg
          key={i}
          className="animate-fall absolute top-0"
          width={p.w}
          height={Math.round(p.w * 0.62)}
          viewBox="0 0 26 16"
          style={{ left: p.left, animationDelay: p.delay, animationDuration: p.dur }}
        >
          <path d="M1 11 C6 2 19 0 25 5 C19 13 8 16 1 11 Z" fill="var(--color-petal)" opacity="0.75" />
          <path d="M4 10 C10 7 16 6 22 6" stroke="#FFFFFF" strokeWidth="0.8" fill="none" opacity="0.6" />
        </svg>
      ))}
    </div>
  );
}
