const { gql } = require(`apollo-server`);
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();

const tvData = `
  title: String
  overview: String
  posterPath: String
  popularity: Float
  tags: [String]
`;

const typeDefs = gql`
  extend type Query {
    tvAll: [Tv]
    tv(_id: String, ${tvData}): Tv
  }

  extend type Mutation {
    addTv(${tvData}): Tv
    updateTv(_id: String, ${tvData}): Tv
    deleteTv(_id: String): Message
    flushAllTv: DeletedCount
    bulkDeleteTv(_id: [String] ): DeletedCount
  }

  extend type Message {
    tv: Tv
  }

  type Tv {
    _id: String
    ${tvData}
  }
`;

const resolvers = {
  Query: {
    tvAll: async () => {
      const cachedTv = await redis.hvals("tv");
      if (cachedTv.length) {
        return cachedTv.map(JSON.parse);
      }

      const { data } = await axios.get(`${process.env.TV_API}/tv`);
      const tv = data.reduce((acc, tv) => {
        acc.push(`tv:${tv._id}`, JSON.stringify(tv));
        return acc;
      }, []);
      redis.hset("tv", ...tv);
      redis.expire("tv", 3600);
      return data;
    },
    tv: async (parent, args) => {
      const { id } = args;

      const cachedSelectedTv = await redis.hget("tv", `tv:${id}`);
      if (cachedSelectedTv) {
        return JSON.parse(cachedSelectedTv);
      }

      const { data } = await axios.get(`${process.env.TV_API}/tv/${id}`);
      redis.hset("tv", `tv:${id}`, JSON.stringify(data));
      redis.expire("tv", 3600);
      return data;
    }
  },
  Mutation: {
    addTv: async (parent, args) => {
      const { data } = await axios.post(`${process.env.TV_API}/tv`, args);
      redis.hset("tv", `tv:${data._id}`, JSON.stringify(data));
      redis.expire("tv", 3600);
      return data;
    },
    updateTv: async (parent, args) => {
      const { data } = await axios.patch(
        `${process.env.TV_API}/tv/${args._id}`,
        args
      );
      redis.hset("tv", `tv:${data._id}`, JSON.stringify(data));
      redis.expire("tv", 3600);
      return data;
    },
    deleteTv: async (parent, args) => {
      const { data } = await axios.delete(
        `${process.env.TV_API}/tv/${args._id}`
      );
      redis.hdel("tv", `tv:${args._id}`);
      return data;
    },
    flushAllTv: async (parent, args) => {
      const { data } = await axios.delete(`${process.env.TV_API}/tv/all`);
      redis.del("tv");
      return data;
    },
    bulkDeleteTv: async (parent, args) => {
      const { data } = await axios.delete(`${process.env.TV_API}/tv/bulk`, {
        data: args
      });
      const deletedTv = args._id.reduce((acc, tvId) => {
        acc.push(`tv:${tvId}`);
        return acc;
      }, []);
      redis.hdel("tv", ...deletedTv);
      return data;
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
