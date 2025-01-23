const routes  = require('express').Router();

const myController = require('../controllers');

routes.get('/', myController.route1);

module.exports = routes;