import { useEffect, useRef, useState } from 'react'
import { shortHash } from '../lib/format'
import { usePortfolio } from '../lib/PortfolioContext'
import Section from './Section'

const KIND_LABEL = {
  education: 'education',
  learning: 'learning',
  work: 'work',
  milestone: 'now',
}

/** Node marker for each kind of step. Work steps sit on a branch that merges back to main. */
function Node({ kind }) {
  if (kind === 'work') {
    // Branch out of main above the node, run alongside the step, merge back in the gap below it
    return (
      <span aria-hidden="true" className="text-accent">
        <svg className="absolute left-0 top-[-22px] h-[34px] w-12" viewBox="0 0 48 34" fill="none">
          <path d="M12 0 C12 20, 36 14, 36 34" stroke="currentColor" strokeWidth="2" />
        </svg>
        <span className="absolute bottom-[30px] left-[35px] top-[12px] w-0.5 bg-current" />
        <svg className="absolute bottom-0 left-0 h-[30px] w-12" viewBox="0 0 48 30" fill="none">
          <path d="M36 0 C36 18, 12 12, 12 30" stroke="currentColor" strokeWidth="2" />
        </svg>
        <span className="absolute left-[29px] top-[5px] h-3.5 w-3.5 rotate-45 rounded-[3px] bg-accent ring-4 ring-page" />
      </span>
    )
  }
  const styles = {
    education: 'border-2 border-ink bg-page',
    learning: 'bg-accent',
    milestone: 'h-4 w-4 left-[4px] top-[5px] bg-marigold ring-[6px] ring-marigold/25',
  }
  return (
    <span
      className={`absolute left-[6px] top-[6px] h-3 w-3 rounded-full ring-4 ring-page ${styles[kind] || styles.learning}`}
    />
  )
}

export default function Journey() {
  const { profile, timeline } = usePortfolio()
  const ref = useRef(null)
  const [drawn, setDrawn] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return setDrawn(true)
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true)
          io.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const paragraphs = (profile.about || '').split(/\n\s*\n/).filter(Boolean)

  return (
    <Section id="journey" title="My journey">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="space-y-4 text-lg text-muted lg:sticky lg:top-28 lg:self-start">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <ol ref={ref} className={`relative ${drawn ? 'is-drawn' : ''}`}>
          {/* main branch */}
          <span className="graph-line absolute bottom-3 left-[11px] top-3 w-0.5 bg-line" aria-hidden="true" />
          {timeline.map((step, i) => (
            <li
              key={`${step.title}-${i}`}
              className="graph-step relative pb-10 pl-14 last:pb-0"
              style={{ transitionDelay: `${150 + i * 110}ms` }}
            >
              <Node kind={step.kind} />
              <p className="flex flex-wrap items-baseline gap-x-3 text-sm text-muted">
                <code className="font-mono text-accent">{shortHash(step.title)}</code>
                <span>{step.date_label}</span>
                <span className={step.kind === 'milestone' ? 'font-semibold text-marigold' : ''}>
                  {KIND_LABEL[step.kind] || step.kind}
                </span>
              </p>
              <h3 className="mt-1 text-xl font-bold">{step.title}</h3>
              {step.description && <p className="mt-1.5 max-w-prose text-muted">{step.description}</p>}
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
