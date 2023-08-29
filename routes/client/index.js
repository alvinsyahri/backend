const express = require('express');
const app = express();
const { viewPeminjaman, addPeminjaman, editPeminjaman, checkPeminjaman} = require('../../controller/client/indexController')

app.get('/', viewPeminjaman)
app.post('/', addPeminjaman)
app.put('/check/:id', checkPeminjaman)
app.put('/:id', editPeminjaman)

module.exports = app