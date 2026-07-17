import { useEffect, useState } from 'react'
import SquiggleMark from './SquiggleMark.jsx'
import './LoadingScreen.css'

/** Brief branded splash — hold long enough for squiggle path-draw (~1.15s) */
const SHOW_MS = 1350
const FADE_MS = 420

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms))
}

/**
 * @param {{ onFinished: () => void }} props
 */
export default function LoadingScreen({ onFinished }) {
  const [fading, setFading] = useState(false)

  useEffect(() => {
    let cancelled = false

    ;(async () => {
      await wait(SHOW_MS)
      if (cancelled) return
      setFading(true)
      await wait(FADE_MS)
      if (!cancelled) onFinished()
    })()

    return () => {
      cancelled = true
    }
  }, [onFinished])

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
          <SquiggleMark
            className="loader__asterisk-spin"
            stroke="#1e3d2f"
            drawOnMount
          />
        </div>
      </div>
    </div>
  )
}
