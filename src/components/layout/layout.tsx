import Link from 'next/link';
import { ArrowUpRight, Sun, Moon, Menu, X, ArrowUp } from 'lucide-react';
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
        <Link href="/" className="wordmark" aria-label="John Ugbe home">
          john ugbe<span>®</span>
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
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <a className="contact-link" href="#contact" onClick={menu.close}>
            Let’s talk <ArrowUpRight size={15} />
          </a>
          <button
            className="icon-button"
            onClick={theme.toggle}
            aria-label={`Switch to ${theme.theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme.theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
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
      <footer id="contact" className="shell footer">
        <div className="eyebrow">
          <span className="status-dot" /> MAKE SOMETHING THAT MATTERS
        </div>
        <div className="contact-heading">
          <h2>
            Good products start
            <br />
            with a conversation<span className="accent">.</span>
          </h2>
          <a
            className="round-link"
            aria-label={profile.email ? 'Email John' : 'Visit John on GitHub'}
            href={
              profile.email ? `mailto:${profile.email}` : profile.links[0]?.url
            }
          >
            <ArrowUpRight size={35} />
          </a>
        </div>
        <div className="footer-links">
          {profile.email && (
            <a href={`mailto:${profile.email}`}>
              {profile.email} <ArrowUpRight size={15} />
            </a>
          )}
          {profile.links.map((link) => (
            <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
              {link.label}
              <ArrowUpRight size={15} />
            </a>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} John Ugbe</span>
          <span>Built with intention. Always in progress.</span>
          <a href="#main">
            Back to top <ArrowUp size={14} />
          </a>
        </div>
      </footer>
    </>
  );
};
