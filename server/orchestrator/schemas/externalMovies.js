const { gql } = require(`apollo-server`);
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();

const externalMovieData = `
  title: String
  original_title: String
  overview: String
  poster_path: String
  popularity: Int 
`;

const typeDefs = gql`
  extend type Query {
    nowPlaying: [externalMovie]
    popular: [externalMovie]
    externalMovie(id: String, ${externalMovieData}): ExternalMovie
  }

  type ExternalMovie {
    id: String
    ${externalMovieData}
  }
`;

const resolvers = {
  Query: {
    nowPlaying: async () => {
      const cachedMovies = await redis.hvals("movies");
      if (cachedMovies.length) {
        return cachedMovies.map(JSON.parse);
      }

      const { data } = await axios.get(`${process.env.MOVIES_API}/movies`);
      const movies = data.reduce((acc, movie) => {
        acc.push(`movie:${movie.id}`, JSON.stringify(movie));
        return acc;
      }, []);
      redis.hset("movies", ...movies);
      redis.expire("movies", 3600);
      return data;
    },
    externalMovie: async (parent, args) => {
      const { id } = args;

      const cachedSelectedMovie = await redis.hget("movies", `movie:${id}`);
      if (cachedSelectedMovie) {
        return JSON.parse(cachedSelectedMovie);
      }

      const { data } = await axios.get(
        `${process.env.MOVIES_API}/movies/${args.id}`
      );
      if (data) {
        redis.hset("movies", `movie:${id}`, JSON.stringify(data));
        redis.expire("movies", 3600);
      }
      return data;
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
