const express = require('express');
const { viewUser, addUser, editUser, deleteUser } = require('../../controller/dashboard/userController')
const routes = express.Router();

routes.get('/', viewUser);
routes.post('/', addUser);
routes.put('/:id', editUser);
routes.delete('/:id', deleteUser);

module.exports = routes;