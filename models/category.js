const mongoose = require('mongoose')

const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre de la categoria es obligatoria']
    },
    description:{
        type: String,
        required: [true, 'La descripcion de la categoria es obligatoria']
    },
    dependency:{
        type: Boolean,
        required: [true, 'El dependencia de la categoria es obligatoria'],
        default: false
    },
    dependencyId:{
        type: Schema.ObjectId,
        ref: 'Category',
        required: false
    }
})

module.exports = mongoose.model('Category',categorySchema)