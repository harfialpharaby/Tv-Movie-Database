const { gql } = require(`apollo-server`);
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();

const eMovieData = `
  title: String
  original_title: String
  overview: String
  poster_path: String
  popularity: Float 
`;

const typeDefs = gql`
  extend type Query {
    nowPlaying (page: Int): [EMovie]
    popular (page: Int): [EMovie]
    eMovie(id: String, ${eMovieData}): EMovie
  }

  type EMovie {
    id: String
    ${eMovieData}
    tags: [Tag]
  }

  type Tag {
    id: Int
    name: String
  }
`;

const resolvers = {
  Query: {
    nowPlaying: async (parent, args) => {
      const { page } = args;
      const cachedNowPlaying = await redis.hvals("nowPlaying");
      if (cachedNowPlaying.length >= 20 * page) {
        return cachedNowPlaying.map(JSON.parse);
      }

      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.API_KEY}&page=${page}`
      );
      const eMovies = data.results.reduce((acc, eMovie) => {
        acc.push(`eMovie:${eMovie.id}`, JSON.stringify(eMovie));
        return acc;
      }, []);
      redis.hset("nowPlaying", ...eMovies);
      redis.expire("nowPlaying", 86400);
      return data.results;
    },
    popular: async (parent, args) => {
      const { page } = args;
      const cachedPopular = await redis.hvals("popular");
      if (cachedPopular.length >= 20 * page) {
        return cachedPopular.map(JSON.parse);
      }

      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&page=${page}`
      );
      const eMovies = data.results.reduce((acc, eMovie) => {
        acc.push(`eMovie:${eMovie.id}`, JSON.stringify(eMovie));
        return acc;
      }, []);
      redis.hset("popular", ...eMovies);
      redis.expire("popular", 86400);
      return data.results;
    }
  },
  EMovie: {
    tags: async parent => {
      let tags = null;
      const { genre_ids } = parent;
      const cachedTags = await redis.hvals("tags");
      if (cachedTags.length) {
        const tags = cachedTags.filter(strTag => {
          const { id } = JSON.parse(strTag);
          return genre_ids.includes(id);
        });
        return tags.map(JSON.parse);
      }

      const { data } = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}`
      );
      tags = data.genres.reduce(
        (acc, genre) => {
          acc.cache.push(`tag:${genre.id}`, JSON.stringify(genre));
          if (genre_ids.includes(genre.id)) {
            acc.current.push(genre);
          }
          return acc;
        },
        { cache: [], current: [] }
      );
      redis.hset("tags", ...tags.cache);
      redis.expire("tags", 86400);

      return tags.current;
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
