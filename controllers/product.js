const mongoose = require('mongoose');

const Product = require('../models/product')
const Categories = require('../models/category')

/*     FUNCION PARA OBTENER TU PRODUCTO    */

const getProduct = (req,res) => {
    let id = req.params.id
    const name = req.query.name || null
    const category = req.query.category || null
    let filter

    if(!id){
        if(name){
            filter = {name}      
        }else if(category){
            filter = {category}
        }else{
            filter = {}
        }
    }else{
        id.length != 24 ? res.status(400).send({ok: false, error: 'El id enviado no es valido'}) : filter = {_id:id}
    }
    Product.find(filter)
        .populate({path:'Category'})
        .exec((err,products)=>{
            if (err) {
                res.status(500)
                    .send({ ok: false, error : err.message })
            }else{
                if(!products[0]){
                    res.status(404)
                        .send({ ok: false, error : 'El producto no ha sido encontrado' })
                }else{
                    res.status(200)
                        .send({ ok:true,products}) 
                }
            }
        })
}

/*     FUNCION PARA GUARDAR UN NUEVO PRODUCTO    */

const saveProduct = (req,res)=>{
    let params = req.body

    const newProduct = new Product({
        name: params.name,
        category: params.category,
        description: params.description,
        image: params.image,
        price: params.price,
        oldPrice: params.oldPrice,
        starts: 0,
        ofert: params.ofert,
        discount: params.discount,
        sellAmount: 0
    })
    //Validamos la extencion correcta del id de la categoria
    params.category.length != 24 ? res.status(400).send({ok: false, error: 'El id de categoria enviado no es valido'}) : 
    //Validamos que el ID de la categoria, exista
    Categories.find({_id: params.category})
        .exec((err,category)=>{
            if (err){
                return res.status(500)
                    .send({ ok: false, error : err.message })
            } else{
                if(!category[0]){
                    return res.status(404)
                        .send({ ok: false, error : 'La categoria no ha sido encontrada' })
                }else{
                    //Guardamos el producto si los datos son correctos
                    newProduct.save((err,newProd)=>{
                        if (err){
                            return res.status(500)
                                    .send({ ok: false, error : err.message })
                        } else{
                            if(!newProd._id){
                                return res.status(404)
                                        .send({ ok: false, error : 'El producto no ha sido obtenido' })
                            }else{
                                return res.status(200)
                                        .send({product: newProd})
                            }
                        }
                    })
                }
            }
        })
}

module.exports = {
    getProduct,
    saveProduct
}