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
      title: { type: DataTypes.STRING },
      overview: { type: DataTypes.STRING },
      posterPath: { type: DataTypes.STRING },
      popularity: { type: DataTypes.INTEGER },
      tags: { type: DataTypes.ARRAY(DataTypes.STRING) }
    },
    {}
  );

  Movies.associate = function(models) {
    // associations can be defined here
  };
  return Movies;
};
