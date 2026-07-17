import { useEffect, useState } from 'react'
import { readPacificSky } from '../pacificSky'
import './SiteFooter.css'

export default function SiteFooter() {
  const [sky, setSky] = useState(() => readPacificSky())

  useEffect(() => {
    const tick = () => setSky(readPacificSky())
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <footer className="site-footer" data-reveal>
      <div className="site-footer__col">
        <p className="site-footer__title">say hi</p>
        <a className="text-body" href="mailto:joy.hej@outlook.com">
          joy.hej@outlook.com
        </a>
        <a
          className="text-body site-footer__note"
          href="https://www.linkedin.com/in/joy-hej/"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
      </div>
      <div className="site-footer__col site-footer__col--center">
        <p className="site-footer__title">sky watch</p>
        <p className="text-body">{sky.sunLabel}</p>
        <p className="text-body site-footer__note site-footer__time" aria-live="polite">
          {sky.timeLabel}
        </p>
      </div>
      <div className="site-footer__col site-footer__col--end">
        <p className="site-footer__title">changelog</p>
        <p className="text-body">07-16-26</p>
        <p className="text-body site-footer__note">⟡ made in berkeley</p>
      </div>
    </footer>
  )
}
