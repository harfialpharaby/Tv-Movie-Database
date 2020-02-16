const { gql } = require(`apollo-server`);
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();

const MovieData = `
  title: String
  overview: String
  posterPath: String
  popularity: Int
  tags: [String]
`;

const typeDefs = gql`
  extend type Query {
    movies: [Movie]
    movie(_id: String, ${MovieData}): Movie
  }

  extend type Mutation {
    addMovie(${MovieData}): Movie
    updateMovie(_id: String, ${MovieData}): Movie
    deleteMovie(_id: String): Message
    flushAllMovies: DeletedCount
    bulkDeleteMovies(_id: [String] ): DeletedCount
  }

  extend type Message {
    movie: Movie
  }

  type Movie {
    _id: String
    ${MovieData}
  }
`;

const resolvers = {
  Query: {
    movies: async () => {
      const cachedMovies = await redis.hvals("movies");
      if (cachedMovies.length) {
        return cachedMovies.map(JSON.parse);
      }

      const { data } = await axios.get(`${process.env.MOVIES_API}/movies`);
      const movies = data.reduce((acc, movie) => {
        acc.push(`movie:${movie._id}`, JSON.stringify(movie));
        return acc;
      }, []);
      redis.hset("movies", ...movies);
      redis.expire("movies", 3600);
      return data;
    },
    movie: async (parent, args) => {
      const { _id } = args;

      const cachedSelectedMovie = await redis.hget("movies", `movie:${_id}`);
      if (cachedSelectedMovie) {
        return JSON.parse(cachedSelectedMovie);
      }

      const { data } = await axios.get(
        `${process.env.MOVIES_API}/movies/${args._id}`
      );
      if (data) {
        redis.hset("movies", `movie:${_id}`, JSON.stringify(data));
        redis.expire("movies", 3600);
      }
      return data;
    }
  },
  Mutation: {
    addMovie: async (parent, args) => {
      const { data } = await axios.post(
        `${process.env.MOVIES_API}/movies`,
        args
      );
      redis.hset("movies", `movie:${data._id}`, JSON.stringify(data));
      redis.expire("movies", 3600);
      return data;
    },
    updateMovie: async (parent, args) => {
      const { data } = await axios.patch(
        `${process.env.MOVIES_API}/movies/${args._id}`,
        args
      );
      redis.hset("movies", `movie:${data._id}`, JSON.stringify(data));
      redis.expire("movies", 3600);
      return data;
    },
    deleteMovie: async (parent, args) => {
      const { data } = await axios.delete(
        `${process.env.MOVIES_API}/movies/${args._id}`
      );
      redis.hdel("movies", `movie:${args._id}`);
      redis.expire("movies", 3600);
      return data;
    },
    flushAllMovies: async (parent, args) => {
      const { data } = await axios.delete(
        `${process.env.MOVIES_API}/movies/all`
      );
      redis.del("movies");
      return data;
    },
    bulkDeleteMovies: async (parent, args) => {
      const { data } = await axios.delete(
        `${process.env.MOVIES_API}/movies/bulk`,
        {
          data: args
        }
      );
      const deletedMovies = args._id.reduce((acc, movieId) => {
        acc.push(`movie:${movieId}`);
        return acc;
      }, []);
      redis.hdel("movies", ...deletedMovies);
      return data;
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
