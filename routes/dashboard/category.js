const express = require('express');
const { viewCategory, addCategory, editCategory, deleteCategory } = require('../../controller/dashboard/categoryController')
const routes = express.Router();

routes.get('/', viewCategory);
routes.post('/', addCategory);
routes.put('/:id', editCategory);
routes.delete('/:id', deleteCategory);

module.exports = routes;