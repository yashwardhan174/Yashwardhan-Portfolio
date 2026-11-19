import { Award, ExternalLink } from 'lucide-react'
import { formatRange } from '../lib/format'
import { usePortfolio } from '../lib/PortfolioContext'
import Section from './Section'
import { TagList } from './Tag'

export default function Experience() {
  const { experience } = usePortfolio()
  if (!experience?.length) return null

  return (
    <Section id="experience" title="Experience">
      <ol className="space-y-14">
        {experience.map((job, i) => (
          <li key={i} className="grid gap-3 md:grid-cols-[12rem_1fr] md:gap-10">
            <div className="text-muted">
              <p className="font-semibold tabular-nums text-ink">{formatRange(job.start_date, job.end_date)}</p>
              <p className="text-sm">
                {[job.employment_type, job.location].filter(Boolean).join(', ')}
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold">{job.role}</h3>
              <p className="mt-0.5 text-lg">
                {job.company_url ? (
                  <a href={job.company_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-accent hover:underline">
                    {job.company} <ExternalLink size={15} aria-hidden="true" />
                  </a>
                ) : (
                  <span className="text-accent">{job.company}</span>
                )}
              </p>
              {job.summary && <p className="mt-3 max-w-prose text-muted">{job.summary}</p>}
              <ul className="mt-4 max-w-prose list-disc space-y-2 pl-5 marker:text-accent">
                {job.highlights.map((h, j) => (
                  <li key={j}>{h}</li>
                ))}
              </ul>
              <TagList items={job.tech_stack} className="mt-5" />
              {job.certificate_url && (
                <a
                  href={job.certificate_url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-md border border-line bg-surface px-3.5 py-2 text-sm font-semibold transition hover:border-gold hover:text-gold hover:shadow-[0_0_20px_-6px_rgb(var(--gold)/0.7)]"
                >
                  <Award size={16} aria-hidden="true" /> {job.certificate_label || 'View certificate'}
                  <span className="sr-only">(PDF, opens in a new tab)</span>
                </a>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
