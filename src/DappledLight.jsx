import { useEffect, useRef } from 'react'
import { createWashRenderer } from './washGl.js'
import './DappledLight.css'

function clamp01(x) {
  return Math.max(0, Math.min(1, x))
}

function rand(min, max) {
  return min + Math.random() * (max - min)
}

/** Current hero wash — baseline to restore. */
export const DEFAULT_WASH = {
  seedX: 2.949939011590992,
  seedY: 15.082446007854049,
  warpAmpX: 0.3886057448014707,
  warpAmpY: 0.29849033509979983,
  bandScaleX: 1.8358405487811709,
  bandScaleY: 3.009681024512727,
  bandMix: 0.5546857834593565,
  topLeftX: 0.020889156814666035,
  topLeftY: -0.007856619889463519,
  topLeftRadius: 1.1302333070228279,
  topLeftWeight: 0.20757348325019298,
  lowerStart: 0.4406137140822436,
  lowerEnd: 0.8534568505888448,
  lowerWeight: 0.22367640874924877,
  brightX: 0.39271900840903495,
  brightY: 0.2161335886698249,
  brightRadius: 1.5920419118803977,
  brightWeight: 0.3834700097309084,
  bandWeight: 0.5990708932033197,
  grainScale: 20.49774412210979,
  grainAmp: 0.10379611985223766,
}

/** Pigment ramp: light → mid → dark (c0…c4) — sage green wash. */
export const DEFAULT_COLORS = {
  c0: [242, 236, 220],
  c1: [210, 214, 190],
  c2: [150, 168, 120],
  c3: [96, 118, 78],
  c4: [58, 74, 52],
}

/** Plain mode paper — no dapple wash. */
const PLAIN_PAPER = [241, 241, 241]

function cloneColors(c) {
  return {
    c0: [...c.c0],
    c1: [...c.c1],
    c2: [...c.c2],
    c3: [...c.c3],
    c4: [...c.c4],
  }
}

/** Session defaults — `0` restores; `x` updates + copies to clipboard. */
let savedWash = { ...DEFAULT_WASH }
let savedColors = cloneColors(DEFAULT_COLORS)

function randomWash() {
  return {
    seedX: rand(0, 40),
    seedY: rand(0, 40),
    warpAmpX: rand(0.25, 0.8),
    warpAmpY: rand(0.2, 0.7),
    bandScaleX: rand(0.9, 2.2),
    bandScaleY: rand(1.2, 3.2),
    bandMix: rand(0.35, 0.7),
    topLeftX: rand(-0.05, 0.2),
    topLeftY: rand(-0.05, 0.25),
    topLeftRadius: rand(0.9, 1.8),
    topLeftWeight: rand(0.12, 0.42),
    lowerStart: rand(0.2, 0.45),
    lowerEnd: rand(0.7, 0.95),
    lowerWeight: rand(0.18, 0.45),
    brightX: rand(0.35, 0.75),
    brightY: rand(0.15, 0.45),
    brightRadius: rand(1.0, 1.9),
    brightWeight: rand(0.22, 0.5),
    bandWeight: rand(0.45, 0.75),
    grainScale: rand(12, 28),
    grainAmp: rand(0.04, 0.12),
  }
}

function rgbCss([r, g, b]) {
  return `rgb(${r}, ${g}, ${b})`
}

function formatJsObject(obj, indent = 2) {
  const pad = ' '.repeat(indent)
  const lines = Object.entries(obj).map(([key, value]) => {
    if (Array.isArray(value)) {
      return `${pad}${key}: [${value.join(', ')}],`
    }
    return `${pad}${key}: ${value},`
  })
  return `{\n${lines.join('\n')}\n}`
}

function configClipboardText(wash, colors) {
  return [
    'DEFAULT_WASH = ' + formatJsObject(wash),
    '',
    'DEFAULT_COLORS = ' + formatJsObject(colors),
  ].join('\n')
}

async function copyConfig(wash, colors) {
  const text = configClipboardText(wash, colors)
  try {
    await navigator.clipboard.writeText(text)
    console.log('[dappled] copied wash + colors to clipboard\n' + text)
  } catch (err) {
    console.warn('[dappled] clipboard failed — copy from console:', text, err)
  }
}

/** On-screen repeat — large tiles, few repeats. */
const GRAIN_TILE_PX = 512
/** High-res source; CSS scales this down for fine speckles. */
const GRAIN_TEXTURE_PX = 2048

function makePaperGrainUrl() {
  const tile = document.createElement('canvas')
  tile.width = GRAIN_TEXTURE_PX
  tile.height = GRAIN_TEXTURE_PX
  const ctx = tile.getContext('2d')
  if (!ctx) return ''
  const img = ctx.createImageData(GRAIN_TEXTURE_PX, GRAIN_TEXTURE_PX)
  const d = img.data
  for (let i = 0; i < d.length; i += 4) {
    const n = Math.random()
    let v = 152 + Math.random() * 28
    if (n > 0.9) v = 26 + Math.random() * 48
    else if (n < 0.1) v = 210 + Math.random() * 38
    d[i] = v
    d[i + 1] = v * 0.97
    d[i + 2] = v * 0.9
    d[i + 3] = 255
  }
  ctx.putImageData(img, 0, 0)
  return tile.toDataURL('image/png')
}

/** Finish lightening over this many viewports of scroll (lower = faster). */
const SCROLL_DISTANCE_VH = 1
/** Compress pigment toward light grey — higher = more fade. */
const MAX_COLOR_LIFT = 1

/** Steady march through noise space — same speed at every moment. */
function ambientWash(elapsedMs) {
  const t = elapsedMs * 0.001
  return {
    driftX: t * 0.22,
    driftY: t * 0.16,
    brightX: Math.cos(t * 0.18) * 0.06,
    brightY: Math.sin(t * 0.18) * 0.045,
  }
}

/** Scroll-driven in-place repaint — mix toward light grey. */
function scrollPaint(progress) {
  const p = progress
  return {
    colorLift: p * MAX_COLOR_LIFT,
    liftColor: PLAIN_PAPER,
    brightWeight: p * 0.22,
    bandWeight: -p * 0.2,
    topLeftWeight: -p * 0.07,
    lowerWeight: -p * 0.09,
    brightRadius: p * 0.24,
    bandMix: p * 0.05 + Math.sin(p * Math.PI) * 0.025,
    warpAmpX: Math.sin(p * Math.PI * 0.9) * 0.03,
    warpAmpY: Math.cos(p * Math.PI * 0.75) * 0.025,
  }
}

function lerpRgb(a, b, t) {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ]
}

export default function DappledLight() {
  const canvasRef = useRef(null)
  const grainRef = useRef(null)
  const rootRef = useRef(null)
  const washRef = useRef({ ...savedWash })
  const colorsRef = useRef(cloneColors(savedColors))
  const dappleActiveRef = useRef(true)

  useEffect(() => {
    const grain = grainRef.current
    if (!grain) return
    grain.style.backgroundImage = `url(${makePaperGrainUrl()})`
    grain.style.backgroundSize = `${GRAIN_TILE_PX}px ${GRAIN_TILE_PX}px`
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = createWashRenderer(canvas)
    if (!renderer) {
      console.warn('[dappled] WebGL unavailable — wash animation disabled')
      return undefined
    }

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    let raf = 0
    let resizeTimer = 0
    let scrollTarget = 0
    let scrollSmooth = 0
    const ambientActive = !reduceMotion
    const startTime = performance.now()

    const syncPaper = () => {
      if (!rootRef.current) return
      if (!dappleActiveRef.current) {
        rootRef.current.style.background = rgbCss(PLAIN_PAPER)
        return
      }
      const lift = scrollSmooth * MAX_COLOR_LIFT
      rootRef.current.style.background = rgbCss(
        lerpRgb(colorsRef.current.c0, PLAIN_PAPER, lift),
      )
    }

    const syncDapple = () => {
      const on = dappleActiveRef.current
      if (rootRef.current) {
        rootRef.current.classList.toggle('organic--plain', !on)
      }
      syncPaper()
    }

    const readScroll = () => {
      const distance = Math.max(1, window.innerHeight * SCROLL_DISTANCE_VH)
      scrollTarget = clamp01(window.scrollY / distance)
    }

    const tick = (now = performance.now()) => {
      if (!dappleActiveRef.current) return

      const ease = reduceMotion ? 1 : 0.12
      scrollSmooth += (scrollTarget - scrollSmooth) * ease
      if (Math.abs(scrollTarget - scrollSmooth) <= 0.0008) {
        scrollSmooth = scrollTarget
      }

      const paint = {
        ...(ambientActive ? ambientWash(now - startTime) : {}),
        ...scrollPaint(scrollSmooth),
      }
      renderer.render(washRef.current, colorsRef.current, paint)
      syncPaper()

      const scrollSettled = scrollSmooth === scrollTarget
      if (ambientActive || !scrollSettled) {
        raf = requestAnimationFrame(tick)
      } else {
        raf = 0
      }
    }

    const kick = () => {
      if (!dappleActiveRef.current) return
      if (!raf) raf = requestAnimationFrame(tick)
    }

    const bake = () => {
      syncPaper()
      if (!dappleActiveRef.current) return

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const viewW = Math.max(1, Math.floor(window.innerWidth * dpr))
      const viewH = Math.max(1, Math.floor(window.innerHeight * dpr))
      renderer.resize(viewW, viewH)
      renderer.render(washRef.current, colorsRef.current, {
        ...(ambientActive ? ambientWash(performance.now() - startTime) : {}),
        ...scrollPaint(scrollSmooth),
      })
    }

    const onScroll = () => {
      readScroll()
      kick()
    }

    const onResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        bake()
        readScroll()
        kick()
      }, 120)
    }

    const onKey = (e) => {
      if (e.target instanceof HTMLElement) {
        const tag = e.target.tagName
        if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) {
          return
        }
      }

      if (e.key === 'r' || e.key === 'R') {
        washRef.current = randomWash()
        if (grainRef.current) {
          grainRef.current.style.backgroundImage = `url(${makePaperGrainUrl()})`
        }
        console.log('[dappled] random wash', washRef.current)
        bake()
      } else if (e.key === 'c' || e.key === 'C') {
        dappleActiveRef.current = !dappleActiveRef.current
        syncDapple()
        if (dappleActiveRef.current) {
          bake()
          kick()
        } else {
          cancelAnimationFrame(raf)
          raf = 0
        }
        console.log('[dappled] dapple', dappleActiveRef.current ? 'on' : 'off')
      } else if (e.key === 'x' || e.key === 'X') {
        savedWash = { ...washRef.current }
        savedColors = cloneColors(colorsRef.current)
        void copyConfig(savedWash, savedColors)
      } else if (e.key === '0') {
        washRef.current = { ...savedWash }
        colorsRef.current = cloneColors(savedColors)
        syncPaper()
        if (dappleActiveRef.current) bake()
        console.log('[dappled] restored default wash + colors')
      }
    }

    syncDapple()
    if (dappleActiveRef.current) {
      bake()
      readScroll()
      kick()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    window.addEventListener('keydown', onKey)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(resizeTimer)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('keydown', onKey)
      renderer.destroy()
    }
  }, [])

  return (
    <div ref={rootRef} className="organic" aria-hidden="true">
      <canvas ref={canvasRef} className="organic__canvas" />
      <div ref={grainRef} className="organic__grain" />
    </div>
  )
}
