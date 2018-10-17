'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('users', 'isActive', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('users', 'isActive')
  }
};
