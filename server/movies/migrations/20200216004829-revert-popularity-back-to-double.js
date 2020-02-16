"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("Movies", "popularity", {
      type: Sequelize.DOUBLE
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("Movies", "popularity", {
      type: Sequelize.INTEGER
    });
  }
};
