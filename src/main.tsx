import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from "react-apollo"
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { relayStylePagination } from '@apollo/client/utilities'

// styles
import './index.scss'

// components
import App from '@/App'

// cache
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getPersonsByPage: relayStylePagination()
      }
    }
  }
});

// client
const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache
})


ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
)
