const express = require('express');
const app = express();
const category = require('./category');
const user = require('./user');
const barang = require('./barang')
const peminjaman = require('./peminjaman')
const report = require('./report')
const history = require('./history')
const { viewDashboard, checkItem } = require('../../controller/dashboard/indexController')

app.use('/category/', category);
app.use('/user/', user);
app.use('/barang/', barang);
app.use('/peminjaman/', peminjaman);
app.use('/report/', report);
app.use('/history/', history);
app.get('/', viewDashboard)
app.put('/check/:id', checkItem)

module.exports = app