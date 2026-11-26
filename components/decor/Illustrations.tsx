/**
 * Small hand-drawn-style illustrations that give each page its own concept.
 * Pure SVG/CSS, decorative only (aria-hidden).
 */
import type { CSSProperties, ReactNode } from 'react';
import { cx } from '@/components/ui/primitives';

type P = { className?: string; style?: CSSProperties };

/* ---------- Education: books + graduation cap + diploma ---------- */
export function BookStack({ className, style }: P) {
  return (
    <svg aria-hidden viewBox="0 0 300 230" className={className} style={style}>
      <ellipse cx="150" cy="222" rx="130" ry="8" fill="#5B2C3A" opacity="0.08" />
      <rect x="20" y="168" width="250" height="44" rx="6" fill="#EFC3C9" />
      <rect x="20" y="168" width="250" height="9" rx="4" fill="#FFFFFF" opacity="0.6" />
      <rect x="250" y="172" width="16" height="36" fill="#E48A9A" opacity="0.5" />
      <rect x="40" y="128" width="226" height="40" rx="6" fill="#F6D6DA" />
      <rect x="40" y="128" width="226" height="8" rx="4" fill="#FFFFFF" opacity="0.6" />
      <path d="M60 148 H150" stroke="#E48A9A" strokeWidth="2" />
      <rect x="30" y="92" width="232" height="36" rx="6" fill="#E9B3BC" />
      <rect x="30" y="92" width="232" height="7" rx="4" fill="#FFFFFF" opacity="0.55" />
      <path d="M210 92 V128" stroke="#FFFFFF" strokeWidth="3" opacity="0.6" />
      {/* graduation cap */}
      <g transform="translate(150 66)">
        <path d="M-70 0 L0 -30 L70 0 L0 30 Z" fill="#5B2C3A" />
        <path d="M-40 14 V36 C-40 46 40 46 40 36 V14 L0 30 Z" fill="#4A2330" />
        <g className="animate-swing" style={{ transformOrigin: '52px 4px' }}>
          <path d="M0 0 L52 4 V44" stroke="#E48A9A" strokeWidth="2.5" fill="none" />
          <path d="M46 44 h12 l-2 16 h-8 z" fill="#E48A9A" />
        </g>
        <circle cx="0" cy="0" r="4" fill="#E48A9A" />
      </g>
    </svg>
  );
}

export function Diploma({ className }: P) {
  return (
    <svg aria-hidden viewBox="0 0 260 120" className={className}>
      <rect x="20" y="30" width="220" height="60" rx="30" fill="#FFFDFB" stroke="#EFC3C9" strokeWidth="2" />
      <ellipse cx="34" cy="60" rx="14" ry="30" fill="#F6E1DF" stroke="#EFC3C9" strokeWidth="2" />
      <path d="M70 52 H200 M70 66 H170" stroke="#E9B3BC" strokeWidth="3" strokeLinecap="round" />
      <path d="M118 30 V90" stroke="#E48A9A" strokeWidth="8" />
      <path d="M110 92 l8 22 l8 -22" fill="#E48A9A" />
    </svg>
  );
}

/* ---------- Makeup: vanity mirror with bulbs, lipstick, brush ---------- */
export function VanityMirror({ children, className }: { children: ReactNode; className?: string }) {
  const bulbs = Array.from({ length: 16 }, (_, i) => {
    const a = (i / 16) * Math.PI * 2;
    return { left: 50 + Math.cos(a) * 52, top: 50 + Math.sin(a) * 52, delay: `${(i % 4) * 0.4}s` };
  });
  return (
    <div className={cx('relative', className)}>
      <div className="absolute inset-0 rounded-[50%] bg-[linear-gradient(145deg,#F6D9C4,#E9B9A0_45%,#F8E4D6)] shadow-[var(--shadow-photo)]" />
      <div className="absolute inset-[5%] overflow-hidden rounded-[50%] shadow-[inset_0_0_0_3px_rgba(255,255,255,0.6)]">{children}</div>
      {bulbs.map((b, i) => (
        <span
          key={i}
          aria-hidden
          className="animate-twinkle absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFF6E8] shadow-[0_0_14px_4px_rgba(255,225,190,0.85)]"
          style={{ left: `${b.left}%`, top: `${b.top}%`, animationDelay: b.delay }}
        />
      ))}
    </div>
  );
}

export function Lipstick({ className, style }: P) {
  return (
    <svg aria-hidden viewBox="0 0 60 150" className={className} style={style}>
      <rect x="12" y="70" width="36" height="74" rx="5" fill="#5B2C3A" />
      <rect x="12" y="70" width="36" height="10" fill="#E9B9A0" />
      <rect x="17" y="40" width="26" height="32" rx="3" fill="#E9B9A0" />
      <path d="M19 40 V14 C19 8 41 2 41 10 V40 Z" fill="#D9607A" />
      <path d="M24 16 V38" stroke="#FFFFFF" strokeWidth="2" opacity="0.5" />
    </svg>
  );
}

export function MakeupBrush({ className, style }: P) {
  return (
    <svg aria-hidden viewBox="0 0 60 200" className={className} style={style}>
      <path d="M30 4 C14 18 12 48 20 64 H40 C48 48 46 18 30 4 Z" fill="#F3B3BE" />
      <path d="M30 6 C24 20 24 44 26 62" stroke="#FFFFFF" strokeWidth="2" opacity="0.5" fill="none" />
      <rect x="19" y="62" width="22" height="22" rx="3" fill="#E9B9A0" />
      <path d="M22 84 L26 196 H34 L38 84 Z" fill="#5B2C3A" />
    </svg>
  );
}

/* ---------- Speaking: stage curtains, spotlight, microphone, ticket ---------- */
export function CurtainSwag({ side = 'left', className }: P & { side?: 'left' | 'right' }) {
  return (
    <svg aria-hidden viewBox="0 0 320 260" className={className} style={{ transform: side === 'right' ? 'scaleX(-1)' : undefined }}>
      <defs>
        <linearGradient id={`curtain-${side}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#C9677D" />
          <stop offset="0.5" stopColor="#E48A9A" />
          <stop offset="1" stopColor="#C9677D" />
        </linearGradient>
      </defs>
      <path d="M0 0 H320 C260 40 200 70 120 80 C70 140 40 210 0 260 Z" fill={`url(#curtain-${side})`} />
      <path d="M30 0 C40 80 30 170 10 240 M80 0 C90 50 90 100 70 150 M140 0 C150 30 150 60 120 80" stroke="#B5546C" strokeWidth="3" fill="none" opacity="0.45" />
      <path d="M0 0 H320 V16 H0 Z" fill="#B5546C" />
      <circle cx="118" cy="84" r="9" fill="#F6D9C4" />
    </svg>
  );
}

export function Spotlight({ className }: P) {
  return (
    <div
      aria-hidden
      className={cx('pointer-events-none absolute bg-[linear-gradient(to_bottom,rgba(255,255,255,0.75),rgba(255,255,255,0))] [clip-path:polygon(42%_0,58%_0,100%_100%,0_100%)] dark:bg-[linear-gradient(to_bottom,rgba(235,163,177,0.25),rgba(235,163,177,0))]', className)}
    />
  );
}

export function Microphone({ className, style }: P) {
  return (
    <svg aria-hidden viewBox="0 0 80 220" className={className} style={style}>
      <rect x="22" y="6" width="36" height="56" rx="18" fill="#5B2C3A" />
      <path d="M26 20 H54 M26 30 H54 M26 40 H54" stroke="#E48A9A" strokeWidth="2" opacity="0.6" />
      <path d="M14 46 C14 76 66 76 66 46" stroke="#5B2C3A" strokeWidth="4" fill="none" />
      <path d="M40 74 V200" stroke="#5B2C3A" strokeWidth="5" />
      <path d="M14 212 C26 200 54 200 66 212" stroke="#5B2C3A" strokeWidth="6" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/** Ticket-stub card with notches and a perforated divider. */
export function Ticket({ stub, children, className }: { stub: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={cx('relative grid grid-cols-[110px_1fr] overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-soft)] sm:grid-cols-[140px_1fr]', className)}>
      <div className="flex flex-col items-center justify-center gap-1 bg-ink p-4 text-center text-on-ink">{stub}</div>
      <div className="border-l-2 border-dashed border-line p-6">{children}</div>
      <span aria-hidden className="absolute -top-3 left-[98px] h-6 w-6 rounded-full bg-blush sm:left-[128px]" />
      <span aria-hidden className="absolute -bottom-3 left-[98px] h-6 w-6 rounded-full bg-blush sm:left-[128px]" />
    </div>
  );
}

/* ---------- Organization: bunting and clothesline ---------- */
export function Bunting({ className }: P) {
  const flags = Array.from({ length: 11 }, (_, i) => i);
  const colors = ['#F3B3BE', '#FFFFFF', '#E48A9A', '#F6D9C4', '#D9C6F0'];
  return (
    <svg aria-hidden viewBox="0 0 1000 120" preserveAspectRatio="none" className={className}>
      <path d="M0 10 Q500 90 1000 10" stroke="#B98A88" strokeWidth="2" fill="none" />
      {flags.map((i) => {
        const x = 40 + i * 92;
        const t = x / 1000;
        const y = (1 - t) * (1 - t) * 10 + 2 * (1 - t) * t * 90 + t * t * 10;
        return (
          <g key={i} className="animate-swing" style={{ transformOrigin: `${x + 20}px ${y}px`, animationDelay: `${-i * 0.4}s` }}>
            <path d={`M${x} ${y} L${x + 40} ${y} L${x + 20} ${y + 44} Z`} fill={colors[i % colors.length]} stroke="#E9B3BC" strokeWidth="1" />
          </g>
        );
      })}
    </svg>
  );
}

export function Clothespin({ className }: P) {
  return (
    <svg aria-hidden viewBox="0 0 16 44" className={className}>
      <rect x="2" y="0" width="12" height="44" rx="3" fill="#E9C9A6" />
      <path d="M8 4 V40" stroke="#C9A27C" strokeWidth="1.5" />
      <circle cx="8" cy="18" r="3" fill="#C9A27C" />
    </svg>
  );
}

/* ---------- Skills: seed packet ---------- */
export function SeedPacket({ title, tint = '#F3B3BE', children }: { title: ReactNode; tint?: string; children: ReactNode }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-b-2xl bg-[#FFFDFB] pb-6 text-[#5B2C3A] shadow-[var(--shadow-soft)] [clip-path:polygon(0_10px,5%_0,10%_10px,15%_0,20%_10px,25%_0,30%_10px,35%_0,40%_10px,45%_0,50%_10px,55%_0,60%_10px,65%_0,70%_10px,75%_0,80%_10px,85%_0,90%_10px,95%_0,100%_10px,100%_100%,0_100%)]">
      <div className="flex h-28 items-end justify-center pt-4" style={{ background: `linear-gradient(180deg, ${tint}55, ${tint}22)` }}>
        <svg aria-hidden viewBox="0 0 60 90" className="animate-sway h-24 w-16">
          <path d="M30 90 V40" stroke="#6E9B5A" strokeWidth="3" />
          <path d="M30 80 C14 74 10 60 14 50 C20 62 26 70 30 72" fill="#9CC285" />
          <path d="M16 10 C20 24 26 32 30 36 C34 32 40 24 44 10 C42 30 38 40 30 44 C22 40 18 30 16 10 Z" fill={tint} />
          <path d="M30 4 C24 16 24 30 30 42 C36 30 36 16 30 4 Z" fill="#FFFFFF" opacity="0.6" />
        </svg>
      </div>
      <div className="flex flex-1 flex-col gap-3 px-5 pt-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#7D5F66]">Seeds of</p>
        <h3 className="-mt-2 font-serif text-[26px] italic leading-tight">{title}</h3>
        {children}
      </div>
    </div>
  );
}

/* ---------- Projects: beaker & test tubes ---------- */
export function LabGlass({ className }: P) {
  return (
    <svg aria-hidden viewBox="0 0 160 140" className={className}>
      <path d="M40 10 V54 L12 118 C8 128 14 134 24 134 H86 C96 134 102 128 98 118 L70 54 V10" fill="#FFFFFF" fillOpacity="0.6" stroke="#5B2C3A" strokeWidth="3" />
      <path d="M24 108 C40 100 70 116 92 106 L98 118 C102 128 96 134 86 134 H24 C14 134 8 128 12 118 Z" fill="#F3B3BE" />
      <path d="M34 10 H76" stroke="#5B2C3A" strokeWidth="3" />
      <circle cx="48" cy="96" r="3" fill="#FFFFFF" className="animate-twinkle" />
      <circle cx="62" cy="86" r="2" fill="#FFFFFF" className="animate-twinkle" style={{ animationDelay: '0.8s' }} />
      <rect x="112" y="30" width="16" height="96" rx="8" fill="#FFFFFF" fillOpacity="0.6" stroke="#5B2C3A" strokeWidth="3" />
      <rect x="115" y="78" width="10" height="44" rx="5" fill="#E48A9A" />
      <rect x="136" y="46" width="16" height="80" rx="8" fill="#FFFFFF" fillOpacity="0.6" stroke="#5B2C3A" strokeWidth="3" />
      <rect x="139" y="92" width="10" height="30" rx="5" fill="#9CC285" />
    </svg>
  );
}

/* ---------- Certificates: nail + string for hanging frames ---------- */
export function HangingString({ className }: P) {
  return (
    <svg aria-hidden viewBox="0 0 200 60" className={className}>
      <path d="M20 58 L100 8 L180 58" stroke="#B98A88" strokeWidth="1.6" fill="none" />
      <circle cx="100" cy="8" r="6" fill="#C9A27C" />
      <circle cx="98" cy="6" r="2" fill="#FFFFFF" opacity="0.7" />
    </svg>
  );
}

/* ---------- Contact: envelope with wax seal ---------- */
export function Envelope({ className }: P) {
  return (
    <svg aria-hidden viewBox="0 0 260 180" className={className}>
      <rect x="10" y="20" width="240" height="150" rx="10" fill="#FFFDFB" stroke="#EFC3C9" strokeWidth="2" />
      <path d="M10 30 L130 110 L250 30" fill="#F6E1DF" stroke="#EFC3C9" strokeWidth="2" />
      <path d="M10 170 L100 96 M250 170 L160 96" stroke="#EFC3C9" strokeWidth="2" />
      <circle cx="130" cy="110" r="22" fill="#C9677D" />
      <circle cx="130" cy="110" r="16" fill="none" stroke="#E48A9A" strokeWidth="1.5" />
      <path d="M130 122 V108 M123 98 C122 92 126 88 130 87 C134 88 138 92 137 98 C135 101 125 101 123 98Z" stroke="#FCE0E4" strokeWidth="1.6" fill="none" />
    </svg>
  );
}

/* ---------- About: pressed tulip + stamp ---------- */
export function PressedTulip({ className, style }: P) {
  return (
    <svg aria-hidden viewBox="0 0 80 200" className={className} style={style}>
      <path d="M40 200 C42 150 38 100 40 60" stroke="#6E9B5A" strokeWidth="3" fill="none" />
      <path d="M40 160 C18 148 12 118 18 100 C26 124 34 140 40 146" fill="#9CC285" opacity="0.9" />
      <path d="M22 20 C26 40 32 52 40 58 C48 52 54 40 58 20 C56 48 50 60 40 64 C30 60 24 48 22 20 Z" fill="#F3B3BE" />
      <path d="M40 8 C32 22 32 44 40 60 C48 44 48 22 40 8 Z" fill="#FCE0E4" />
    </svg>
  );
}

export function Stamp({ icon, label, sub, rotate = 0 }: { icon: ReactNode; label: string; sub: string; rotate?: number }) {
  return (
    <div className="mx-auto flex h-40 w-40 flex-col items-center justify-center gap-1 rounded-full border-2 border-dashed border-rose bg-card text-center shadow-[var(--shadow-soft)]" style={{ rotate: `${rotate}deg` }}>
      <span className="text-rose">{icon}</span>
      <span className="text-[13px] font-semibold uppercase tracking-[0.12em]">{label}</span>
      <span className="text-[12px] text-muted">{sub}</span>
    </div>
  );
}

/** A strip of washi tape. */
export function Washi({ className, color = 'rgba(232,182,186,0.75)' }: P & { color?: string }) {
  return (
    <span
      aria-hidden
      className={cx('absolute h-6 w-24', className)}
      style={{ backgroundColor: color, backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.35) 0 6px, transparent 6px 12px)' }}
    />
  );
}
