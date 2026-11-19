import { Github, Linkedin, Mail, MapPin } from 'lucide-react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { usePortfolio } from '../lib/PortfolioContext'

/**
 * Renders the name one letter at a time so a glint can travel from the first
 * letter to the last. Each letter takes its colour from the cyan gradient.
 */
function ShiningName({ name }) {
  const letters = [...name].filter((c) => c !== ' ').length
  let index = 0

  return (
    <>
      <span className="sr-only">{name}</span>
      <span aria-hidden="true">
        {name.split(' ').map((word, w) => (
          <Fragment key={w}>
            {w > 0 && ' '}
            <span className="inline-block whitespace-nowrap">
            {[...word].map((char) => {
              const i = index++
              const mix = letters > 1 ? Math.round((i / (letters - 1)) * 100) : 0
              return (
                <span
                  key={i}
                  className="name-letter"
                  style={{
                    color: `color-mix(in srgb, rgb(var(--marigold)) ${mix}%, rgb(var(--accent)))`,
                    animationDelay: `${1000 + i * 70}ms`,
                  }}
                >
                  {char}
                </span>
              )
            })}
            </span>
          </Fragment>
        ))}
      </span>
    </>
  )
}

export default function Hero() {
  const { profile } = usePortfolio()

  return (
    <section className="mx-auto max-w-6xl px-5 pb-16 pt-16 sm:px-8 sm:pt-24">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
        <div>
      {profile.open_to_work && (
        <p className="hero-item mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-sm">
          <span className="h-2 w-2 rounded-full bg-gold motion-safe:animate-pulse" aria-hidden="true" />
          {profile.availability_note || 'Open to work'}
        </p>
      )}

      <h1
        className="hero-item max-w-4xl text-5xl font-bold leading-[1.02] tracking-tight sm:text-7xl lg:text-7xl"
        style={{ animationDelay: '80ms' }}
      >
        <ShiningName name={profile.name} />
      </h1>
      <p className="hero-item mt-6 max-w-3xl font-display text-2xl font-medium text-ink sm:text-3xl" style={{ animationDelay: '180ms' }}>
        {profile.headline}
      </p>
      <p className="hero-item mt-5 max-w-prose text-lg text-muted" style={{ animationDelay: '280ms' }}>
        {profile.short_bio}
      </p>

      <div className="hero-item mt-9 flex flex-wrap items-center gap-3" style={{ animationDelay: '380ms' }}>
        <Link to="/#projects" className="btn-shine rounded-md px-5 py-3 font-semibold text-page">
          View projects
        </Link>
        {profile.resume_url && (
          <a
            href={profile.resume_url}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-line bg-surface px-5 py-3 font-semibold transition duration-300 hover:border-accent hover:text-accent hover:shadow-[0_0_24px_-6px_rgb(var(--accent)/0.7)] motion-safe:hover:-translate-y-0.5"
          >
            Download resume
          </a>
        )}
      </div>

      <ul className="hero-item mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-muted" style={{ animationDelay: '480ms' }}>
        {profile.location && (
          <li className="flex items-center gap-1.5">
            <MapPin size={18} aria-hidden="true" /> {profile.location}
          </li>
        )}
        {profile.github_url && (
          <li>
            <a href={profile.github_url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-ink">
              <Github size={18} aria-hidden="true" /> GitHub
            </a>
          </li>
        )}
        {profile.linkedin_url && (
          <li>
            <a href={profile.linkedin_url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-ink">
              <Linkedin size={18} aria-hidden="true" /> LinkedIn
            </a>
          </li>
        )}
        <li>
          <a href={`mailto:${profile.email}`} className="flex items-center gap-1.5 hover:text-ink">
            <Mail size={18} aria-hidden="true" /> {profile.email}
          </a>
        </li>
      </ul>
        </div>

        {profile.photo_url && (
          <div className="hero-item order-first mx-auto lg:order-none" style={{ animationDelay: '150ms' }}>
            <div className="relative h-44 w-44 sm:h-56 sm:w-56 lg:h-80 lg:w-80">
              {/* Rotating cyan arc around the photo */}
              <span
                className="absolute -inset-4 rounded-full border-2 border-transparent border-r-accent border-t-accent motion-safe:animate-[spin_12s_linear_infinite]"
                aria-hidden="true"
              />
              {/* Gold arc spinning the other way */}
              <span
                className="absolute -inset-7 rounded-full border-2 border-transparent border-b-gold/80 border-l-gold/80 motion-safe:animate-[spin_18s_linear_infinite_reverse]"
                aria-hidden="true"
              />
              <span className="absolute -inset-2 rounded-full border border-accent/30" aria-hidden="true" />
              <img
                src={profile.photo_url}
                alt={`Photo of ${profile.name}`}
                width="320"
                height="320"
                className="relative h-full w-full rounded-full object-cover object-[50%_18%] shadow-[0_0_70px_-12px_rgb(var(--accent)/0.65)] ring-4 ring-accent"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
