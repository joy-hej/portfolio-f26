import { useEffect, useRef, useState } from 'react'
import './AsteriskCursor.css'

const SELECTABLE =
  'a, button, [role="button"], label[for], select, summary, input, textarea'

/** Same thickness idle/hot; only spoke length changes. */
const TIP_HALF = 1.15
const INNER_HALF = 0.35
const INNER_Y = 1.1
const LEN_IDLE = 13.5
const LEN_HOT = 17.25
const HUB = 1.5
const ANGLES = [0, 45, 90, 135, 180, 225, 270, 315]
const SIZE = 40
const MID = SIZE / 2

function spokePoints(len) {
  return `-${TIP_HALF},${-len} ${TIP_HALF},${-len} ${INNER_HALF},${-INNER_Y} -${INNER_HALF},${-INNER_Y}`
}

export default function AsteriskCursor() {
  const nodeRef = useRef(null)
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [hot, setHot] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)')
    const sync = () => setEnabled(fine.matches)
    sync()
    fine.addEventListener('change', sync)
    return () => fine.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove('has-asterisk-cursor')
      return undefined
    }

    document.documentElement.classList.add('has-asterisk-cursor')
    const node = nodeRef.current

    const onMove = (e) => {
      if (!node) return
      node.style.left = `${e.clientX}px`
      node.style.top = `${e.clientY}px`
      setVisible(true)

      const target = e.target
      if (!(target instanceof Element)) {
        setHot(false)
        return
      }
      setHot(Boolean(target.closest(SELECTABLE)))
    }

    const onLeave = () => setVisible(false)

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    return () => {
      document.documentElement.classList.remove('has-asterisk-cursor')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [enabled])

  if (!enabled) return null

  const spoke = spokePoints(hot ? LEN_HOT : LEN_IDLE)

  return (
    <div
      ref={nodeRef}
      className={`asterisk-cursor${hot ? ' asterisk-cursor--hot' : ''}${visible ? ' asterisk-cursor--visible' : ''}`}
      aria-hidden
    >
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
              points={spoke}
              transform={deg ? `rotate(${deg})` : undefined}
            />
          ))}
          <circle r={HUB} />
        </g>
      </svg>
    </div>
  )
}
