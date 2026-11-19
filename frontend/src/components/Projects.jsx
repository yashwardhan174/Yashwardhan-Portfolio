import { Github, Globe } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { usePortfolio } from '../lib/PortfolioContext'
import ProjectCover from './ProjectCover'
import Section from './Section'
import { TagList } from './Tag'

function ProjectLinks({ project }) {
  return (
    <div className="flex flex-wrap gap-4 text-sm font-semibold">
      <Link to={`/projects/${project.slug}`} className="text-accent hover:underline">
        Read case study
      </Link>
      {project.live_url && (
        <a href={project.live_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-accent">
          <Globe size={16} aria-hidden="true" /> Live demo
        </a>
      )}
      {project.github_url && (
        <a href={project.github_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-accent">
          <Github size={16} aria-hidden="true" /> Code
        </a>
      )}
    </div>
  )
}

function FeaturedProject({ project }) {
  return (
    <article className="grid items-center gap-8 rounded-2xl border border-line bg-surface p-5 sm:p-8 lg:grid-cols-2 transition duration-300 hover:border-accent/60 hover:shadow-xl hover:shadow-accent/10 motion-safe:hover:-translate-y-1">
      <Link to={`/projects/${project.slug}`} tabIndex={-1}>
        <ProjectCover project={project} className="aspect-[16/10]" />
      </Link>
      <div>
        <p className="text-sm font-semibold text-gold">Featured</p>
        <h3 className="mt-1 text-3xl font-bold">
          <Link to={`/projects/${project.slug}`} className="hover:text-accent">
            {project.title}
          </Link>
        </h3>
        <p className="mt-3 text-lg text-muted">{project.summary}</p>
        <TagList items={project.tech_stack} className="mt-5" />
        <div className="mt-6">
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  )
}

function ProjectRow({ project }) {
  return (
    <article className="grid gap-5 rounded-xl border-t border-line px-3 py-8 transition duration-300 hover:bg-surface hover:shadow-xl hover:shadow-accent/10 sm:grid-cols-[14rem_1fr] sm:gap-8 sm:px-4 motion-safe:hover:-translate-y-1">
      <Link to={`/projects/${project.slug}`} tabIndex={-1}>
        <ProjectCover project={project} className="aspect-[16/10]" />
      </Link>
      <div>
        <h3 className="text-2xl font-bold">
          <Link to={`/projects/${project.slug}`} className="hover:text-accent">
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 max-w-prose text-muted">{project.summary}</p>
        <TagList items={project.tech_stack} className="mt-4" />
        <div className="mt-5">
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  const { projects } = usePortfolio()
  const [filter, setFilter] = useState('All')

  const techs = useMemo(() => {
    const counts = new Map()
    projects.forEach((p) => p.tech_stack.forEach((t) => counts.set(t, (counts.get(t) || 0) + 1)))
    return ['All', ...[...counts.entries()].sort((a, b) => b[1] - a[1]).map(([t]) => t).slice(0, 8)]
  }, [projects])

  const visible = filter === 'All' ? projects : projects.filter((p) => p.tech_stack.includes(filter))
  const featured = visible.filter((p) => p.featured)
  const rest = visible.filter((p) => !p.featured)

  return (
    <Section id="projects" title="Projects" intro="Each project has a short case study: the problem, how I built it, and what was hard.">
      {projects.length > 2 && (
        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects by technology">
          {techs.map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={filter === t}
              onClick={() => setFilter(t)}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                filter === t ? 'border-accent bg-accent text-page' : 'border-line text-muted hover:border-accent hover:text-ink'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      )}

      <div className="space-y-10">
        {featured.map((p) => (
          <FeaturedProject key={p.slug} project={p} />
        ))}
        {rest.length > 0 && (
          <div className="border-b border-line">
            {rest.map((p) => (
              <ProjectRow key={p.slug} project={p} />
            ))}
          </div>
        )}
        {visible.length === 0 && <p className="text-muted">No projects use {filter} yet. Choose another filter.</p>}
      </div>
    </Section>
  )
}
