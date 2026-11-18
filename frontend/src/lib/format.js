const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** "2025-01-01" -> "Jan 2025" (parsed by hand to avoid timezone shifts) */
export function formatMonth(iso) {
  if (!iso) return ''
  const [year, month] = iso.split('-')
  return `${MONTHS[Number(month) - 1]} ${year}`
}

export function formatRange(start, end) {
  return `${formatMonth(start)} – ${end ? formatMonth(end) : 'Present'}`
}

/** Stable 7-character "commit hash" for a journey step, derived from its title */
export function shortHash(text) {
  let h = 5381
  for (let i = 0; i < text.length; i++) h = ((h << 5) + h + text.charCodeAt(i)) >>> 0
  return h.toString(16).padStart(8, '0').slice(0, 7)
}

/** "[MERN project name]" -> "MP" */
export function initials(text) {
  const words = text.replace(/[^\p{L}\p{N}\s]/gu, ' ').split(/\s+/).filter(Boolean)
  return words.slice(0, 2).map((w) => w[0].toUpperCase()).join('') || '•'
}
