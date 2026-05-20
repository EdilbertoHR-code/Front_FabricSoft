import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import { esES } from '@clerk/localizations'
import { dark } from '@clerk/themes'
import { Toaster } from 'sonner'

import App from './App.tsx'
import './index.css' 


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Falta la variable de entorno VITE_CLERK_PUBLISHABLE_KEY")
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY} 
      localization={esES}
      appearance={{
        baseTheme: dark,
        variables: { 
          colorPrimary: '#ffffff', 
          colorBackground: '#111111'
        }
      }}
    >
      <BrowserRouter>
        <App />
        {/* Sonner Toaster inyectado a nivel global para notificaciones premium */}
        <Toaster theme="dark" position="bottom-right" richColors />
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>,
)