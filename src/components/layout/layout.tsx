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
      <header className="header">
        <div className="header-bar shell">
          <Link
            href="/"
            className="wordmark"
            aria-label={`${profile.name} home`}
          >
            {profile.name}
            <span aria-hidden="true">®</span>
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
            <a className="nav-contact" href="#contact" onClick={menu.close}>
              Contact
            </a>
          </nav>
          <div className="header-actions">
            <a className="contact-link" href="#contact" onClick={menu.close}>
              Let’s talk <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <button
              type="button"
              className="icon-button"
              onClick={theme.toggle}
              aria-label={`Switch to ${theme.theme === 'dark' ? 'light' : 'dark'} theme`}
            >
              {theme.theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
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
        </div>
      </header>
      <main id="main">{children}</main>
      <footer id="contact" className="footer">
        <div className="shell">
          <div className="eyebrow">
            <span className="status-dot" /> Contact
          </div>
          <div className="contact-heading">
            <div>
              <h2>
                Tell me about
                <br />
                the product<span className="accent">.</span>
              </h2>
              <p className="footer-lede">Email is the direct line.</p>
            </div>
            <a
              className="round-link"
              aria-label={
                profile.email
                  ? `Email ${profile.name}`
                  : `Visit ${profile.name} on GitHub`
              }
              href={
                profile.email
                  ? `mailto:${profile.email}`
                  : profile.links[0]?.url
              }
            >
              <ArrowUpRight size={32} aria-hidden="true" />
            </a>
          </div>
          <div className="footer-links">
            {profile.email && (
              <a href={`mailto:${profile.email}`}>
                {profile.email} <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            )}
            {profile.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
                <ArrowUpRight size={15} aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ))}
          </div>
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} {profile.name}
            </span>
            <span>{profile.role}</span>
            <a href="#main">
              Back to top <ArrowUp size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};
