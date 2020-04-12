const Category = require('../models/category')

/*     FUNCION PARA OBTENER UNA o TODAS LAS CATEGORIAS    */

const getCategory = (req,res) => {
    let id = req.params.id

    let filter;
    
    if(id){
        id.length != 24 ? res.status(400).send({ok:false, error:'El id enviado es incorrecto'}) : filter = {_id : id}
    }else{
        filter = {}
    }
    Category.find(filter).populate({path:'dependencyId'}).exec((err,categoria)=>{
        if(err){
            //err de servidor
            return res.status(500)
                    .send({ok:false, error: err.message});
        }
        //Validar si encontro el registro
        if(!categoria[0])
        {
            return res.status(404)
                    .send({ok:false, error: 'La categoría no existe'})
        }else{
            return res.status(200)
                    .send({ok:true, category:categoria})
        }
    })
    
}

/*     FUNCION PARA GUARDAR NUEVA CATEGORIA    */

const saveCategory = (req,res) => {
    let params = req.body

    let newCategory = new Category({
        name: params.name,
        description: params.description,
        dependency: params.dependency,
        dependencyId: params.dependencyId
    })
    //Validar si tiene una categoria de dependencia
    if(newCategory.dependency){
        let id;
        //Si tiene categoria de dependencia validar que exista
        newCategory.dependencyId === null ? res.status(400).send({ok:false, error: 'No ha completado campos obligatorios'}) : id = String(newCategory.dependencyId)
        //validacion de longitud de id de dependencia
        id.length != 24 ? res.status(400).send({ok:false, error:'El id de la dependencia enviada es incorrecto'}) : 

        Category.find({_id:id},(err,dependency)=>{
            if(err){
                return res.status(500).send({ok:false, error: err.message});   //err de servidor
            }            
            if(!dependency[0])  //Validar si encontro el registro
            {
                return res.status(404).send({ok:false, error: 'La categoría de dependencia no existe'})
            }else{
                //Si existe la categoria de dependencia
                newCategory.save((err,newCat)=>{
                    if(err){
                        return res.status(500)
                                .send({ok:false, error: err.message});
                    }else{
                        if(!newCat)
                        {
                            return res.status(404)
                                    .send({ok:false, error: 'La nueva categoria no ha sido encontrada'})
                        }
                        return res.status(200)
                                .send({ok:true, category:newCat})
                    }
                })
            }
        })
    }else{
        newCategory.dependencyId = null
        newCategory.save((err,newCat)=>{
            if(err){
                return res.status(500)
                        .send({ok:false, error: err.message});
            }else{
                if(!newCat)
                {
                    return res.status(404)
                            .send({ok:false, error: 'La nueva categoria no ha sido encontrada'})
                }
                return res.status(200)
                        .send({ok:true, category:newCat})
            }
        })
    }
}

module.exports = {
    saveCategory,
    getCategory
}