"use strict";
const uuid = require("uuid/v5");

module.exports = (sequelize, DataTypes) => {
  const Movies = sequelize.define(
    "Movies",
    {
      _id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        field: "id"
      },
      title: { type: DataTypes.TEXT },
      overview: { type: DataTypes.TEXT },
      posterPath: { type: DataTypes.TEXT },
      popularity: { type: DataTypes.DOUBLE },
      tags: { type: DataTypes.ARRAY(DataTypes.STRING) }
    },
    {}
  );

  Movies.associate = function(models) {
    // associations can be defined here
  };
  return Movies;
};
