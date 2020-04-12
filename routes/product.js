const express = require('express')

const api = express.Router();

//Controlador del Producto
const productController = require('../controllers/product')

//LLamados al API
api.get('/product/:id?', productController.getProduct)
api.post('/product', productController.saveProduct)

module.exports = api