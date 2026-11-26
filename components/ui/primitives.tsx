import Link from 'next/link';
import type { ReactNode } from 'react';

const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ');
export { cx };

/** "— HELLO, I'M" style label, as in the reference layout. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cx('flex items-center gap-3.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-ink', className)}>
      <span aria-hidden className="h-px w-10 origin-left animate-[grow-line_1.2s_ease-out_both] bg-ink" />
      {children}
    </p>
  );
}

/** Two-line italic serif title. The second line can switch to the rose accent. */
export function SerifTitle({
  lines,
  accent = false,
  as: Tag = 'h1',
  size = 'lg',
  className,
}: {
  lines: [ReactNode, ReactNode];
  accent?: boolean;
  as?: 'h1' | 'h2' | 'h3';
  size?: 'xl' | 'lg' | 'md';
  className?: string;
}) {
  const sizes = {
    xl: 'text-[clamp(3.5rem,7vw,6rem)]',
    lg: 'text-[clamp(2.6rem,4.6vw,4rem)]',
    md: 'text-[clamp(2rem,3.4vw,2.9rem)]',
  };
  return (
    <Tag className={cx('font-serif font-normal italic leading-[1.05] text-ink', sizes[size], className)}>
      {lines[0]}
      <br />
      <span className={accent ? 'text-shimmer' : undefined}>{lines[1]}</span>
    </Tag>
  );
}

export function Body({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cx('max-w-[42ch] text-[15px] leading-[1.7] text-muted md:text-base', className)}>{children}</p>;
}

type PillProps = {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'outline';
  arrow?: boolean;
  className?: string;
};

/** Rounded pill button. Primary pills carry a slow passing glint. External, mailto and file links open as plain anchors. */
export function PillLink({ href, children, variant = 'primary', arrow = variant === 'primary', className }: PillProps) {
  const classes = cx(
    'group inline-flex items-center gap-2 self-start rounded-full px-6 py-3.5 text-sm font-medium transition-[box-shadow,background-color,color,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-14px_rgb(91_44_58/0.45)] active:translate-y-0',
    variant === 'primary' ? 'sheen bg-ink text-on-ink' : 'border border-line bg-card text-ink backdrop-blur-sm hover:border-rose',
    className,
  );
  const inner = (
    <>
      {children}
      {arrow && (
        <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 5h13M10 1l4 4-4 4" />
          </svg>
        </span>
      )}
    </>
  );
  const isExternal = /^(https?:|mailto:)/.test(href);
  const isFile = href.endsWith('.pdf');
  if (isExternal || isFile) {
    return (
      <a href={href} className={classes} {...(href.startsWith('http') || isFile ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}

/** The small round arrow button used on list cards; it nudges forward on its own and on hover. */
export function ArrowCircle({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cx(
        'flex h-9 w-9 flex-none items-center justify-center rounded-full border border-line bg-paper/70 text-ink transition-colors duration-300 group-hover:border-rose group-hover:bg-rose group-hover:text-white',
        className,
      )}
    >
      <svg width="14" height="10" viewBox="0 0 16 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="animate-nudge">
        <path d="M1 5h13M10 1l4 4-4 4" />
      </svg>
    </span>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-line bg-card px-3.5 py-1.5 text-[12.5px] text-ink transition-[transform,background-color,border-color] duration-300 hover:-translate-y-0.5 hover:rotate-[-2deg] hover:border-rose hover:bg-paper">
      {children}
    </span>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cx('rounded-[22px] border border-white/70 bg-card p-7 shadow-[var(--shadow-soft)] backdrop-blur-md dark:border-white/10', className)}>
      {children}
    </div>
  );
}

/** Max-width page container used by every section. */
export function Container({ children, className, id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={cx('relative mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10', className)}>
      {children}
    </section>
  );
}
