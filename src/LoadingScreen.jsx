import { useEffect, useState } from 'react'
import './LoadingScreen.css'

const MIN_SHOW_MS = 700
const FADE_MS = 520

function preloadImage(src) {
  return new Promise((resolve) => {
    const img = new Image()
    img.decoding = 'async'
    img.onload = () => resolve()
    img.onerror = () => resolve()
    img.src = src
  })
}

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms))
}

/**
 * @param {{ sources: string[], onFinished: () => void }} props
 */
export default function LoadingScreen({ sources, onFinished }) {
  const [fading, setFading] = useState(false)

  useEffect(() => {
    let cancelled = false
    const start = performance.now()

    ;(async () => {
      await Promise.all(sources.map(preloadImage))
      const elapsed = performance.now() - start
      if (elapsed < MIN_SHOW_MS) await wait(MIN_SHOW_MS - elapsed)
      if (cancelled) return
      setFading(true)
      await wait(FADE_MS)
      if (!cancelled) onFinished()
    })()

    return () => {
      cancelled = true
    }
  }, [sources, onFinished])

  return (
    <div
      className={`loader${fading ? ' loader--out' : ''}`}
      role="status"
      aria-live="polite"
      aria-busy={!fading}
    >
      <span className="loader__sr">Loading</span>
      <div className="loader__asterisk" aria-hidden>
        <div className="loader__asterisk-orbit">
          <span className="loader__asterisk-spin">⟡</span>
        </div>
      </div>
    </div>
  )
}
