require("dotenv").config();
import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { connectDatabase } from './database';
import { typeDefs, resolvers } from './graphql';

const port = process.env.PORT || 9000;

const mount = async (app: Application) => {
  const db = await connectDatabase();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ db }), //pass the db into context
  });
  server.applyMiddleware({ app, path: '/api' });
  app.listen(port);
  console.log(`app running at http://localhost:${port}`);
};

mount(express());
