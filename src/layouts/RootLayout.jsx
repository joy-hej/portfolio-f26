import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import SiteNav from '../components/SiteNav'
import SiteFooter from '../components/SiteFooter'
import './layout.css'

function useRevealOnScroll(rootRef, resetKey) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

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
  }, [rootRef, resetKey])
}

export default function RootLayout() {
  const location = useLocation()
  const mainRef = useRef(null)
  const isCase =
    location.pathname.startsWith('/work/') ||
    (location.pathname.startsWith('/play/') && location.pathname !== '/play')

  useRevealOnScroll(mainRef, location.pathname + location.hash)

  useEffect(() => {
    document.documentElement.classList.toggle('page--case', isCase)
    return () => document.documentElement.classList.remove('page--case')
  }, [isCase])

  useEffect(() => {
    if (location.hash === '#work') {
      requestAnimationFrame(() => {
        document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
      })
      return
    }
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [location.pathname, location.hash, location.key])

  return (
    <div className={`layout${isCase ? ' layout--case' : ''}`}>
      <SiteNav />
      <main ref={mainRef} className="layout__main">
        <Outlet />
        <SiteFooter />
      </main>
    </div>
  )
}
