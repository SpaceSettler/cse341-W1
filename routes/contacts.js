const routes  = require('express').Router();

const myController = require('../controllers/contacts');

routes.get('/', myController.all);
routes.get('/:id', myController.one);
routes.post('/post', myController.postThis);
routes.put('/:id', myController.putThis);
routes.delete('/:id', myController.deleteThis);

module.exports = routes;