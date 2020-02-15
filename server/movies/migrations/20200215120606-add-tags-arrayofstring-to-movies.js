"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "Movies",
      "tags",
      Sequelize.ARRAY(Sequelize.STRING)
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Movies", "tags");
  }
};
