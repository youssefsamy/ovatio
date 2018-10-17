"use strict";

module.exports = function(sequelize, DataTypes) {
    var InsuranceCompaniesManifestations = sequelize.define("insurance_companies_manifestations", {
        // column in init migration path
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true

        },
        insuranceCompanyId: {
            type: DataTypes.INTEGER,
        },
        manifestationId: {
            type: DataTypes.INTEGER,
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    });
    return InsuranceCompaniesManifestations;
};
