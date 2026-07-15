import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
/* Self-hosted — Firefox private often blocks fonts.googleapis.com */
import '@fontsource/poppins/latin-400.css'
import '@fontsource/poppins/latin-700.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
