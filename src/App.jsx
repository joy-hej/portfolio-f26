import { useCallback, useMemo, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import DappledLight from './DappledLight.jsx'
import AsteriskCursor from './AsteriskCursor.jsx'
import LoadingScreen from './LoadingScreen.jsx'
import RootLayout from './layouts/RootLayout.jsx'
import HomePage from './pages/HomePage.jsx'
import PlayPage from './pages/PlayPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ResumePage from './pages/ResumePage.jsx'
import TributaryPage from './pages/TributaryPage.jsx'
import LightModePage from './pages/LightModePage.jsx'
import NudgePage from './pages/NudgePage.jsx'
import WhereAblePage from './pages/WhereAblePage.jsx'
import ColorPickerLampPage from './pages/play/ColorPickerLampPage.jsx'
import DuetMugPage from './pages/play/DuetMugPage.jsx'
import NoiseCancellationPage from './pages/play/NoiseCancellationPage.jsx'
import AuraPage from './pages/play/AuraPage.jsx'
import ChatHellPage from './pages/play/ChatHellPage.jsx'
import OceanEyesPage from './pages/play/OceanEyesPage.jsx'
import ProjectStubPage from './pages/ProjectStubPage.jsx'
import { PLAY_PROJECTS, PROJECTS } from './data'
import locationIcon from './assets/icons/location.svg'
import bookIcon from './assets/icons/book.svg'
import aboutPhoto from './assets/portfolio/about-photo.png'

const IMAGE_SOURCES = [
  locationIcon,
  bookIcon,
  aboutPhoto,
  ...PROJECTS.map((p) => p.image),
  ...PLAY_PROJECTS.map((p) => p.image).filter(Boolean),
]

function AppRoutes() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="play" element={<PlayPage />} />
        <Route path="play/color-picker-lamp" element={<ColorPickerLampPage />} />
        <Route path="play/duet-mug" element={<DuetMugPage />} />
        <Route
          path="play/noise-cancellation"
          element={<NoiseCancellationPage />}
        />
        <Route path="play/aura" element={<AuraPage />} />
        <Route
          path="play/chat-am-i-going-to-hell"
          element={<ChatHellPage />}
        />
        <Route path="play/ocean-eyes" element={<OceanEyesPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="resume" element={<ResumePage />} />
        <Route path="work/tributary" element={<TributaryPage />} />
        <Route path="work/light-mode" element={<LightModePage />} />
        <Route path="work/nudge" element={<NudgePage />} />
        <Route path="work/whereable" element={<WhereAblePage />} />
        <Route path="work/:slug" element={<ProjectStubPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

function App() {
  const [ready, setReady] = useState(false)
  const sources = useMemo(() => IMAGE_SOURCES, [])
  const onFinished = useCallback(() => setReady(true), [])

  return (
    <BrowserRouter>
      <DappledLight />
      {!ready && <LoadingScreen sources={sources} onFinished={onFinished} />}
      {ready && (
        <>
          <AppRoutes />
          <AsteriskCursor />
        </>
      )}
    </BrowserRouter>
  )
}

export default App
