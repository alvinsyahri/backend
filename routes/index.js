const express = require('express');
const app = express();
const indexDashboard = require('./dashboard/index');
const indexClient = require('./client/index');
const { verifyUser } = require('../middleware/verifyUser')
const auth = require('./auth/auth')

app.use(auth);
app.use('/dashboard/', [verifyUser, indexDashboard]);
app.use('/client/', [verifyUser, indexClient]);

module.exports = app