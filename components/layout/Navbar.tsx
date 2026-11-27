'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Moon, Search, Sun, X } from 'lucide-react';
import { detailPages, navItems } from '@/lib/content';
import { ui, type Lang } from '@/lib/i18n';
import { setLang, toggleTheme, useAppDispatch, useAppSelector, useT } from '@/lib/store';
import { cx } from '@/components/ui/primitives';

type NavKey = (typeof navItems)[number]['key'];

/** Detail pages that are no longer in the menu still light up their parent item. */
function isActive(pathname: string, key: NavKey, href: string) {
  if (key === 'experience') return ['/experience', '/organization', '/speaking'].some((p) => pathname.startsWith(p));
  if (key === 'education') return pathname.startsWith('/education') || pathname.startsWith('/certificates');
  if (href === '/') return pathname === '/';
  return pathname.startsWith(href);
}

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-ink" aria-label="Rizka Amelia — home">
      <svg width="24" height="30" viewBox="0 0 24 30" aria-hidden>
        <path d="M12 29 C12 23 12 18 12 13" stroke="currentColor" strokeWidth="1.2" fill="none" />
        <path d="M12 25 C7 23 5 19 6 15 C8 19 10 21 12 22" stroke="currentColor" strokeWidth="1.1" fill="none" />
        <path d="M6 6 C8 9 10 12 12 14 C14 12 16 9 18 6 C17 11 15 13 12 14 C9 13 7 11 6 6 Z M12 3 C10 6 10 10 12 14 C14 10 14 6 12 3 Z" stroke="#E48A9A" strokeWidth="1.2" fill="none" />
      </svg>
      <span className="font-serif text-2xl font-medium italic leading-none">Rizka Amelia</span>
    </Link>
  );
}

function LangToggle() {
  const dispatch = useAppDispatch();
  const { lang, t } = useT();
  return (
    <div role="group" aria-label={t(ui.a11y.language)} className="flex rounded-full border border-line p-[3px]">
      {(['en', 'id'] as Lang[]).map((l) => (
        <button
          key={l}
          type="button"
          aria-pressed={lang === l}
          onClick={() => dispatch(setLang(l))}
          className={cx(
            'min-h-[30px] rounded-full px-2.5 text-[11px] font-semibold uppercase tracking-wider transition-colors',
            lang === l ? 'bg-ink text-on-ink' : 'text-ink hover:text-rose',
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

function ThemeToggle() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((s) => s.theme.current);
  const { lang } = useT();
  const label = theme === 'dark'
    ? (lang === 'id' ? 'Ganti ke latar siang' : 'Switch to day theme')
    : (lang === 'id' ? 'Ganti ke latar malam' : 'Switch to night theme');
  return (
    <button
      type="button"
      onClick={() => dispatch(toggleTheme())}
      aria-label={label}
      title={label}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-card text-ink transition-colors hover:text-rose"
    >
      {theme === 'dark' ? <Sun size={18} strokeWidth={1.6} /> : <Moon size={18} strokeWidth={1.6} />}
    </button>
  );
}

function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useT();
  const router = useRouter();
  const [q, setQ] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const pages = useMemo(
    // The search also finds the detail pages that are linked from Experience and Education rather than the menu.
    () => [...navItems, ...detailPages].map((n) => ({ href: n.href, label: ui.nav[n.key] })),
    [],
  );
  const results = pages.filter((p) => `${p.label.en} ${p.label.id}`.toLowerCase().includes(q.trim().toLowerCase()));

  useEffect(() => {
    if (!open) return;
    setQ('');
    const id = setTimeout(() => inputRef.current?.focus(), 30);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(id);
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  const go = (href: string) => {
    onClose();
    router.push(href);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-start justify-center bg-blush/80 px-5 pt-[14vh] backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t(ui.a11y.search)}
            className="w-full max-w-lg rounded-3xl border border-line bg-card p-4 shadow-[var(--shadow-photo)]"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 12, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (results[0]) go(results[0].href);
              }}
              className="flex items-center gap-3 border-b border-line px-2 pb-3"
            >
              <Search size={18} strokeWidth={1.6} className="text-muted" aria-hidden />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t(ui.search.placeholder)}
                aria-label={t(ui.a11y.search)}
                className="w-full bg-transparent py-2 text-base text-ink placeholder:text-muted focus:outline-none"
              />
            </form>
            <ul className="mt-2 max-h-[50vh] overflow-auto">
              {results.length === 0 && <li className="px-3 py-4 text-sm text-muted">{t(ui.search.empty)}</li>}
              {results.map((r) => (
                <li key={r.href}>
                  <button type="button" onClick={() => go(r.href)} className="w-full rounded-2xl px-3 py-3 text-left font-serif text-xl italic text-ink hover:bg-surface">
                    {t(r.label)}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { t } = useT();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
      <nav
        aria-label={t(ui.a11y.mainNav)}
        className="mx-auto flex max-w-[1320px] items-center gap-3 rounded-[22px] border border-white/70 bg-white/55 px-4 py-2.5 shadow-[var(--shadow-soft)] backdrop-blur-xl dark:border-white/10 dark:bg-[#2b1d23]/70 sm:px-5"
      >
        <Logo />
        <ul className="mx-auto hidden flex-wrap justify-center gap-0.5 xl:flex">
          {navItems.map((n) => {
            const active = isActive(pathname, n.key, n.href);
            return (
              <li key={n.key}>
                <Link
                  href={n.href}
                  aria-current={active ? 'page' : undefined}
                  className={cx('relative block px-2.5 py-2.5 text-[13px] text-ink transition-colors hover:text-rose', active && 'font-semibold')}
                >
                  {t(ui.nav[n.key])}
                  {active && (
                    <motion.span layoutId="nav-dot" className="absolute bottom-0.5 left-1/2 -ml-[2.5px] h-[5px] w-[5px] rounded-full bg-rose" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="ml-auto flex items-center gap-2 xl:ml-0">
          <div className="hidden sm:block">
            <LangToggle />
          </div>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label={t(ui.a11y.search)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-card text-ink transition-colors hover:text-rose"
          >
            <Search size={18} strokeWidth={1.6} />
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label={t(ui.a11y.openMenu)}
            aria-expanded={menuOpen}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-on-ink xl:hidden"
          >
            <Menu size={18} strokeWidth={1.8} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[55] flex flex-col bg-blush px-6 pb-10 pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-between">
              <Logo />
              <button type="button" onClick={() => setMenuOpen(false)} aria-label={t(ui.a11y.closeMenu)} className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink">
                <X size={18} />
              </button>
            </div>
            <ul className="mt-10 flex flex-col gap-1">
              {navItems.map((n, i) => (
                <motion.li key={n.key} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i }}>
                  <Link href={n.href} className="block py-1.5 font-serif text-4xl italic text-ink">
                    {t(ui.nav[n.key])}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto">
              <LangToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchDialog open={searchOpen} onClose={closeSearch} />
    </header>
  );
}
