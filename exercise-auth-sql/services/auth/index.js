const { sign } = require('jsonwebtoken');
const {authorizer} = require('../../middlewares/authorizer');

const router =  require('express').Router();

module.exports = db =>{
    
    const signin = require('./signin');
    const signup = require('./signup');
    const confirm = require('./confirm');
    const signout = require('./signout');
    const reqNewPassword = require('./reqNewPassword');

    router.post('/signin',signin(db));
    router.post('/signup', signup(db));
    router.get('/confirmation/:confirmationToken', confirm(db));
    router.post('/signout', signout());
    router.post('/newPassword', reqNewPassword(db));

    return router;
}