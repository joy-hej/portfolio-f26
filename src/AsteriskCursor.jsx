import { useEffect, useRef, useState } from 'react'
import './AsteriskCursor.css'

const SELECTABLE =
  'a, button, [role="button"], label[for], select, summary, input, textarea'

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
      const hit = target.closest(SELECTABLE)
      setHot(Boolean(hit && !hit.classList.contains('site-nav__logo')))
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

  return (
    <div
      ref={nodeRef}
      className={`asterisk-cursor${hot ? ' asterisk-cursor--hot' : ''}${visible ? ' asterisk-cursor--visible' : ''}`}
      aria-hidden
    >
      ⟡
    </div>
  )
}
