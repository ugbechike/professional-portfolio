import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
export const SectionHeading = ({
  label,
  title,
  href,
  link,
  description,
  id,
}: {
  label: string;
  title: string;
  href?: string;
  link?: string;
  description?: string;
  id?: string;
}) => (
  <div className="section-heading">
    <div>
      <div className="eyebrow">{label}</div>
      <h2 id={id}>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
    {href && link ? (
      <Link className="text-link" href={href}>
        {link}
        <ArrowUpRight size={16} aria-hidden="true" />
      </Link>
    ) : null}
  </div>
);
