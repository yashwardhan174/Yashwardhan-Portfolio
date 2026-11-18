import { Github, Linkedin, Mail, Phone } from 'lucide-react'
import { useState } from 'react'
import { contactFormEnabled, sendContactMessage } from '../lib/api'
import { usePortfolio } from '../lib/PortfolioContext'
import Section from './Section'

const EMPTY = { name: '', email: '', message: '', _gotcha: '' }

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block font-semibold">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}

const inputClass =
  'w-full rounded-md border border-line bg-surface px-3.5 py-2.5 text-ink placeholder:text-muted/70 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30'

export default function Contact() {
  const { profile } = usePortfolio()
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    setErrors({})
    setMessage('')
    try {
      await sendContactMessage(form)
      setStatus('sent')
      setForm(EMPTY)
    } catch (err) {
      setStatus('error')
      setErrors(err.fieldErrors || {})
      setMessage(err.message || '')
    }
  }

  return (
    <Section
      id="contact"
      title="Get in touch"
      intro={
        contactFormEnabled
          ? "Hiring, collaborating, or have feedback on a project? Send a message and I'll reply by email."
          : 'Hiring, collaborating, or have feedback on a project? Email me or reach out on LinkedIn.'
      }
    >
      <div className={contactFormEnabled ? 'grid gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]' : ''}>
        {!contactFormEnabled ? null : status === 'sent' ? (
          <div className="rounded-xl border border-line bg-surface p-8" role="status">
            <h3 className="text-2xl font-bold">Message sent</h3>
            <p className="mt-2 text-muted">Thanks for reaching out. I'll reply to the email address you gave.</p>
            <button type="button" onClick={() => setStatus('idle')} className="mt-5 font-semibold text-accent hover:underline">
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="name" label="Name" error={errors.name}>
                <input id="name" name="name" required autoComplete="name" value={form.name} onChange={update}
                  className={inputClass} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} />
              </Field>
              <Field id="email" label="Email" error={errors.email}>
                <input id="email" name="email" type="email" required autoComplete="email" value={form.email} onChange={update}
                  className={inputClass} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} />
              </Field>
            </div>
            <Field id="message" label="Message" error={errors.message}>
              <textarea id="message" name="message" required rows={6} value={form.message} onChange={update}
                className={inputClass} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined} />
            </Field>

            {/* Honeypot: hidden from people, filled in by bots */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="_gotcha">Leave this empty</label>
              <input id="_gotcha" name="_gotcha" tabIndex={-1} autoComplete="off" value={form._gotcha} onChange={update} />
            </div>

            {message && (
              <p className="text-red-600 dark:text-red-400" role="alert">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="rounded-md bg-accent px-6 py-3 font-semibold text-page hover:bg-accent/90 disabled:opacity-60"
            >
              {status === 'sending' ? 'Sending message…' : 'Send message'}
            </button>
          </form>
        )}

        <div>
          {contactFormEnabled && <h3 className="text-lg font-bold">Or reach me directly</h3>}
          <ul className="mt-4 space-y-3">
            <li>
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 hover:text-accent">
                <Mail size={18} aria-hidden="true" /> {profile.email}
              </a>
            </li>
            {profile.phone && (
              <li>
                <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 hover:text-accent">
                  <Phone size={18} aria-hidden="true" /> {profile.phone}
                </a>
              </li>
            )}
            {profile.linkedin_url && (
              <li>
                <a href={profile.linkedin_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-accent">
                  <Linkedin size={18} aria-hidden="true" /> LinkedIn
                </a>
              </li>
            )}
            {profile.github_url && (
              <li>
                <a href={profile.github_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-accent">
                  <Github size={18} aria-hidden="true" /> GitHub
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </Section>
  )
}
