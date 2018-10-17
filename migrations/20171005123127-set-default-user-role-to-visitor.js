'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('UPDATE `users` SET `roleId` = 7 WHERE `roleId` IS NULL')
      .then(queryInterface.changeColumn('users', 'roleId', {
        type: Sequelize.INTEGER,
        defaultValue: 7
      }))
    },

  down: (queryInterface, Sequelize) => {
  }
};
