import React from 'react'
import ReactDOM from 'react-dom'
import '@style/global.scss'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import ContextProvider from './Context/Context'
import Web3ContextProvider from './Context/Web3ContextProvider'
import { CookiesProvider } from 'react-cookie'
import setup from '@locale/setup'
import { I18nextProvider } from 'react-i18next'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <CookiesProvider>
        <I18nextProvider i18n={setup}>
          <Web3ContextProvider>
            <ContextProvider>
              <App />
            </ContextProvider>
          </Web3ContextProvider>
        </I18nextProvider>
      </CookiesProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
