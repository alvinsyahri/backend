const express = require('express');
const { actionLogout, actionLogin, } = require('../../controller/auth/auth')
const routes = express.Router();

routes.post('/login', actionLogin);
routes.get('/logout', actionLogout);

module.exports = routes;