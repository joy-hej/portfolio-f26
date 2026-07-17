import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import locationIcon from './assets/icons/location.svg'
import bookIcon from './assets/icons/book.svg'
import tributaryImg from './assets/portfolio/tributary/tributary.png'
import lightModeImg from './assets/portfolio/light-mode/light-mode.png'
import nudgeImg from './assets/portfolio/nudge/nudge.png'
import whereableImg from './assets/portfolio/whereable/whereable.png'
import { readPacificSky } from './pacificSky'
import './Wireframe.css'

const NAV_ITEMS = ['work', 'play', 'about', 'resume']
const PAGE_FADE_MS = 320

const PROJECTS = [
  {
    id: 'tributary',
    title: 'Tributary',
    year: '2026',
    description:
      'An interactive installation that allows viewers to experience (and eat!) the impacts of different rice farming methods.',
    image: tributaryImg,
    alt: 'Tributary project',
  },
  {
    id: 'light-mode',
    title: 'Light Mode',
    year: '2025',
    description:
      'A lamp that detects and reacts to the stand you place it on; experimenting with tactile, physical forms of interaction',
    image: lightModeImg,
    alt: 'Light Mode lamp variants',
  },
  {
    id: 'nudge',
    title: 'Nudge',
    year: '2025',
    description:
      'An ambient computing furniture system that reminds you to bring your stuff when leaving the house—without any screens.',
    image: nudgeImg,
    alt: 'Nudge project',
  },
  {
    id: 'whereable',
    title: 'WhereAble',
    year: '2024',
    description:
      'A haptic wearable that tells people with hearing loss which direction sound is coming from.',
    image: whereableImg,
    alt: 'WhereAble wearable prototype',
  },
]

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])
  return reduced
}

function useRevealOnScroll(rootRef, enabled, resetKey) {
  useEffect(() => {
    if (!enabled || !rootRef.current) return undefined

    const root = rootRef.current
    const nodes = root.querySelectorAll('[data-reveal]')
    if (!nodes.length) return undefined

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      nodes.forEach((el) => el.classList.add('is-revealed'))
      return undefined
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            io.unobserve(entry.target)
          }
        }
      },
      { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )

    nodes.forEach((el) => {
      const top = el.getBoundingClientRect().top
      if (top < window.innerHeight * 0.92) {
        requestAnimationFrame(() => el.classList.add('is-revealed'))
      } else {
        io.observe(el)
      }
    })

    return () => io.disconnect()
  }, [rootRef, enabled, resetKey])
}

function usePacificSky() {
  const [sky, setSky] = useState(() => readPacificSky())

  useEffect(() => {
    const tick = () => setSky(readPacificSky())
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  return sky
}

export default function Wireframe() {
  const [section, setSection] = useState('work')
  const [pageKey, setPageKey] = useState(0)
  const [pageVisible, setPageVisible] = useState(true)
  const [navHidden, setNavHidden] = useState(false)
  const [pill, setPill] = useState({ left: 0, width: 0, ready: false })
  const pageRef = useRef(null)
  const navRef = useRef(null)
  const itemRefs = useRef({})
  const lastScrollY = useRef(0)
  const reducedMotion = usePrefersReducedMotion()
  const sky = usePacificSky()

  useRevealOnScroll(pageRef, pageVisible, pageKey)

  useLayoutEffect(() => {
    const measure = () => {
      const nav = navRef.current
      const el = itemRefs.current[section]
      if (!nav || !el) return
      const navBox = nav.getBoundingClientRect()
      const box = el.getBoundingClientRect()
      setPill({
        left: box.left - navBox.left,
        width: box.width,
        ready: true,
      })
    }

    measure()
    document.fonts?.ready?.then(measure)
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [section, navHidden])

  useEffect(() => {
    lastScrollY.current = window.scrollY

    const onScroll = () => {
      const y = window.scrollY
      const delta = y - lastScrollY.current

      if (y < 48) {
        setNavHidden(false)
      } else if (delta > 6) {
        setNavHidden(true)
      } else if (delta < -6) {
        setNavHidden(false)
      }

      lastScrollY.current = y
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goTo = (next) => {
    if (next === section && pageVisible) {
      window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })
      setNavHidden(false)
      return
    }

    const finish = () => {
      setSection(next)
      setPageKey((k) => k + 1)
      setPageVisible(true)
      setNavHidden(false)
      window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })
    }

    if (reducedMotion) {
      finish()
      return
    }

    setPageVisible(false)
    window.setTimeout(finish, PAGE_FADE_MS)
  }

  return (
    <div className="wireframe">
      <header className="wireframe__header">
        <div
          className={`wireframe__pill-wrap${navHidden ? ' wireframe__pill-wrap--hidden' : ''}`}
        >
          <div className="wireframe__pill">
            <p className="wireframe__logo">joy he</p>
            <nav ref={navRef} className="wireframe__nav" aria-label="Primary">
              <span
                className={`wireframe__nav-pill${pill.ready ? ' wireframe__nav-pill--ready' : ''}`}
                style={{
                  transform: `translateX(${pill.left}px)`,
                  width: pill.width,
                }}
                aria-hidden
              />
              {NAV_ITEMS.map((item) => (
                <a
                  key={item}
                  ref={(el) => {
                    itemRefs.current[item] = el
                  }}
                  href={`#${item}`}
                  data-label={item}
                  className={
                    item === section
                      ? 'wireframe__nav-item wireframe__nav-item--active'
                      : 'wireframe__nav-item'
                  }
                  onClick={(e) => {
                    e.preventDefault()
                    goTo(item)
                  }}
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <div
        key={pageKey}
        ref={pageRef}
        className={`wireframe__page${pageVisible ? ' wireframe__page--in' : ' wireframe__page--out'}`}
      >
          {section === 'work' && (
            <>
              <section className="wireframe__intro" data-reveal>
                <h1 className="wireframe__headline text-h1">
                  I design and engineer delightful
                  <br />
                  physical × digital interactions.
                </h1>
                <div className="wireframe__meta">
                  <div className="wireframe__meta-item">
                    <img src={locationIcon} alt="" width={20} height={20} />
                    <p className="text-body">San Francisco, CA</p>
                  </div>
                  <div className="wireframe__meta-item">
                    <img src={bookIcon} alt="" width={20} height={20} />
                    <p className="text-body">
                      Design at UC Berkeley / Engineering at U of Waterloo
                    </p>
                  </div>
                </div>
              </section>

              {PROJECTS.map((project) => (
                <a
                  key={project.id}
                  id={project.id}
                  className={`wireframe__project wireframe__project--${project.id}`}
                  href={`#${project.id}`}
                >
                  <div className="wireframe__media">
                    <img src={project.image} alt={project.alt} />
                  </div>
                  <div className="wireframe__project-info">
                    <div className="wireframe__project-title-block">
                      <h2 className="text-h1">{project.title}</h2>
                      <p className="text-body">{project.year}</p>
                    </div>
                    <p className="wireframe__project-desc text-body">
                      {project.description}
                    </p>
                  </div>
                </a>
              ))}
            </>
          )}

          {section === 'play' && (
            <section className="wireframe__placeholder" data-reveal>
              <h1 className="wireframe__headline text-h1">Play</h1>
              <p className="text-body">Placeholder — play experiments coming soon.</p>
            </section>
          )}

          {section === 'about' && (
            <section className="wireframe__placeholder" data-reveal>
              <h1 className="wireframe__headline text-h1">About</h1>
              <p className="text-body">Placeholder — about copy coming soon.</p>
            </section>
          )}

          {section === 'resume' && (
            <section className="wireframe__placeholder" data-reveal>
              <h1 className="wireframe__headline text-h1">Resume</h1>
              <p className="text-body">Placeholder — resume link coming soon.</p>
            </section>
          )}

          <footer className="wireframe__footer" data-reveal>
            <div className="wireframe__footer-col">
              <p className="wireframe__footer-title">say hi</p>
              <a className="text-body" href="mailto:joy.hej@outlook.com">
                joy.hej@outlook.com
              </a>
              <a
                className="text-body wireframe__footer-note"
                href="https://www.linkedin.com/in/joy-hej/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </div>
            <div className="wireframe__footer-col wireframe__footer-col--center">
              <p className="wireframe__footer-title">sky watch</p>
              <p className="text-body">{sky.sunLabel}</p>
              <p
                className="text-body wireframe__footer-note wireframe__footer-time"
                aria-live="polite"
              >
                {sky.timeLabel}
              </p>
            </div>
            <div className="wireframe__footer-col wireframe__footer-col--end">
              <p className="wireframe__footer-title">changelog</p>
              <p className="text-body">07-16-26</p>
              <p className="text-body wireframe__footer-note">
                ⟡ made in berkeley
              </p>
            </div>
          </footer>
        </div>
    </div>
  )
}
