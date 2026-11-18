const FORMSPREE_ID = (import.meta.env.VITE_FORMSPREE_ID || '').trim()

/** True when a Formspree form ID is configured, so the contact form can be shown. */
export const contactFormEnabled = FORMSPREE_ID !== ''

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate({ name, email, message }) {
  const fieldErrors = {}
  if (!name.trim()) fieldErrors.name = 'Please enter your name.'
  if (!email.trim()) fieldErrors.email = 'Please enter your email address.'
  else if (!EMAIL_PATTERN.test(email.trim())) fieldErrors.email = 'Please enter a valid email address.'
  if (!message.trim()) fieldErrors.message = 'Please write a message.'
  return fieldErrors
}

/**
 * Sends the contact form to Formspree. Resolves on success; rejects with
 * { fieldErrors, message } so the form can show what to fix.
 */
export async function sendContactMessage(data) {
  const fieldErrors = validate(data)
  if (Object.keys(fieldErrors).length) throw { fieldErrors, message: '' }

  let res
  try {
    res = await fetch(`https://formspree.io/f/${encodeURIComponent(FORMSPREE_ID)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: data.name.trim(),
        email: data.email.trim(),
        message: data.message.trim(),
        _subject: `Portfolio message from ${data.name.trim()}`,
        _gotcha: data._gotcha, // honeypot: Formspree silently drops submissions where this is filled
      }),
    })
  } catch {
    throw { message: 'The message could not be sent. Check your connection, or email me directly.' }
  }

  if (res.ok) return

  if (res.status === 429) {
    throw { message: 'Too many messages right now. Try again later, or email me directly.' }
  }

  // Formspree returns { errors: [{ field, message }] } for invalid fields
  const body = await res.json().catch(() => ({}))
  const serverErrors = {}
  for (const err of body.errors || []) {
    // Formspree messages are fragments like "should be an email"
    if (err.field && err.message) serverErrors[err.field] = `This field ${err.message}.`
  }
  throw {
    fieldErrors: serverErrors,
    message: Object.keys(serverErrors).length ? '' : 'The message was not sent. Please email me directly instead.',
  }
}
