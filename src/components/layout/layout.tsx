import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import type { ReactNode } from 'react';
import type { SiteContent } from '@/modules/content/types/content';
import {
  useNavigation,
  useTheme,
} from '@/components/navigation/use-navigation';
export const Layout = ({
  children,
  profile,
  navigation,
}: SiteContent & { children: ReactNode }) => {
  const menu = useNavigation();
  const theme = useTheme();
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="header shell">
        <div className="header-bar">
          <Link
            href="/"
            className="wordmark"
            aria-label={`${profile.name} home`}
          >
            ~/johnugbe
          </Link>
          <nav
            aria-label="Main navigation"
            className={menu.open ? 'nav is-open' : 'nav'}
            id="navigation"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={menu.close}
                aria-current={
                  menu.asPath.startsWith(item.href) ? 'page' : undefined
                }
              >
                {item.label.toLowerCase()}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            id="menu-toggle"
            className="icon-button menu-toggle"
            aria-label={menu.open ? 'Close menu' : 'Open menu'}
            aria-expanded={menu.open}
            aria-controls="navigation"
            onClick={menu.toggle}
          >
            {menu.open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>
      <main id="main">{children}</main>
      <footer id="contact" className="footer shell">
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {profile.name}
            {profile.location && ` · ${profile.location}`}
          </span>
          <div className="footer-links">
            {profile.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noreferrer"
              >
                {link.label.toLowerCase()} ↗
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ))}
          </div>
        </div>
        <button className="theme-toggle" type="button" onClick={theme.toggle}>
          Use {theme.theme === 'dark' ? 'light' : 'dark'} theme
        </button>
      </footer>
    </>
  );
};
