const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');

const app = express();

// Load schema & resolvers
const typeDefs = require('./schema/schema');
const resolvers = require('./resolver/resolver');

// Load db methods
const mongoDataMethods = require('./data/db');

// connect to MongooseDB
const connectBD = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://toanwebdev:02012001@graphql.4vse5.mongodb.net/Graphql?retryWrites=true&w=majority'
    );
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

connectBD();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ mongoDataMethods }),
});

const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
};

startServer();

app.listen({ port: 4000 }, () => {
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
});
