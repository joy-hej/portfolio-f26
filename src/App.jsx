import { lazy, Suspense, useCallback, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import DappledLight from './DappledLight.jsx'
import AsteriskCursor from './AsteriskCursor.jsx'
import LoadingScreen from './LoadingScreen.jsx'
import RootLayout from './layouts/RootLayout.jsx'
import HomePage from './pages/HomePage.jsx'

const PlayPage = lazy(() => import('./pages/PlayPage.jsx'))
const AboutPage = lazy(() => import('./pages/AboutPage.jsx'))
const ResumePage = lazy(() => import('./pages/ResumePage.jsx'))
const TributaryPage = lazy(() => import('./pages/TributaryPage.jsx'))
const LightModePage = lazy(() => import('./pages/LightModePage.jsx'))
const NudgePage = lazy(() => import('./pages/NudgePage.jsx'))
const WhereAblePage = lazy(() => import('./pages/WhereAblePage.jsx'))
const ColorPickerLampPage = lazy(() => import('./pages/play/ColorPickerLampPage.jsx'))
const DuetMugPage = lazy(() => import('./pages/play/DuetMugPage.jsx'))
const NoiseCancellationPage = lazy(
  () => import('./pages/play/NoiseCancellationPage.jsx'),
)
const AuraPage = lazy(() => import('./pages/play/AuraPage.jsx'))
const ChatHellPage = lazy(() => import('./pages/play/ChatHellPage.jsx'))
const OceanEyesPage = lazy(() => import('./pages/play/OceanEyesPage.jsx'))
const ProjectStubPage = lazy(() => import('./pages/ProjectStubPage.jsx'))

function AppRoutes() {
  return (
    <Suspense fallback={null}>
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
    </Suspense>
  )
}

function App() {
  const [ready, setReady] = useState(false)
  const onFinished = useCallback(() => setReady(true), [])

  return (
    <BrowserRouter>
      <DappledLight />
      {!ready && <LoadingScreen onFinished={onFinished} />}
      {/* Mount homepage under the splash so card images start fetching immediately */}
      <div
        className={ready ? undefined : 'app-boot'}
        aria-hidden={!ready}
      >
        <AppRoutes />
        {ready && <AsteriskCursor />}
      </div>
    </BrowserRouter>
  )
}

export default App
