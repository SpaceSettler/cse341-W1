const routes  = require('express').Router();

const myController = require('../controllers/contacts');

routes.get('/', myController.all);
routes.get('/:id', myController.one);

module.exports = routes;