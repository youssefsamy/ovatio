/**
 * Created by KSS on 2017.10.26.
 */

var db = require('../models')
var models = require('./../models')

module.exports.validate = (req, res, next) => {

    models.zipcode.findOne({
        where: {
            cp: req.body.zipcode
        }
    }).then(result => {

        if (result !== null) {
            console.log('success');
        } else {
            console.log('failed');
        }

        return res.status(200).json(result)

    }).catch(next)

    console.log(result);


}

