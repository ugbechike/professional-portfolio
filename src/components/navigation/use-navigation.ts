import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
export const useNavigation = () => {
  const [open, setOpen] = useState(false);
  const { asPath } = useRouter();
  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        document.getElementById('menu-toggle')?.focus();
      }
    };
    window.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  }, []);
  return {
    open,
    toggle: () => setOpen((value) => !value),
    close: () => setOpen(false),
    asPath,
  };
};
export const useTheme = () => {
  const [theme, setTheme] = useState('dark');
  useEffect(() => {
    const current = document.documentElement.dataset.theme || 'dark';
    queueMicrotask(() => setTheme(current));
  }, []);
  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('portfolio-theme', next);
    } catch {}
  };
  return { theme, toggle };
};
