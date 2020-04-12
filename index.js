const colors = require('colors')

const mongoose = require('mongoose')
const app = require('./app')

mongoose.connect('mongodb://localhost:27017/electro_prod',{useUnifiedTopology:true, useNewUrlParser:true },(err)=>{
    if(err){
        console.log(' [-] Error en la base de datos.'.red)
    }
    console.log( ' [+] DB Services Running... '.green)
})

app.listen(4201,()=>{
    console.log('\n ==========Electro E-Commerce API REST========='.blue)
    console.log(' [+] Server Services Running...'.green)
})