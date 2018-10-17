'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('manifestations', 'clientId', Sequelize.INTEGER)
  },

  down: function (queryInterface, Sequelize) {

  }
};
