/**
 * @module Service Client
 */

var models = require('./../models');
var sequelize = require('sequelize');
var editClientContact = require("./UsersService").editInsuranceCompanyContact;
var deleteClientContact = require("./UsersService").delete;

/**
 * Get a slice of the entries, used for pagination
 * @param id {string} - ID of the client
 * @returns {Promise.<Array.<Model>>}
 */
module.exports.getById = function (id) {
    return models.client.findAll({
        include: [
            {
                model: models.user,
                as: 'contacts',
                required: false,
                where: {}
            },
            {
                model: models.businessStatus,
                as: 'businessStatus'
            }
        ],
        where: {
            id: id
        }
    });
};

function getFilter(query) {
    var likeFilter = {
        $like: '%' + query['search'] + '%'
    };
    return {
        $or: [
            {
                'businessName': likeFilter
            },
            {
                'address': likeFilter
            },
            {
                'postalCode': likeFilter
            },
            {
                'city': likeFilter
            },
            {
                'stdPhone': likeFilter
            },
            {
                'phone': likeFilter
            },
            {
                '$businessStatus.label$': likeFilter
            }
        ]
    }
}

/**
 * FInd function client
 * @param query {json} - limit  offset - order
 * @returns {Promise.<Array.<Model>>}
 */
module.exports.find = function (query) {
    var queryParams = {};
    if (query['offset'])
        queryParams.offset = parseInt(query['offset']);
    if (query['limit'])
        queryParams.limit = parseInt(query['limit']);
    var sortable = ['status', "businessName", "address", "postalCode", "city", "phone"];
    if (sortable.indexOf(query['sort']) > -1) {
        let sortField = query['sort'];
        let order = query['order'] === 'DESC' ? 'DESC' : 'ASC';
        let sort = [[sortField, order]];
        if (sortField == "status") {
            sort = [[models.businessStatus, "label", order]]
        } else if (sortField == "phone") {
            sort = sequelize.literal('ifnull(phone, stdphone) ' + order)
        }
        queryParams.order = sort;
    }
    if (query['search']) {
        queryParams.where = getFilter(query);
    }

    queryParams.include = [
        {
            model: models.businessStatus,
            as: 'businessStatus'
        }
    ]
    return models.client.findAll(queryParams);
};
module.exports.getAutocomplateClients = function (query) {
    var queryParams = {}
    queryParams.limit = 10;
    queryParams.order = [['id', 'DESC']];
    queryParams.where = {
        businessName: {
            $like: '%' + query['search'] + '%'
        }
    };
    queryParams.include = [
        {
            model: models.businessStatus,
            as: 'businessStatus'
        }
    ]
    return models.client.findAll(queryParams);
}
/**
 * Count function of client the query is same than find function
 * @param query
 * @returns {*}
 */
module.exports.count = function (query) {
    var queryParams = {}
    if (query['search']) {
        queryParams.where = getFilter(query);
    }
    return models.client.count(queryParams);
}

/**
 * Update the Insurance Company's data
 */
module.exports.update = function (id, data) {
    return models.client.update(data, {
        where: {
            id: id
        }
    })
};


/**
 * Create an Insurance Company
 * @returns Promise
 */
module.exports.create = function (client) {
    console.log(client)
    return models.client.create(client);
};

/**
 *
 * @param status
 * @returns {status}
 */
module.exports.createBusinessStatus = function (status) {
    return models.businessStatus.findOrCreate(
        {
            where: {label: status.label}
        }
    ).then(function (data) {
        console.log(data);
    })

};


/**
 * Soft delete (mark as disabled) an Insurance Company
 * @param id {string} -id of the client deleted
 */
module.exports.delete = function (id) {
    return models.client.destroy({
        where: {
            id: id
        }
    });
}

module.exports.edit = function (id, client) {
    function hydrate(client, mode) {
        let i = {};
        i.isPro = client.isPro;
        i.businessName = client.businessName;
        i.siretNumber = client.siretNumber;
        i.statusId = client.statusId;
        i.businessStatus = client.businessStatus;
        i.vatNumber = client.vatNumber;
        i.stdPhone = client.stdPhone;
        i.title = client.title;
        i.lastName = client.lastName;
        i.firstName = client.firstName;
        i.email = client.email;
        i.phone = client.phone;
        i.relationShipManagerId = client.relationShipManagerId;
        i.stateId = client.stateId;
        i.address = client.address;
        i.addressCompl = client.addressCompl;
        i.postalCode = client.postalCode;
        i.city = client.city;
        i.countryId = client.countryId;
        i.businessProviderId = client.businessProviderId;
        return i;
    }
    var p;
    if (id) {
        p = models.client.update(hydrate(client, 'update'), {where: {id: id}}).then(function () {
            return models.client.findById(id)
        })
    } else {
        p = models.client.create(hydrate(client, 'create'));
    }
    return p.then(function (clientDao) {
        if (client.contacts && client.contacts.length > 0) {
            var promises = [];
            client.contacts.forEach(function (_contact) {
                if(_contact.isDeleted){
                    if(_contact.id){
                        promises.push(
                            deleteClientContact(_contact.id)
                        )
                    }
                } else {
                    promises.push(editClientContact(_contact).then(
                        function (userDao) {
                            return clientDao.addContact(userDao);
                        }
                    ))
                }

            });
            return Promise.all(promises).then(function () {
                return clientDao
            }, function (err) {
                console.error(err);
            })
        } else {
            return clientDao
        }
    })
};