var db = require('../models')
var models = require('./../models')
var ExpertService = require('../services/ExpertService')
var RoleService = require('../services/RolesService')

module.exports.getCount = (req, res, next) => {
    models.expert.count().then(result => {
        return res.status(200).json(result)
    })
}

module.exports.loadExperts = (req, res, next) => {
    var queryParams = {}
    if (req.query.offset)
        queryParams.offset = parseInt(req.query.offset)
    if (req.query.limit)
        queryParams.limit = parseInt(req.query.limit)
    var sortable = ['businessName', 'address1', 'zipCode', 'city']
    if (sortable.indexOf(req.query.sort) > -1)
        queryParams.order = [[req.query.sort, req.query.order === 'DESC' ? 'DESC' : 'ASC']]
    if (req.query.search)
        queryParams.where = {
            businessName: {
                $like: '%' + req.query.search + '%'
            }
        }
    else if (req.query.id)
        queryParams.where = {
            id: {
                $eq: req.query.id
            }
        }

    models.expert.all(queryParams).then(results => {
        return res.status(200).json(results)
    }).catch(next)
}

module.exports.addExpert = (req, res, next) => {
    RoleService.getByLabel("EXPERT")
        .then(role => ExpertService.create(req.body.expert, role))
        .then(result => res.status(200).json(result))
        .catch(next)
}

module.exports.loadExpert = (req, res, next) => {
    ExpertService.getById(req.params.id).then(result => {
        return res.status(200).json(result)
    }).catch(next)
}

module.exports.updateExpert = (req, res, next) => {
    RoleService.getByLabel("EXPERT")
        .then(role => ExpertService.edit(req.params.id, req.body.expert, role))
        .then(result => res.status(200).json(result))
        .catch(next)
}

module.exports.deleteExpert = (req, res, next) => {
    models.contact.destroy({
        where: {
            expert_id: req.params.id
        }
    }).then(
        models.expert.destroy({
            where: {
                id: req.params.id
            }
        }).then(result => {
            return res.status(200).json(result)
        }).catch(next)
        )
}
