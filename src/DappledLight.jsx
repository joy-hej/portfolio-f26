import { useEffect, useRef } from 'react'
import { createWashRenderer } from './washGl.js'
import './DappledLight.css'

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

export default function DappledLight() {
  const canvasRef = useRef(null)
  const grainRef = useRef(null)
  const washRef = useRef({ ...DEFAULT_WASH })

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
    const ambientActive = !reduceMotion
    const startTime = performance.now()

    const tick = (now = performance.now()) => {
      if (ambientActive) {
        renderer.render(washRef.current, ambientWash(now - startTime))
        raf = requestAnimationFrame(tick)
      }
    }

    const bake = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const viewW = Math.max(1, Math.floor(window.innerWidth * dpr))
      const viewH = Math.max(1, Math.floor(window.innerHeight * dpr))
      renderer.resize(viewW, viewH)
      renderer.render(washRef.current)
    }

    const onResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(bake, 120)
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
      } else if (e.key === '0') {
        washRef.current = { ...DEFAULT_WASH }
        console.log('[dappled] restored default wash')
        bake()
      }
    }

    bake()
    if (ambientActive) {
      renderer.render(washRef.current, ambientWash(0))
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('resize', onResize)
    window.addEventListener('keydown', onKey)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('keydown', onKey)
      renderer.destroy()
    }
  }, [])

  return (
    <div className="organic" aria-hidden="true">
      <canvas ref={canvasRef} className="organic__canvas" />
      <div ref={grainRef} className="organic__grain" />
    </div>
  )
}
