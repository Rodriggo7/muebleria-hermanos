import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/global.css'
import './styles/Navbar.css'
import './styles/Button.css'
import './styles/ProductCard.css'
import './styles/Loader.css'
import './styles/Footer.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
