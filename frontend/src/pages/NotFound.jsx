import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-28 sm:px-8">
      <p className="font-mono text-accent">404</p>
      <h1 className="mt-3 text-4xl font-bold">This page doesn't exist</h1>
      <p className="mt-3 text-lg text-muted">The link may be old, or the project may have been renamed.</p>
      <Link to="/" className="mt-8 inline-block rounded-md bg-accent px-5 py-3 font-semibold text-page hover:bg-accent/90">
        Go to the homepage
      </Link>
    </section>
  )
}
