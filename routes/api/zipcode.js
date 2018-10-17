/**
 * Created by KSS on 2017.10.26.
 */

var express = require('express');
var router = express.Router();
var db = require('../../models')
var models = require('./../../models')
// TODO secure route
router.post('/', function(req, res, next) {

    // TODO this should be in a service
    models.zipcode.findOne({
        where: {
            cp: req.body.zipcode
        }
    }).then(result => {

        if (result !== null) {
            return res.status(200).json({
                valid: true
            })
        } else {
            return res.status(200).json({
                valid: false
            })
        }

    }).catch(next)

});

module.exports = router;