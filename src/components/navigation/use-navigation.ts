import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
const themeColor = (value: string) => (value === 'light' ? '#F3F2EC' : '#1B1D1C');
const applyThemeColor = (value: string) => {
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', themeColor(value));
};
export const useNavigation = () => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(open);
  const router = useRouter();
  useEffect(() => {
    openRef.current = open;
  }, [open]);
  useEffect(() => {
    const close = () => setOpen(false);
    router.events.on('routeChangeStart', close);
    return () => router.events.off('routeChangeStart', close);
  }, [router.events]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !openRef.current) return;
      setOpen(false);
      document.getElementById('menu-toggle')?.focus();
    };
    const onResize = () => {
      if (window.innerWidth > 960) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);
  return {
    open,
    toggle: () => setOpen((value) => !value),
    close: () => setOpen(false),
    asPath: router.asPath,
  };
};
export const useTheme = () => {
  const [theme, setTheme] = useState('dark');
  useEffect(() => {
    const current = document.documentElement.dataset.theme || 'dark';
    queueMicrotask(() => {
      setTheme(current);
      applyThemeColor(current);
    });
  }, []);
  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    applyThemeColor(next);
    try {
      localStorage.setItem('portfolio-theme', next);
    } catch {}
  };
  return { theme, toggle };
};
