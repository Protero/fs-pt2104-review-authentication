const {createUser} = require('../../queries/auth');
const {hashs,sendMail} = require('../../helpers');

module.exports = db => async (req,res,next) => {

    const {email, username, hash} = req.body;
    
    if (!email || !username || !hash) return next({error: new Error ('Todos los datos son obligatorios')});

    const encrytHash = await hashs.encryt(hash);

    const confirmationToken = hashs.createConfirmToken();

 
    const result = await createUser(db, email, username, encrytHash, confirmationToken );

    if (result === false) return next({error: new Error('Algo ha ido mal en el alta de usuario')});

    const resultMail = await sendMail(email,confirmationToken);
    

    res.status(200).json({
        sucess: true,
    });
}