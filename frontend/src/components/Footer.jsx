import { usePortfolio } from '../lib/PortfolioContext'

export default function Footer() {
  const { profile } = usePortfolio()
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 px-5 py-8 text-sm text-muted sm:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>Built with React, Vite and Tailwind CSS.</p>
      </div>
    </footer>
  )
}
