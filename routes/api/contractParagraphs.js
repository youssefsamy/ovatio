var express = require('express');
var router = express.Router();
var sequelize = require('sequelize');
var ContractParagraphService = require('./../../services/ContractParagraphsService');


router.get('/', function(req, res) {
	ContractParagraphService.get(req.query).then(function(data) {
		res.status(200).send(data);
	}).catch(function(err) {
		res.status(404).send(err);
	});
});
router.post('/', function(req, res) {
	ContractParagraphService.create(req.body).then(function(data) {
		res.status(200).send(data);
	}).catch(function(err) {
		res.status(404).send(err);
	});
});

module.exports = router;
