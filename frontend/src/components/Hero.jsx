import { Github, Linkedin, Mail, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { usePortfolio } from '../lib/PortfolioContext'

export default function Hero() {
  const { profile } = usePortfolio()

  return (
    <section className="mx-auto max-w-6xl px-5 pb-16 pt-16 sm:px-8 sm:pt-24">
      {profile.open_to_work && (
        <p className="hero-item mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-sm">
          <span className="h-2 w-2 rounded-full bg-marigold motion-safe:animate-pulse" aria-hidden="true" />
          {profile.availability_note || 'Open to work'}
        </p>
      )}

      <h1
        className="hero-item max-w-4xl text-5xl font-bold leading-[1.02] tracking-tight sm:text-7xl lg:text-8xl"
        style={{ animationDelay: '80ms' }}
      >
        <span className="bg-gradient-to-r from-accent to-marigold bg-clip-text pb-2 text-transparent">{profile.name}</span>
      </h1>
      <p className="hero-item mt-6 max-w-3xl font-display text-2xl font-medium text-ink sm:text-3xl" style={{ animationDelay: '180ms' }}>
        {profile.headline}
      </p>
      <p className="hero-item mt-5 max-w-prose text-lg text-muted" style={{ animationDelay: '280ms' }}>
        {profile.short_bio}
      </p>

      <div className="hero-item mt-9 flex flex-wrap items-center gap-3" style={{ animationDelay: '380ms' }}>
        <Link to="/#projects" className="rounded-md bg-accent px-5 py-3 font-semibold text-page transition hover:bg-accent/90 motion-safe:hover:-translate-y-0.5">
          View projects
        </Link>
        {profile.resume_url && (
          <a
            href={profile.resume_url}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-line bg-surface px-5 py-3 font-semibold transition hover:border-accent motion-safe:hover:-translate-y-0.5"
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
    </section>
  )
}
