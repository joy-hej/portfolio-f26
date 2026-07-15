import { useEffect, useState } from 'react'
import './LoadingScreen.css'

const TIP_HALF = 0.55
const INNER_HALF = 0.18
const INNER_Y = 1.1
const LEN = 13.5
const HUB = 1.1
const ANGLES = [0, 45, 90, 135, 180, 225, 270, 315]
const SIZE = 40
const MID = SIZE / 2
const MIN_SHOW_MS = 700
const FADE_MS = 520

const SPOKE = `-${TIP_HALF},${-LEN} ${TIP_HALF},${-LEN} ${INNER_HALF},${-INNER_Y} -${INNER_HALF},${-INNER_Y}`

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
        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          fill="#000"
        >
          <g transform={`translate(${MID} ${MID})`}>
            {ANGLES.map((deg) => (
              <polygon
                key={deg}
                points={SPOKE}
                transform={deg ? `rotate(${deg})` : undefined}
              />
            ))}
            <circle r={HUB} />
          </g>
        </svg>
      </div>
    </div>
  )
}
