var models = require('./../models');
var editInsuranceCompanyContact = require("./UsersService").editInsuranceCompanyContact;
var deleteInsuranceCompanyContact = require("./UsersService").delete;

module.exports.create = (expert, roleDao) => {
    return models.expert.create(expert)
        .then((expertDao) => updateContacts(expertDao, expert, roleDao))
}

module.exports.edit = (id, expert, roleDao) => {
    return models.expert.update(expert, {
        where: {
            id: id
        }
    })
        .then(() => models.expert.findById(id))
        .then((expertDao) => updateContacts(expertDao, expert, roleDao))
}

function updateContacts(expertDao, expert, roleDao) {
    if (expert.contacts && expert.contacts.length > 0) {
        var promises = [];
        expert.contacts.forEach(function (_contact) {
            if (_contact.isDeleted) {
                if (_contact.id) {
                    promises.push(
                        deleteInsuranceCompanyContact(_contact.id)
                    )
                }
            } else {
                promises.push(editInsuranceCompanyContact(_contact, roleDao).then(
                    function (userDao) {
                        return expertDao.addContact(userDao);
                    }
                ))
            }

        });
        return Promise.all(promises).then(function () {
            return expertDao
        }, function (err) {
            console.error(err);
        })
    } else {
        return expertDao
    }
}

/**
 * Get a specific expert by ID
 * @param id - id of the expert
 * @returns {Promise.<Array.<Model>>}
 */
module.exports.getById = function (id) {
    return models.expert.findOne({
        where: {
            id: id
        },
        include: [
            {
                model: models.user,
                as: 'contacts',
                required: false,
                where: {}
            }
        ]
    });
};
