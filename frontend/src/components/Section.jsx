import { useReveal } from '../lib/useReveal'

export default function Section({ id, title, intro, children, className = '' }) {
  const [ref, visible] = useReveal()

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={`${id}-title`}
      className={`reveal mx-auto max-w-6xl px-5 py-20 sm:px-8 ${visible ? 'is-visible' : ''} ${className}`}
    >
      <h2 id={`${id}-title`} className="text-3xl font-bold sm:text-4xl">
        {title}
      </h2>
      {intro && <p className="mt-3 max-w-prose text-muted">{intro}</p>}
      <div className="mt-10">{children}</div>
    </section>
  )
}
