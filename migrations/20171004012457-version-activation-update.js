'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.changeColumn('versions', 'activation', Sequelize.DATE);

  },

  down: (queryInterface, Sequelize) => {
    queryInterface.changeColumn('versions', 'activation', Sequelize.DATEONLY);
  }
};
