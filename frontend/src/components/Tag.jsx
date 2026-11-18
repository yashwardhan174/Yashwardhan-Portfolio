export default function Tag({ children }) {
  return (
    <li className="rounded-full border border-line px-2.5 py-0.5 text-sm text-muted">{children}</li>
  )
}

export function TagList({ items, className = '' }) {
  if (!items?.length) return null
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`} aria-label="Technologies">
      {items.map((t) => (
        <Tag key={t}>{t}</Tag>
      ))}
    </ul>
  )
}
