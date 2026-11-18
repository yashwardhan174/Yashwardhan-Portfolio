import { formatMonth } from '../lib/format'
import { usePortfolio } from '../lib/PortfolioContext'
import Section from './Section'

export default function Certifications() {
  const { certifications } = usePortfolio()
  if (!certifications?.length) return null

  return (
    <Section id="certifications" title="Certifications">
      <ul className="divide-y divide-line border-y border-line">
        {certifications.map((c, i) => (
          <li key={i} className="flex flex-wrap items-baseline justify-between gap-2 py-4">
            <div>
              <p className="font-semibold">
                {c.credential_url ? (
                  <a href={c.credential_url} target="_blank" rel="noreferrer" className="hover:text-accent hover:underline">
                    {c.name}
                  </a>
                ) : (
                  c.name
                )}
              </p>
              <p className="text-sm text-muted">{c.issuer}</p>
            </div>
            {c.issued_on && <p className="text-sm tabular-nums text-muted">{formatMonth(c.issued_on)}</p>}
          </li>
        ))}
      </ul>
    </Section>
  )
}
