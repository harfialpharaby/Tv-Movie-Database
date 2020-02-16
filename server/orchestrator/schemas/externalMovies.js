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
    nowPlaying: [EMovie]
    popular: [EMovie]
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
    nowPlaying: async () => {
      const cachedNowPlaying = await redis.hvals("nowPlaying");
      if (cachedNowPlaying.length) {
        return cachedNowPlaying.map(JSON.parse);
      }

      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.API_KEY}&page=1`
      );
      const eMovies = data.results.reduce((acc, eMovie) => {
        acc.push(`eMovie:${eMovie.id}`, JSON.stringify(eMovie));
        return acc;
      }, []);
      redis.hset("nowPlaying", ...eMovies);
      redis.expire("nowPlaying", 3600);
      return data.results;
    },
    popular: async (parent, args) => {
      const cachedPopular = await redis.hvals("popular");
      if (cachedPopular.length) {
        return cachedPopular.map(JSON.parse);
      }

      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&page=1`
      );
      const eMovies = data.results.reduce((acc, eMovie) => {
        acc.push(`eMovie:${eMovie.id}`, JSON.stringify(eMovie));
        return acc;
      }, []);
      redis.hset("popular", ...eMovies);
      redis.expire("popular", 3600);
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
