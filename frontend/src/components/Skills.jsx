import { usePortfolio } from '../lib/PortfolioContext'
import Section from './Section'

const CATEGORIES = [
  ['languages', 'Languages'],
  ['frontend', 'Frontend'],
  ['backend', 'Backend'],
  ['databases', 'Databases'],
  ['tools', 'Tools'],
]

export default function Skills() {
  const { skills } = usePortfolio()

  return (
    <Section id="skills" title="Skills">
      <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
        {CATEGORIES.map(([key, label]) => {
          const items = skills.filter((s) => s.category === key)
          if (!items.length) return null
          return (
            <div key={key}>
              <h3 className="border-b border-line pb-2 text-lg font-bold">{label}</h3>
              <ul className="mt-3 space-y-1.5 text-muted">
                {items.map((s) => (
                  <li key={s.name}>{s.name}</li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
