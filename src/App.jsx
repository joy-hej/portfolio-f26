import { useCallback, useMemo, useState } from 'react'
import DappledLight from './DappledLight.jsx'
import Wireframe from './Wireframe.jsx'
import AsteriskCursor from './AsteriskCursor.jsx'
import LoadingScreen from './LoadingScreen.jsx'
import locationIcon from './assets/portfolio/location.svg'
import bookIcon from './assets/portfolio/book.svg'
import tributaryImg from './assets/portfolio/tributary.png'
import lightModeImg from './assets/portfolio/light-mode.png'
import nudgeImg from './assets/portfolio/nudge.png'
import whereableImg from './assets/portfolio/whereable.png'

const IMAGE_SOURCES = [
  tributaryImg,
  lightModeImg,
  nudgeImg,
  whereableImg,
  locationIcon,
  bookIcon,
]

function App() {
  const [ready, setReady] = useState(false)
  const sources = useMemo(() => IMAGE_SOURCES, [])
  const onFinished = useCallback(() => setReady(true), [])

  return (
    <>
      <DappledLight />
      {!ready && <LoadingScreen sources={sources} onFinished={onFinished} />}
      {ready && (
        <>
          <Wireframe />
          <AsteriskCursor />
        </>
      )}
    </>
  )
}

export default App
