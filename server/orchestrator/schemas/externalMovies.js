const { gql } = require(`apollo-server`);
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();

const externalMovieData = `
  title: String
  original_title: String
  overview: String
  poster_path: String
  popularity: Float 
`;

const typeDefs = gql`
  extend type Query {
    nowPlaying: [ExternalMovie]
    popular: [ExternalMovie]
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
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=9a93202bb0718ae530a1273f3b382e2f&page=1`
      );
      console.log(data.results[0].popularity % 1 === 0);

      return data.results;
      //   const cachedMovies = await redis.hvals("movies");
      //   if (cachedMovies.length) {
      //     return cachedMovies.map(JSON.parse);
      //   }

      //   const { data } = await axios.get(`${process.env.MOVIES_API}/movies`);
      //   const movies = data.reduce((acc, movie) => {
      //     acc.push(`movie:${movie.id}`, JSON.stringify(movie));
      //     return acc;
      //   }, []);
      //   redis.hset("movies", ...movies);
      //   redis.expire("movies", 3600);
      //   return data;
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
