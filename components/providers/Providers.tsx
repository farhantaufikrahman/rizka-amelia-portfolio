'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { MotionConfig } from 'framer-motion';
import { makeStore, setLang, setTheme, STORAGE_KEYS, useAppSelector, useAppDispatch, type AppStore, type Theme } from '@/lib/store';
import type { Lang } from '@/lib/i18n';

/** Keeps <html lang/data-theme> and localStorage in sync with the Redux store. */
function PreferenceSync() {
  const dispatch = useAppDispatch();
  const lang = useAppSelector((s) => s.lang.current);
  const theme = useAppSelector((s) => s.theme.current);
  const [ready, setReady] = useState(false);

  // 1) Hydrate the store once from what the no-flash script already applied.
  useEffect(() => {
    const root = document.documentElement;
    const savedLang = (localStorage.getItem(STORAGE_KEYS.lang) as Lang | null) ?? 'en';
    const appliedTheme = (root.dataset.theme as Theme | undefined) ?? 'light';
    dispatch(setLang(savedLang === 'id' ? 'id' : 'en'));
    dispatch(setTheme(appliedTheme === 'dark' ? 'dark' : 'light'));
    setReady(true);
  }, [dispatch]);

  // 2) Reflect every change back to the document and storage.
  useEffect(() => {
    if (!ready) return;
    const root = document.documentElement;
    root.lang = lang;
    root.dataset.theme = theme;
    localStorage.setItem(STORAGE_KEYS.lang, lang);
    localStorage.setItem(STORAGE_KEYS.theme, theme);
  }, [lang, theme, ready]);

  return null;
}

export default function Providers({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) storeRef.current = makeStore();

  return (
    <Provider store={storeRef.current}>
      <MotionConfig reducedMotion="user">
        <PreferenceSync />
        {children}
      </MotionConfig>
    </Provider>
  );
}

