const express = require('express');
const { dataPeminjaman } = require('../../controller/dashboard/reportController')
const routes = express.Router();

routes.get('/', dataPeminjaman);

module.exports = routes;