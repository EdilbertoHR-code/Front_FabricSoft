import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'

import App from './App.tsx'
import './index.css'
import { FabricProvider } from './store/FabricContext.tsx'

// When a lazy chunk can't load (stale hash after new deploy), reload once to pick up new assets.
window.addEventListener('vite:preloadError', () => {
  if (!sessionStorage.getItem('chunk-reload')) {
    sessionStorage.setItem('chunk-reload', '1')
    window.location.reload()
  }
})

// ClerkProvider ya NO envuelve la app aqui: vive en ClerkBoundary y solo
// cubre las rutas de auth/admin. Asi la landing publica no carga Clerk.
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <FabricProvider>
        <App />
        <Toaster theme="dark" position="bottom-right" richColors />
      </FabricProvider>
    </BrowserRouter>
  </React.StrictMode>,
)