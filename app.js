const express = require('express')
const bodyParser = require('body-parser')

//LLamado a los Routes
const routeProduct =  require('./routes/product')
const routeCategory =  require('./routes/category')

const app = express();

//Agregando MiddleWare al APP (Agregando Body Parser)
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//configurar cabeceras
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With,Content-Type,Accept, Access-Control-Allow-Request-Method')
    res.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,OPTIONS')
    res.header('Allow','GET,POST,PUT,DELETE,OPTIONS')

    next();
})

// Cargando Rutas
app.use('/api',routeProduct,routeCategory)


module.exports = app