'use strict';

module.exports = {
	up: function (queryInterface, Sequelize) {
		return queryInterface.createTable('clients_users', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			clientId: {
				type: Sequelize.INTEGER,
			},
			userId: {
				type: Sequelize.INTEGER,
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
	  return queryInterface.dropTable('clients_users');
	}
};
