import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import setup from '@locale/setup'
import { store } from '@redux/store'
import '@style/global.scss'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { NODE_GRAPHQL_SERVER } from './Constant'

const root = createRoot(document.getElementById('root') as HTMLElement)

const client = new ApolloClient({
  uri: NODE_GRAPHQL_SERVER,
  cache: new InMemoryCache({
    addTypename: true,
    typePolicies: {
      employeeByUser: {
        keyFields: ['profile'],
        queryType: true,
      },
    },
  }),
  connectToDevTools: true,
})

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <I18nextProvider i18n={setup}>
            <App />
          </I18nextProvider>
        </ApolloProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)
