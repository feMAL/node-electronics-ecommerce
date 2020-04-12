const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        required: [true,'El nombre del producto es obligatorio']
    },
    category: {
        type: Schema.ObjectId,
        ref: 'Category',
        required: [true,'La categoría del producto es obligatorio']
    },
    description: {
        type: String,
        required: [true,'La descripción del producto es obligatorio']
    },
    image: [{
        type: Object,
        required: false
    }],
    price:{
        type: Number,
        require:[true,'El precio del producto es obligatorio']
    },
    oldprice:{
        type: Number,
        required: false
    },
    starts:{
        type : Number,
        required:[true,'La cantidad de Estrellas del producto es obligatorio'],
        default: 0
    },
    ofert:{
        type: Boolean,
        required: [true,'Este campo es obligatorio'],
        default: false
    },
    discount: {
        type : Number,
        required:[true,'El descuento del producto es obligatorio'],
        default: 0
    },
    sellAmount: {
        type: Number,
        required: [true,'La cantidad vendida del producto es obligatorio'],
        default: 0
    }
})

module.exports = mongoose.model('Product',productSchema)