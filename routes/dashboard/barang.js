const express = require('express');
const { viewBarang, addBarang, editBarang, deleteBarang} = require('../../controller/dashboard/barangController')
const routes = express.Router();

routes.get('/', viewBarang);
routes.post('/', addBarang);
routes.put('/:id', editBarang);
routes.delete('/:id', deleteBarang);

module.exports = routes;