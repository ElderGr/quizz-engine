import React from 'react'
import ReactDOM from 'react-dom/client'
import './reset.css'
import './global.css'
import { Routes } from './routes'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
)
