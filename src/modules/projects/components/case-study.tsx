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
  <article
    className={
      project.caseStudy.format === 'narrative'
        ? 'shell case-study-narrative'
        : 'shell'
    }
  >
    <header className="page-hero">
      <Link className="detail-back" href="/work">
        <ArrowLeft size={15} /> All work
      </Link>
      <div className="eyebrow">
        {project.category.join(' / ').toUpperCase()}
      </div>
      <h1>
        {project.title}
        {project.caseStudy.format !== 'narrative' && (
          <span className="accent">.</span>
        )}
      </h1>
      <p>{project.caseStudy.subtitle ?? project.summary}</p>
      {project.caseStudy.metadata?.length ? (
        <dl className="case-study-metadata">
          {project.caseStudy.metadata.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <div className="detail-meta">
          <div>
            <div className="eyebrow">ROLE & OWNERSHIP</div>
            <p>{project.role}</p>
          </div>
          {project.stack.length > 0 && (
            <div>
              <div className="eyebrow">TECHNOLOGIES & TOOLS</div>
              <div className="tags">
                {project.stack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      {project.caseStudy.tableOfContents && (
        <nav className="case-study-contents" aria-label="Case study contents">
          <p className="eyebrow">{'// in this case study'}</p>
          <ul>
            {project.caseStudy.sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>
                  {section.navigationLabel ?? section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
    <div className="detail-layout">
      <div className="prose">
        {!project.caseStudy.sections.length && (
          <section>
            <p>
              Full case study not yet published. The engagement details below
              reflect the work shared so far.
            </p>
          </section>
        )}
        {project.caseStudy.sections.map((section) => (
          <section key={section.id ?? section.title} id={section.id}>
            <h2>{section.title}</h2>
            {section.body
              .split(/\n\s*\n/)
              .filter(Boolean)
              .map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            {section.items?.length ? (
              <ul>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
            {section.image && section.image.kind !== 'illustration' && (
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
        {project.caseStudy.format !== 'narrative' && (
          <>
            <ListSection
              title="The engineering challenges"
              items={project.challenges}
            />
            <ListSection
              title="My contributions"
              items={project.contributions}
            />
            <ListSection
              title="Engineering decisions"
              items={project.decisions}
            />
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
          </>
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
