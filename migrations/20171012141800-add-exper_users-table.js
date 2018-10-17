'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable(
      'experts_users',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        expertId: {
          type: Sequelize.INTEGER,
        },
        userId: {
          type: Sequelize.INTEGER,
        },
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        }
      },
      {
        charset: 'utf8',
      }
    )
      .then(() => Promise.all([
        queryInterface.addConstraint('experts_users', ['expertId'], {
          name: 'pivotExperts_experts_users',
          type: 'FOREIGN KEY',
          references: {
            table: 'experts',
            field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        }),
        queryInterface.addConstraint('experts_users', ['userId'], {
          name: 'pivotUsers_experts_users',
          type: 'FOREIGN KEY',
          references: {
            table: 'users',
            field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        })
      ]))
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all(
      [
        queryInterface.removeConstraint('experts_users', 'pivotExperts_experts_users'),
        queryInterface.removeConstraint('experts_users', 'pivotUsers_experts_users'),

      ]
    ).then(() => queryInterface.dropTable('experts_users'))
  }
};
