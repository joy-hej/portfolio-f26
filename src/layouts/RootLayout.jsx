import { Component, Suspense, useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import SiteNav from '../components/SiteNav'
import SiteFooter from '../components/SiteFooter'
import SquiggleMark from '../SquiggleMark.jsx'
import './layout.css'

function useRevealOnScroll(rootRef, resetKey) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      root.querySelectorAll('[data-reveal]').forEach((el) => {
        el.classList.add('is-revealed')
      })
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

    const observeNew = () => {
      root.querySelectorAll('[data-reveal]:not(.is-revealed)').forEach((el) => {
        const top = el.getBoundingClientRect().top
        if (top < window.innerHeight * 0.92) {
          requestAnimationFrame(() => el.classList.add('is-revealed'))
        } else {
          io.observe(el)
        }
      })
    }

    observeNew()
    // Lazy route content mounts after Suspense resolves — observe those nodes
    const mo = new MutationObserver(() => observeNew())
    mo.observe(root, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [rootRef, resetKey])
}

class RouteErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.error) {
      this.setState({ error: null })
    }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="route-fallback">
          <p className="text-body">Couldn’t load this page.</p>
          <button
            type="button"
            className="text-body route-fallback__retry"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

function RouteFallback() {
  return (
    <div className="route-fallback" role="status" aria-live="polite">
      <SquiggleMark className="route-fallback__mark" />
      <span className="route-fallback__sr">Loading</span>
    </div>
  )
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
        <RouteErrorBoundary resetKey={location.pathname}>
          <Suspense fallback={<RouteFallback />}>
            <Outlet />
          </Suspense>
        </RouteErrorBoundary>
        <SiteFooter />
      </main>
    </div>
  )
}
