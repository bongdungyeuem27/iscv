import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import setup from '@locales/setup'
import { store } from '@redux/store'
import '@styles/global.scss'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { NODE_GRAPHQL_SERVER } from './constants'
import { router } from './routes'

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
    <Provider store={store}>
      <ApolloProvider client={client}>
        <I18nextProvider i18n={setup}>
          <RouterProvider router={router}></RouterProvider>
        </I18nextProvider>
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
)
