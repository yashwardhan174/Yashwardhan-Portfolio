import { initials } from '../lib/format'

/** Project screenshot, or a generated cover when no image has been added yet. */
export default function ProjectCover({ project, className = '' }) {
  if (project.thumbnail_url) {
    return (
      <img
        src={project.thumbnail_url}
        alt={`Screenshot of ${project.title}`}
        loading="lazy"
        className={`w-full rounded-lg border border-line object-cover object-top ${className}`}
      />
    )
  }
  return (
    <div
      className={`flex w-full items-end justify-between overflow-hidden rounded-lg border border-line bg-accent/10 p-5 ${className}`}
      aria-hidden="true"
    >
      <span className="font-display text-6xl font-bold leading-none text-accent/80">{initials(project.title)}</span>
      <span className="max-w-[60%] text-right font-mono text-xs leading-relaxed text-accent/70">
        {project.tech_stack.join(' / ')}
      </span>
    </div>
  )
}
