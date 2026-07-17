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
      <svg
        width="30"
        height="24"
        viewBox="0 0 30 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.5007 6.7161C2.00153 14.2166 4.67943 18.1173 9.48879 21.2053C12.1013 22.8828 16.5541 22.2164 19.0011 22.2164C22.0011 22.2164 25.699 18.7917 26.9888 16.2053C29.0774 12.0171 27.8603 7.3159 27.489 6.10462C26.6756 3.45127 21.0544 2.26354 19.9181 1.82809C18.0157 1.09911 16.1279 1.74669 14.8773 2.16505C13.9222 2.48458 11.4795 2.89872 10.3854 4.68484C10.0554 5.22353 9.72366 8.96386 9.78026 9.57602C9.97849 11.7198 13.3505 14.807 14.9179 15.0147C16.2018 15.1849 19.1303 13.7394 20.1301 12.994C20.5653 12.5688 20.6521 10.7444 20.6399 10.3501C20.6277 9.95584 19.4209 8.35669 17.2807 8.76831"
          stroke="black"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
