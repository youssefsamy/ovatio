var models  = require('./../models');

/**
 * Get a slice of the entries, used for pagination
 * @returns {Promise.<Array.<Model>>}
 */
module.exports.get = (query) => {
	var queryParams = {};
	queryParams.order = [['level', 'ASC'], ['subLevel', 'ASC']];
	if (query['manifestation_id']){
		queryParams.where = {
			manifestation_id: parseInt(query['manifestation_id'])
		};
	}
	return models.contractParagraph.findAll(queryParams);
};

module.exports.create = function(newContractParagraph) {
    return models.contractParagraph.create(newContractParagraph);
};

