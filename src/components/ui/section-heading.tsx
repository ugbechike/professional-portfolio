import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
export const SectionHeading = ({
  label,
  title,
  href,
  link,
}: {
  label: string;
  title: string;
  href?: string;
  link?: string;
}) => (
  <div className="section-heading">
    <div>
      <div className="eyebrow">{label}</div>
      <h2>{title}</h2>
    </div>
    {href && (
      <Link className="text-link" href={href}>
        {link}
        <ArrowUpRight size={17} />
      </Link>
    )}
  </div>
);
