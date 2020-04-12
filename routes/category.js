const express = require('express')

const api = express.Router()

const categoryController = require('../controllers/category')

api.post('/category', categoryController.saveCategory)
api.get('/category/:id?', categoryController.getCategory)

module.exports = api