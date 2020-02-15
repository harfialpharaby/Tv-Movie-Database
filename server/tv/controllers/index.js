const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const model = require("../models/tv");

class Tv {
  static async getTv(req, res, next) {
    try {
      const tvPrograms = await model.find();
      res.status(200).json(tvPrograms);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async getTvById(req, res, next) {
    try {
      const { id } = req.params;
      const tvProgram = await model.findOne({
        _id: ObjectId(id)
      });
      res.status(200).json(tvProgram);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async addTv(req, res, next) {
    try {
      const newTvProgram = await model.create(req.body);
      res.status(201).json(newTvProgram);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async updateTv(req, res, next) {
    try {
      const { id } = req.params;
      const tvProgram = await model.findByIdAndUpdate(id, req.body, {
        new: true
      });
      res.status(200).json(tvProgram);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async deleteTv(req, res, next) {
    try {
      const { id } = req.params;
      const tv = await model.findByIdAndDelete(id);
      const status = tv ? 1 : 0;
      res.status(200).json({ status, tv });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async flushAllTv(req, res, next) {
    try {
      const data = await model.deleteMany();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async bulkDeleteTv(req, res, next) {
    try {
      const { _id } = req.body;
      const ids = _id.reduce((acc, id) => {
        acc.push(ObjectId(id));
        return acc;
      }, []);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = Tv;
