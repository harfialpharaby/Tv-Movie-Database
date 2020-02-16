if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

const { ApolloServer, gql, makeExecutableSchema } = require("apollo-server");
const movies = require("./schemas/movies");
const tv = require("./schemas/tv");
const externalMovie = require("./schemas/externalMovies");
const typeDefs = gql`
  type Query
  type Mutation

  type Message {
    status: Int
  }

  type DeletedCount {
    n: Int
    ok: Int
    deletedCount: Int
  }
`;

const schema = makeExecutableSchema({
  typeDefs: [typeDefs, movies.typeDefs, tv.typeDefs, externalMovie.typeDefs],
  resolvers: [movies.resolvers, tv.resolvers, externalMovie.resolvers]
});

const server = new ApolloServer({ schema });

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
