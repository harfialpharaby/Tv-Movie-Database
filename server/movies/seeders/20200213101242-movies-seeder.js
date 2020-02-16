"use strict";
const uuidv4 = require("uuid/v4");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Movies",
      [
        {
          id: uuidv4(),
          title: "Kimetsu no Yaiba: Infinity Train",
          overview:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta veniam ad quibusdam, autem debitis ipsa fugiat! Suscipit numquam reiciendis necessitatibus.",
          posterPath:
            "https://cdn.myanimelist.net/images/anime/1238/103624l.jpg",
          popularity: 173972,
          tags: ["action", "demon", "adventure"],
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuidv4(),
          title: "Sen to Chihiro no Kamikakushi",
          overview:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta veniam ad quibusdam, autem debitis ipsa fugiat! Suscipit numquam reiciendis necessitatibus.",
          posterPath: "https://cdn.myanimelist.net/images/anime/6/79597l.jpg",
          popularity: 273881,
          tags: ["adventure", "fantasy", "horror", "animation"],
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Movies", null, {});
  }
};
