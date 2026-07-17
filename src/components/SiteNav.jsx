import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { NAV_ITEMS } from '../data'
import './SiteNav.css'

function activeNavId(pathname) {
  if (pathname.startsWith('/work')) return 'work'
  if (pathname.startsWith('/play')) return 'play'
  if (pathname.startsWith('/about')) return 'about'
  if (pathname.startsWith('/resume')) return 'resume'
  if (pathname === '/') return 'work'
  return null
}

export default function SiteNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const [navHidden, setNavHidden] = useState(false)
  const [pill, setPill] = useState({ left: 0, width: 0, ready: false })
  const navRef = useRef(null)
  const itemRefs = useRef({})
  const lastScrollY = useRef(0)
  const active = activeNavId(location.pathname)

  useLayoutEffect(() => {
    const measure = () => {
      const nav = navRef.current
      const el = itemRefs.current[active]
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
  }, [active, navHidden, location.pathname])

  useEffect(() => {
    lastScrollY.current = window.scrollY
    setNavHidden(false)

    const onScroll = () => {
      const y = window.scrollY
      const delta = y - lastScrollY.current
      if (y < 48) setNavHidden(false)
      else if (delta > 6) setNavHidden(true)
      else if (delta < -6) setNavHidden(false)
      lastScrollY.current = y
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [location.pathname])

  const goHome = (e) => {
    e.preventDefault()
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      window.history.replaceState(null, '', '/')
      return
    }
    navigate('/')
  }

  const goWork = (e) => {
    e.preventDefault()
    if (location.pathname === '/') {
      document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
      window.history.replaceState(null, '', '/#work')
      return
    }
    navigate('/#work')
  }

  return (
    <header className="site-nav">
      <div
        className={`site-nav__pill-wrap${navHidden ? ' site-nav__pill-wrap--hidden' : ''}`}
      >
        <div className="site-nav__pill">
          <Link to="/" className="site-nav__logo" onClick={goHome}>
            joy he
          </Link>
          <nav ref={navRef} className="site-nav__links" aria-label="Primary">
            <span
              className={`site-nav__active-pill${pill.ready ? ' site-nav__active-pill--ready' : ''}`}
              style={{
                transform: `translateX(${pill.left}px)`,
                width: pill.width,
              }}
              aria-hidden
            />
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.id}
                ref={(el) => {
                  itemRefs.current[item.id] = el
                }}
                to={item.to}
                data-label={item.label}
                className={
                  item.id === active
                    ? 'site-nav__item site-nav__item--active'
                    : 'site-nav__item'
                }
                onClick={item.id === 'work' ? goWork : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
