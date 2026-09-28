import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './style.css'

ReactDOM.createRoot(document.getElementById('root')).render(<App/>)

// PWA Service Worker - fixes PWABuilder warning
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('KLA-MEET SW registered:', reg.scope))
      .catch(err => console.log('SW failed:', err));
  });
}