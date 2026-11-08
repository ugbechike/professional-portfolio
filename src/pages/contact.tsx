import type { InferGetStaticPropsType } from 'next';
import { useState } from 'react';
import { Layout } from '@/components/layout/layout';
import { Seo } from '@/components/ui/seo';
import { getSiteContent } from '@/modules/content/services/content';
export const getStaticProps = async () => ({ props: await getSiteContent() });
const Contact = (site: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [status, setStatus] = useState('');
  const copyEmail = async () => {
    if (!site.profile.email) return;
    try {
      await navigator.clipboard.writeText(site.profile.email);
      setStatus('Email address copied.');
    } catch {
      setStatus('Could not copy. Please select and copy the address above.');
    }
  };
  return (
    <Layout {...site}>
      <Seo title="Contact" description="Get in touch with John Ugbe." />
      <div className="shell">
        <header className="page-hero">
          <div className="eyebrow">{'// contact'}</div>
          <h1>Let’s talk.</h1>
          <p>
            Have a product in mind, an engineering question, or something you’d
            like to discuss? Send me a note.
          </p>
        </header>
        {site.profile.email && (
          <section className="email-frame" aria-label="Email John">
            <div className="eyebrow">$ mail</div>
            <a className="email-address" href={`mailto:${site.profile.email}`}>
              {site.profile.email}
            </a>
            <div className="actions">
              <a className="button" href={`mailto:${site.profile.email}`}>
                Send an email →
              </a>
              <button
                className="button secondary"
                type="button"
                onClick={copyEmail}
              >
                Copy address
              </button>
            </div>
            <p className="copy-status" role="status">
              {status}
            </p>
          </section>
        )}
        <section className="section">
          <h2 className="section-label">{'// elsewhere'}</h2>
          <ul className="social-list">
            {site.profile.links.map((link) => (
              <li key={link.url}>
                <a href={link.url} target="_blank" rel="noreferrer">
                  {link.label}
                  <span aria-hidden="true">↗</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Layout>
  );
};
export default Contact;
