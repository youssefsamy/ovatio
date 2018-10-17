'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('contract_paragraphs', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      manifestation_id: {
        type: Sequelize.INTEGER,
      },
      level: {
        type: Sequelize.INTEGER,
      },
      subLevel: {
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.TEXT
      },
      condition: {
        type: Sequelize.TEXT
      },
      editor: {
        type: Sequelize.TEXT
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue : new Date()
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue : new Date()
      }
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('contract_paragraphs');
  }
};
