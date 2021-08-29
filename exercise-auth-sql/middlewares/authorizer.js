const {jwt} = require('../helpers');

module.exports = (req,res,next) => {
    const {token} = req.cookies;

    const user = jwt.fromJWT(token);

    if(user === false) next({status: 401, error: new Error('No autorizqado')});
    
    res.locals.user = user;
    
    next();
};