//const {jwt} = require('../helpers');
const {deserialaze} = require('../helpers');

module.exports = (req,res,next) => {
  //  const {token} = req.cookies;
    const user = deserialaze(req);

    //const user = jwt.fromJWT(token);

    if(user === false) next({status: 401, error: new Error('No autorizado')});
    
    res.locals.user = user;
    
    next();
};