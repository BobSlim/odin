import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { MemoryCardGame } from './components/MemoryCardPage.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MemoryCardGame />
  </React.StrictMode>,
)
