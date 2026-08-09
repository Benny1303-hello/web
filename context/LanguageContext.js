'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import vi from '@/locales/vi.json';
import en from '@/locales/en.json';

const dictionaries = { vi, en };
const STORAGE_KEY = 'ttc-language';
const DEFAULT_LANGUAGE = 'vi';

const LanguageContext = createContext({
  language: DEFAULT_LANGUAGE,
  setLanguage: () => {},
  t: (key) => key,
});

function resolve(dict, key) {
  return key.split('.').reduce((acc, part) => (acc && typeof acc === 'object' ? acc[part] : undefined), dict);
}

function interpolate(value, vars) {
  if (typeof value !== 'string' || !vars) return value;
  return value.replace(/\{(\w+)\}/g, (match, name) => (name in vars ? String(vars[name]) : match));
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(DEFAULT_LANGUAGE);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'vi' || stored === 'en') {
      setLanguageState(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((lang) => {
    if (lang !== 'vi' && lang !== 'en') return;
    setLanguageState(lang);
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, []);

  const t = useCallback(
    (key, vars) => {
      const value = resolve(dictionaries[language], key);
      if (value === undefined) {
        const fallback = resolve(dictionaries[DEFAULT_LANGUAGE], key);
        return fallback === undefined ? key : interpolate(fallback, vars);
      }
      return interpolate(value, vars);
    },
    [language]
  );

  const value = useMemo(() => ({ language, setLanguage, t }), [language, setLanguage, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
