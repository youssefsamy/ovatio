"use strict";

module.exports = function(sequelize, DataTypes) {
    var zipcode = sequelize.define("zipcode", {
        // column in init migration path
        cp_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // column in init migration
        codepays : {
            type: DataTypes.STRING,
        },
        // column in init migration
        cp : {
            type: DataTypes.STRING,
        },
        // column in init migration
        ville : {
            type: DataTypes.STRING,
        },
        // column init migration
        createdAt : {
            type: DataTypes.DATE
        },
        // column in init migration
        updatedAt : {
            type: DataTypes.DATE
        }
    }, {
        tableName: 'zipcode' // THIS LINE HERE
    });
    return zipcode;
};