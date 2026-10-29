import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import type { Project } from '@/modules/content/types/content';
const ListSection = ({ title, items }: { title: string; items: string[] }) =>
  items.length ? (
    <section>
      <h2>{title}</h2>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  ) : null;
export const CaseStudy = ({ project }: { project: Project }) => (
  <article className="shell">
    <header className="page-hero">
      <Link className="detail-back" href="/work">
        <ArrowLeft size={15} /> All work
      </Link>
      <div className="eyebrow">
        {project.category.join(' / ').toUpperCase()}
      </div>
      <h1>
        {project.title}
        <span className="accent">.</span>
      </h1>
      <p>{project.summary}</p>
      <div className="detail-meta">
        <div>
          <div className="eyebrow">ROLE & OWNERSHIP</div>
          <p>{project.role}</p>
        </div>
        <div>
          <div className="eyebrow">TECHNOLOGIES & TOOLS</div>
          <div className="tags">
            {project.stack.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </div>
      </div>
    </header>
    {project.images[0] && (
      <Image
        className="detail-cover"
        src={project.images[0].src}
        alt={project.images[0].alt}
        width={project.images[0].width}
        height={project.images[0].height}
        priority
      />
    )}
    <div className="detail-layout">
      <aside className="detail-aside">
        <div className="eyebrow">ENGAGEMENT NOTES</div>
        <p>{project.role}</p>
        {project.startDate && (
          <p>
            {project.startDate} — {project.endDate || 'Present'}
          </p>
        )}
        <p>Project artwork is an abstract illustration.</p>
      </aside>
      <div className="prose">
        {project.caseStudy.sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
            {section.image && (
              <Image
                src={section.image.src}
                alt={section.image.alt}
                width={section.image.width}
                height={section.image.height}
              />
            )}{' '}
            {section.code && (
              <pre>
                <code>{section.code}</code>
              </pre>
            )}
            {section.diagram && (
              <pre aria-label="Architecture diagram">{section.diagram}</pre>
            )}
          </section>
        ))}
        <ListSection
          title="The engineering challenges"
          items={project.challenges}
        />
        <ListSection title="My contributions" items={project.contributions} />
        <ListSection title="Engineering decisions" items={project.decisions} />
        <ListSection title="Outcomes" items={project.outcomes} />
        {project.metrics.length > 0 && (
          <section>
            <h2>Results, with context.</h2>
            <div className="metrics">
              {project.metrics.map((metric) => (
                <div className="metric" key={metric.label}>
                  <span className="badge">
                    {metric.scope === 'development'
                      ? 'Local development observation'
                      : `${metric.scope} outcome`}
                  </span>
                  <div>
                    <strong>{metric.value}</strong>
                  </div>
                  <h3>{metric.label}</h3>
                  <p>{metric.context}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        {project.links.length > 0 && (
          <div className="detail-links">
            {project.links.map((link) => (
              <a
                className="text-link"
                href={link.url}
                key={link.url}
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
                <ArrowUpRight size={16} />
              </a>
            ))}
          </div>
        )}
        <Link className="text-link" href="/work">
          Explore more work <ArrowUpRight size={16} />
        </Link>
      </div>
    </div>
  </article>
);
