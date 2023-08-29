const express = require('express');
const { viewPeminjaman, addPeminjaman, editPeminjaman, checkPeminjaman } = require('../../controller/dashboard/peminjamanController')
const routes = express.Router();

routes.get('/', viewPeminjaman);
routes.post('/', addPeminjaman);
routes.put('/:id', editPeminjaman);
routes.put('/check/:id', checkPeminjaman);

module.exports = routes;