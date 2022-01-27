import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from "react-apollo"
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { offsetLimitPagination } from '@apollo/client/utilities'

// styles
import './index.scss'

// components
import App from '@/App'

// cache
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getPersonsByPage: {
          keyArgs: false,
          read(existing, { args: { filter } }) {
            if (!filter) return existing;

            return existing[filter];
          },
          merge(existing, incoming, { args: { filter, offset } }) {
            let merged;
            if (filter) merged = (existing && existing[filter]) ? existing[filter].slice(0) : []
            else merged = existing ? existing.slice(0) : []

            for (let i = 0; i < incoming.length; i++) {
              merged[offset + i] = incoming[i]
            }

            if (filter) {
              return { [filter]: merged }
            } 
            return merged
          }
        }
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
