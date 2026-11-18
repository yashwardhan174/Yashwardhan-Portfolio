import { Menu, Moon, Sun, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { usePortfolio } from '../lib/PortfolioContext'
import { useTheme } from '../lib/useTheme'

const LINKS = [
  { href: '/#journey', label: 'Journey' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#contact', label: 'Contact' },
]

export default function Navbar() {
  const { profile } = usePortfolio()
  const [dark, toggleTheme] = useTheme()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-page/85 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8" aria-label="Main">
        <Link to="/" className="font-display text-lg font-bold" onClick={() => setOpen(false)}>
          {profile.name}
        </Link>

        <div className="flex items-center gap-1">
          <ul className="mr-2 hidden gap-1 md:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link to={l.href} className="rounded-md px-3 py-2 text-muted hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-md p-2 text-muted hover:text-ink"
            aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {profile.resume_url && (
            <a
              href={profile.resume_url}
              target="_blank"
              rel="noreferrer"
              className="ml-1 hidden rounded-md bg-accent px-3.5 py-2 font-semibold text-page hover:bg-accent/90 sm:inline-block"
            >
              Resume
            </a>
          )}

          <button
            type="button"
            className="rounded-md p-2 text-muted hover:text-ink md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <ul id="mobile-menu" className="border-t border-line bg-page px-5 pb-4 pt-2 md:hidden">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link to={l.href} onClick={() => setOpen(false)} className="block py-2.5 text-lg">
                {l.label}
              </Link>
            </li>
          ))}
          {profile.resume_url && (
            <li>
              <a href={profile.resume_url} target="_blank" rel="noreferrer" className="block py-2.5 text-lg text-accent">
                Resume (PDF)
              </a>
            </li>
          )}
        </ul>
      )}
    </header>
  )
}
