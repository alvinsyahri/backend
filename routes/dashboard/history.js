const express = require('express');
const { viewHistory, addHistory, editHistory, deleteHistory } = require('../../controller/dashboard/historyItemController')
const routes = express.Router();

routes.get('/', viewHistory);
routes.post('/', addHistory);
routes.put('/:id', editHistory);
routes.delete('/:id', deleteHistory);

module.exports = routes;