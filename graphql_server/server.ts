const express = require('express')

const path = require('path')

const { ApolloServer } = require('apollo-server-express')

const { loadFilesSync } = require('@graphql-tools/load-files')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { URLTypeDefinition, DateTimeTypeDefinition } = require('graphql-scalars')


const typesArray = loadFilesSync(path.join(__dirname, '**/*.graphql'));
const resolversArray = loadFilesSync(path.join(__dirname, '**/*.resolvers.js'));

const { options: corsOptions } = require('./utils/corsOptions')

async function startApolloServer() {
  const app = express();

  const schema = makeExecutableSchema({
    typeDefs: [
      ...typesArray,
      DateTimeTypeDefinition,
      URLTypeDefinition
    ],
    resolvers: resolversArray
  });

  const server = new ApolloServer({
    schema: schema
  });

  await server.start();
  server.applyMiddleware({ app, path: '/graphql', cors: corsOptions });

  const PORT: string | number = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`GraphQL server is listening on port number ${PORT}`)
  });
}


startApolloServer();