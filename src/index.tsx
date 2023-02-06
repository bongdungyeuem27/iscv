import setup from '@locale/setup'
import '@style/global.scss'
import React from 'react'
import { CookiesProvider } from 'react-cookie'
import { createRoot } from 'react-dom/client'
import { ApolloClient, ApolloProvider, InMemoryCache, useQuery } from '@apollo/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import Web3ContextProvider from '@context/Web3ContextProvider'
import { NODE_GRAPHQL_SERVER } from './Constant'
import { Provider } from 'react-redux'
import { store } from '@redux/store'

const root = createRoot(document.getElementById('root') as HTMLElement)

const client = new ApolloClient({
  uri: NODE_GRAPHQL_SERVER,
  cache: new InMemoryCache({
    addTypename: true,

    typePolicies: {
      employeeByUser: {
        // The RootQueryFragment can only match if the cache knows the __typename
        // of the root query object.
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
          <CookiesProvider>
            <I18nextProvider i18n={setup}>
              <Web3ContextProvider>
                <App />
              </Web3ContextProvider>
            </I18nextProvider>
          </CookiesProvider>
        </ApolloProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)
