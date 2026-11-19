import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

/** Accepts "/images/a.png" or { src, title, caption } and returns the object form. */
function normalise(shot, i, projectTitle) {
  if (typeof shot === 'string') return { src: shot, title: `${projectTitle}: screen ${i + 1}`, caption: '' }
  return { title: `${projectTitle}: screen ${i + 1}`, caption: '', ...shot }
}

/** Swipe left/right on touch screens to change slides. */
function useSwipe(onPrev, onNext) {
  const start = useRef(null)
  return {
    onTouchStart: (e) => {
      start.current = e.touches[0].clientX
    },
    onTouchEnd: (e) => {
      if (start.current === null) return
      const dx = e.changedTouches[0].clientX - start.current
      if (Math.abs(dx) > 40) (dx > 0 ? onPrev : onNext)()
      start.current = null
    },
  }
}

const arrowClass =
  'absolute top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-page/80 text-ink backdrop-blur transition hover:border-accent hover:text-accent'

/**
 * An explorable tour of a project's screens: a large viewer with captions,
 * arrows, keyboard and swipe navigation, a thumbnail strip, and a full-screen view.
 */
export default function ScreenshotTour({ shots, projectTitle, note }) {
  const slides = shots.map((s, i) => normalise(s, i, projectTitle))
  const [index, setIndex] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)
  const closeRef = useRef(null)
  const thumbsRef = useRef(null)

  const count = slides.length
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count])
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count])
  const swipe = useSwipe(prev, next)
  const current = slides[index]

  // Keep the active thumbnail in view
  useEffect(() => {
    thumbsRef.current?.children[index]?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
  }, [index])

  // Full-screen view: arrow keys, Esc to close, no page scroll behind it
  useEffect(() => {
    if (!fullscreen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setFullscreen(false)
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', onKey)
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
    }
  }, [fullscreen, prev, next])

  const onViewerKey = (e) => {
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
  }

  return (
    <section aria-roledescription="carousel" aria-label={`${projectTitle} screenshots`}>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Take a tour</h2>
          <p className="mt-1 text-muted">Use the arrows, swipe, or pick a screen below. Click a screenshot to enlarge it.</p>
          {note && <p className="mt-1 text-sm text-muted/80">{note}</p>}
        </div>
        <p className="shrink-0 font-mono text-sm text-muted" aria-live="polite">
          {index + 1} / {count}
        </p>
      </div>

      {/* Main viewer */}
      <div
        className="relative mt-5 overflow-hidden rounded-xl border border-line bg-surface shadow-[0_20px_60px_-30px_rgb(var(--accent)/0.6)]"
        tabIndex={0}
        onKeyDown={onViewerKey}
        aria-label="Screenshot viewer. Use left and right arrow keys to change screens."
        {...swipe}
      >
        <button
          type="button"
          onClick={() => setFullscreen(true)}
          className="group block w-full cursor-zoom-in"
          aria-label={`Enlarge: ${current.title}`}
        >
          <img
            key={current.src}
            src={current.src}
            alt={current.title}
            className="tour-fade aspect-[16/10] w-full bg-page object-contain"
          />
          <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-page/80 text-ink opacity-0 backdrop-blur transition group-hover:opacity-100 group-focus-visible:opacity-100">
            <Maximize2 size={16} aria-hidden="true" />
          </span>
        </button>
        {count > 1 && (
          <>
            <button type="button" onClick={prev} className={`${arrowClass} left-3`} aria-label="Previous screen">
              <ChevronLeft size={22} aria-hidden="true" />
            </button>
            <button type="button" onClick={next} className={`${arrowClass} right-3`} aria-label="Next screen">
              <ChevronRight size={22} aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      {/* Caption */}
      <div className="mt-4 min-h-[4.5rem]">
        <h3 className="text-lg font-bold">{current.title}</h3>
        {current.caption && <p className="mt-1 max-w-prose text-muted">{current.caption}</p>}
      </div>

      {/* Thumbnail strip */}
      {count > 1 && (
        <div ref={thumbsRef} className="mt-4 flex gap-3 overflow-x-auto pb-2" role="tablist" aria-label="Choose a screen">
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={s.title}
              onClick={() => setIndex(i)}
              className={`w-32 shrink-0 overflow-hidden rounded-md border-2 transition sm:w-40 ${
                i === index ? 'border-accent shadow-[0_0_18px_-4px_rgb(var(--accent)/0.8)]' : 'border-line opacity-60 hover:opacity-100'
              }`}
            >
              <img src={s.src} alt="" loading="lazy" className="aspect-[16/10] w-full bg-page object-cover object-top" />
            </button>
          ))}
        </div>
      )}

      {/* Full-screen view */}
      {fullscreen && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-black/95 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          onClick={(e) => e.target === e.currentTarget && setFullscreen(false)}
          {...swipe}
        >
          <div className="flex items-center justify-between gap-4 text-white">
            <p className="font-mono text-sm text-white/70">
              {index + 1} / {count}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setFullscreen(false)}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/30 hover:border-white"
              aria-label="Close full-screen view"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center py-4">
            <img key={current.src} src={current.src} alt={current.title} className="tour-fade max-h-full max-w-full rounded-lg object-contain" />
            {count > 1 && (
              <>
                <button type="button" onClick={prev} className={`${arrowClass} left-0`} aria-label="Previous screen">
                  <ChevronLeft size={22} aria-hidden="true" />
                </button>
                <button type="button" onClick={next} className={`${arrowClass} right-0`} aria-label="Next screen">
                  <ChevronRight size={22} aria-hidden="true" />
                </button>
              </>
            )}
          </div>
          <div className="mx-auto max-w-3xl text-center text-white">
            <p className="font-bold">{current.title}</p>
            {current.caption && <p className="mt-1 text-sm text-white/75">{current.caption}</p>}
          </div>
        </div>
      )}
    </section>
  )
}
