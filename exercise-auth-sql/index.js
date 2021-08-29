require('dotenv').config();
const express = require ('express');
const cookieParse = require('cookie-parser');
const db = require('./configs/db');
const app = express();


const main = require('./services');

app.use(express.json());
app.use(cookieParse());
app.use(main(db));

app.use((req,res,next)=>{
    next({error: new Error('ruta no encontrada')});
});

app.use(({statusCode=400,error},req,res,next)=>{
    res.status(statusCode).json({
        result: false,
        message: error.message,
    });
});

app.listen(3000,()=>console.info('> Listening at: http://localhost:3000'));