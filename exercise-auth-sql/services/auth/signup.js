const {createUser} = require('../../queries/auth');
const {encryt} = require('../../helpers/hash');

module.exports = db => async (req,res,next) => {

    const {email, username, hash} = req.body;
    
    if (!email || !username || !hash) return next({error: new Error ('Todos los datos son obligatorios')});

    const encrytHash = await encryt(hash);
 
    const result = await createUser(db, email, username, encrytHash );

    if (result === false) return next({error: new Error('Algo ha ido mal en el alta de usuario')});
    

    res.status(200).json({
        sucess: true,
    });
}