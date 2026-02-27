import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1A1A1A',
            color: '#F5F0E8',
            border: '1px solid rgba(201, 168, 76, 0.3)',
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '14px',
          },
          success: {
            iconTheme: { primary: '#C9A84C', secondary: '#0D0D0D' },
          },
          error: {
            iconTheme: { primary: '#B03030', secondary: '#0D0D0D' },
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
)
