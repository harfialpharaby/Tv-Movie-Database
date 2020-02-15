const model = require("../models").Movies;

class Movies {
  static async getMovies(req, res, next) {
    try {
      const movies = await model.findAll();
      res.status(200).json(movies);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async getMovieById(req, res, next) {
    try {
      const { id } = req.params;
      const movies = await model.findAll({ where: { id } });
      res.status(200).json(movies[0]);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async addMovie(req, res, next) {
    try {
      const movie = await model.create(req.body);
      res.status(201).json(movie);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async updateMovie(req, res, next) {
    try {
      const { id } = req.params;
      const movies = await model.update(req.body, {
        where: { _id: id },
        returning: true,
        plain: true
      });
      res.status(200).json(movies[1]);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async deleteMovie(req, res, next) {
    try {
      const { id } = req.params;
      const movieObj = await model.findByPk(id);
      let movie = {};
      let status = 0;
      if (movieObj && movieObj.dataValues) {
        movie = movieObj.dataValues;
        status = await model.destroy({ where: { _id: id } });
      }
      res.status(200).json({ status, movie });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async flushAll(req, res, next) {
    try {
      const movies = await model.findAll();
      const ids = movies.reduce((acc, movie) => {
        acc.push(movie.dataValues._id);
        return acc;
      }, []);
      const deletedCount = await model.destroy({ where: { _id: ids } });
      res.status(200).json({ n: deletedCount, ok: 1, deletedCount });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async bulkDelete(req, res, next) {
    try {
      const { _id } = req.body;
      const movies = await model.findAll({ where: { _id } });
      const ids = movies.reduce((acc, movie) => {
        acc.push(movie.dataValues._id);
        return acc;
      }, []);
      const deletedCount = await model.destroy({ where: { _id: ids } });
      res.status(200).json({ n: deletedCount, ok: 1, deletedCount });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = Movies;
