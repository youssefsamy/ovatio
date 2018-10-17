'use strict';

var Sequelize = require('sequelize');

var model = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    businessName: {
        type: Sequelize.STRING
    },
    address1: {
        type: Sequelize.STRING
    },
    address2: {
        type: Sequelize.STRING
    },
    zipCode: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING
    },
    switchboardPhone: {
        type: Sequelize.STRING
    },
    country: {
        type: Sequelize.STRING
    },
    fax: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    }
}

module.exports = function (sequelize, DataTypes) {
    const expert = sequelize.define('expert', model, {
        tableName: 'experts'
    });
    expert.associate = function (models) {
        expert.belongsToMany(models.user, {
            as: 'contacts',
            through: 'experts_users',
            foreignKey: 'expertId'
        })
        expert.hasMany(models.manifestation, {
            as: 'manifestations',
            foreignKey: 'expertId'
        })
    }
    return expert;
};
