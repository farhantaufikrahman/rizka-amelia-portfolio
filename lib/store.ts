import { configureStore, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { L, Lang } from './i18n';

/* ---------- Language (EN / ID) ---------- */
type LangState = { current: Lang };

const langSlice = createSlice({
  name: 'lang',
  initialState: { current: 'en' } as LangState,
  reducers: {
    setLang(state, action: PayloadAction<Lang>) {
      state.current = action.payload;
    },
    toggleLang(state) {
      state.current = state.current === 'en' ? 'id' : 'en';
    },
  },
});

/* ---------- Theme (day / night) ---------- */
export type Theme = 'light' | 'dark';
type ThemeState = { current: Theme };

const themeSlice = createSlice({
  name: 'theme',
  initialState: { current: 'light' } as ThemeState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.current = action.payload;
    },
    toggleTheme(state) {
      state.current = state.current === 'light' ? 'dark' : 'light';
    },
  },
});

export const { setLang, toggleLang } = langSlice.actions;
export const { setTheme, toggleTheme } = themeSlice.actions;

export const makeStore = () =>
  configureStore({
    reducer: { lang: langSlice.reducer, theme: themeSlice.reducer },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

/** Current language plus a translator for localized strings. */
export function useT() {
  const lang = useAppSelector((s) => s.lang.current);
  const t = (value: L) => value[lang];
  return { lang, t };
}

export { STORAGE_KEYS } from './storage-keys';
