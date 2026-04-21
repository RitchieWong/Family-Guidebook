import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* HashRouter：GitHub Pages 静态托管下最稳妥，不会因为刷新 404 */}
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
)
