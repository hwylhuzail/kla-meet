import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './style.css'

ReactDOM.createRoot(document.getElementById('root')).render(<App/>)

// KILL old broken SW that cached white screen
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(regs => {
    regs.forEach(r => r.unregister())
    caches.keys().then(keys => keys.forEach(k => caches.delete(k)))
  })
}