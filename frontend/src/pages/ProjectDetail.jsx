import { ArrowLeft, Github, Globe } from 'lucide-react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProjectCover from '../components/ProjectCover'
import { TagList } from '../components/Tag'
import { usePortfolio } from '../lib/PortfolioContext'
import NotFound from './NotFound'

const SECTIONS = [
  ['problem', 'The problem'],
  ['approach', 'How it\u2019s built'],
  ['challenges', 'Challenges'],
  ['outcome', 'Outcome'],
  ['next_steps', 'What\u2019s next'],
]

export default function ProjectDetail() {
  const { slug } = useParams()
  const { projects, profile } = usePortfolio()
  const project = projects.find((p) => p.slug === slug)

  useEffect(() => {
    if (project) document.title = `${project.title} – ${profile.name}`
  }, [project, profile.name])

  if (!project) return <NotFound />

  return (
    <article className="mx-auto max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
      <Link to="/#projects" className="inline-flex items-center gap-1.5 font-semibold text-muted hover:text-ink">
        <ArrowLeft size={18} aria-hidden="true" /> All projects
      </Link>

      <h1 className="mt-8 text-4xl font-bold sm:text-5xl">{project.title}</h1>
      <p className="mt-4 max-w-prose text-xl text-muted">{project.summary}</p>
      <TagList items={project.tech_stack} className="mt-6" />

      <div className="mt-6 flex flex-wrap gap-3">
        {project.live_url && (
          <a href={project.live_url} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 font-semibold text-page hover:bg-accent/90">
            <Globe size={18} aria-hidden="true" /> Open live demo
          </a>
        )}
        {project.github_url && (
          <a href={project.github_url} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-line bg-surface px-4 py-2.5 font-semibold hover:border-accent">
            <Github size={18} aria-hidden="true" /> View code
          </a>
        )}
      </div>

      {project.thumbnail_url && <ProjectCover project={project} className="mt-10 aspect-[16/9]" />}

      <div className="mt-12 space-y-10">
        {SECTIONS.filter(([key]) => project[key]).map(([key, label]) => (
          <section key={key} className="grid gap-2 md:grid-cols-[11rem_1fr] md:gap-8">
            <h2 className="text-xl font-bold">{label}</h2>
            <div className="max-w-prose space-y-3 text-lg text-muted">
              {project[key].split(/\n\s*\n/).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      {project.screenshot_urls?.length > 0 && (
        <section className="mt-14">
          <h2 className="text-xl font-bold">Screenshots</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {project.screenshot_urls.map((src, i) => (
              <img key={src} src={src} alt={`${project.title} screenshot ${i + 1}`} loading="lazy"
                className="w-full rounded-lg border border-line" />
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
