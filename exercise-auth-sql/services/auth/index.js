const { sign } = require('jsonwebtoken');

const router =  require('express').Router();

module.exports = db =>{
    
    const signin = require('./signin');
    const signup = require('./signup');
    const confirm = require('./confirm');

    router.post('/signin',signin(db));
    router.post('/signup', signup(db));
    router.get('/confirmation/:confirmationToken', confirm(db));

    return router;
}