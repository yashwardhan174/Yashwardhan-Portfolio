# Yashwardhan Nigam – Portfolio

My developer portfolio: a static **React** site built with **Vite**, **Tailwind CSS** and **React Router**. All content lives in one file, `frontend/src/data/content.json`. The contact form sends messages through **Formspree**, so there is no backend to host.

<!-- Add a screenshot of the live site here once deployed: ![Screenshot](docs/screenshot.png) -->

**Live site:** https://yashwardhan-portfolio-two.vercel.app

## Features

- Journey timeline drawn as a git commit graph (internships appear as branches that merge back)
- Project case studies at `/projects/<slug>`: problem, approach, challenges, outcome, next steps
- Project filtering by technology
- Contact form via Formspree with a honeypot spam trap; hidden automatically if Formspree isn't configured
- Light and dark themes, responsive down to mobile, keyboard accessible, respects reduced-motion settings

## Project structure

```
frontend/
├── index.html              Page title, meta description and link-preview (og:) tags
├── public/                 Files served as-is: resume.pdf, images/, favicon
├── src/
│   ├── data/content.json   ← all site content: edit this
│   ├── components/         Page sections (Hero, Journey, Projects, Contact, …)
│   ├── pages/              Home, ProjectDetail, NotFound
│   └── lib/                Content context, Formspree call, theme hook
├── .env.example            Template for environment variables
└── vercel.json             Makes /projects/... links work on refresh
```

## Install and run locally

**Requirements:** Node.js 18 or newer ([nodejs.org](https://nodejs.org)).

```bash
cd frontend
npm install        # downloads the libraries listed in package.json (first time only)
npm run dev        # starts a local server with live reload
```

Open http://localhost:5173. Edits to any file appear in the browser as soon as you save.

To check the production build:

```bash
npm run build      # creates optimised files in frontend/dist
npm run preview    # serves that build at http://localhost:4173
```

## Editing content

Everything on the site comes from `frontend/src/data/content.json`:

| Key | What it controls |
|---|---|
| `profile` | Name, headline, bio, about text, email, phone, GitHub/LinkedIn URLs, resume link, availability |
| `timeline` | The journey graph. `kind` is `education`, `learning`, `work` or `milestone` |
| `experience` | Jobs and internships. Dates are `YYYY-MM-DD`; leave `end_date` empty for a current role |
| `projects` | Project cards and case-study pages. `slug` becomes the URL: `/projects/<slug>` |
| `skills` | Skills grouped by `category`: `languages`, `frontend`, `backend`, `databases`, `tools` |
| `certifications` | `name`, `issuer`, `issued_on` (`YYYY-MM-DD`) and `credential_url` |

Tips:

- In long text fields, `\n\n` starts a new paragraph.
- The file must stay valid JSON: double quotes, commas between items, no comma after the last item. If the dev server shows a JSON error, the message points to the line.
- **Images:** put screenshots in `frontend/public/images/` and reference them as `/images/my-app.png` in a project's `thumbnail_url` or `screenshot_urls`.
- **Resume:** put your PDF at `frontend/public/resume.pdf`.
- Page title and link-preview text live in `frontend/index.html`.

## Set up the contact form (Formspree)

1. Create a free account at [formspree.io](https://formspree.io) and verify your email.
2. Create a new form. Its endpoint looks like `https://formspree.io/f/xyzabcd`; the form ID is `xyzabcd`.
3. For local testing, copy `frontend/.env.example` to `frontend/.env` and set:
   ```
   VITE_FORMSPREE_ID=xyzabcd
   ```
   Restart `npm run dev` after changing `.env`.
4. Send a test message from the site and confirm it in your inbox (Formspree asks you to confirm the first submission).

If `VITE_FORMSPREE_ID` is empty, the form is hidden and visitors see only your direct contact links. `.env` is listed in `.gitignore` and must never be committed.

## Deploy to Vercel

1. Push this repository to GitHub.
2. On [vercel.com](https://vercel.com), sign in with GitHub → **Add New → Project** → import the repository.
3. Settings:
   - **Root directory:** `frontend`
   - **Framework preset:** Vite
   - **Environment variable:** `VITE_FORMSPREE_ID` = your form ID
4. Click **Deploy**. Every later `git push` redeploys automatically.
5. If the address changes (e.g. a custom domain), update the `og:url` and canonical tags in `frontend/index.html` and the **Live site** link above.

`vercel.json` (and `public/_redirects` for Netlify) makes `/projects/...` links work when the page is refreshed.

## Tech

React 18, React Router, Vite, Tailwind CSS, lucide-react, Formspree, Vercel
