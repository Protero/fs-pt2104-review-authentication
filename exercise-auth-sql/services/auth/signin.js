const {getUser} =  require('../../queries/auth');
const {serialaze} = require('../../helpers');
const {hashs} = require('../../helpers');
//const {createCookie} = require('../../helpers/cookies');
//const {cookies,jwt} = require('../../helpers');
//const {toJWT} = require('../../helpers/jwt');

module.exports = db => async (req,res,next)=>{

    const {email,hash} = req.body;

    if (!email || !hash) return next({error: new Error('Todos los campo son obligatorios!')});

    // const compare = hash => hashBD =>{
    //     return hash === hashBD
    // };
    
    const result = await getUser(db, email, hashs.compare(hash));

  //  if (result === false || result.hash !== hash) return next({error: new Error('Algo ha ido mal en el registro usuario')});

  if (result === false) return next({error: new Error('Algo ha ido mal en el registro usuario')});

  
  //createCookie(res,toJWT(result.email,result.username));
  //cookies.createCookie(res,jwt.toJWT(result.email,result.username));
  serialaze(res,email,result.username);

    res.status(200).json({
        sucess: true,
        data: {
            email: result.email,
            username: result.username,
        }
    });
}