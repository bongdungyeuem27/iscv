import React from 'react'
import { createRoot } from 'react-dom/client'
import '@style/global.scss'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import Web3ContextProvider from './Context/Web3ContextProvider'
import { CookiesProvider } from 'react-cookie'
import setup from '@locale/setup'
import { I18nextProvider } from 'react-i18next'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CookiesProvider>
        <I18nextProvider i18n={setup}>
          <Web3ContextProvider>
            <App />
          </Web3ContextProvider>
        </I18nextProvider>
      </CookiesProvider>
    </BrowserRouter>
  </React.StrictMode>
)
