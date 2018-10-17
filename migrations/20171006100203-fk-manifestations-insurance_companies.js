'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('manifestations', 'mainInsurerId', {type: Sequelize.INTEGER}),
      queryInterface.changeColumn('manifestations', 'coInsurerId', {type: Sequelize.INTEGER})
    ])
    .then(() => Promise.all([
      queryInterface.addConstraint('manifestations', ['mainInsurerId'], {
        name: 'fkManifestationMainInsurerId',
        type: 'FOREIGN KEY',
        references: {
            table: 'insurance_companies',
            field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }),
      queryInterface.addConstraint('manifestations', ['coInsurerId'], {
        name: 'fkManifestationcoInsurerId',
        type: 'FOREIGN KEY',
        references: {
            table: 'insurance_companies',
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
          queryInterface.removeConstraint('manifestations', 'fkManifestationcoInsurerId'),
          queryInterface.removeConstraint('manifestations', 'fkManifestationMainInsurerId'),

      ])
        .then(function () {
          return Promise.all(
              [
                queryInterface.changeColumn('manifestations', 'mainInsurerId', {type: Sequelize.STRING}),
                queryInterface.changeColumn('manifestations', 'coInsurerId', {type: Sequelize.STRING}),
              ]
          )
        })
  }
};
