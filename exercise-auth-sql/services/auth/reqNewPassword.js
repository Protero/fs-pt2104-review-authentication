const {getUserMail,getUserUsername} =  require('../../queries/auth');
const {hashs, mail} = require('../../helpers');

module.exports = db => async (req,res,next)=>{
    const {email,username} = req.body;
    let result;

    if (!email && !username) return next({error: new Error('Todos los campo son obligatorios!')});

    if ((email && username)||email){
        result = await getUserMail(db, email);
        
        if (result === false) return next({error: new Error('Algo ha ido mal en la busqueda del usuario')});
    }
    else{
        result = await getUserUsername(db, username);
        
        if (result === false) return next({error: new Error('Algo ha ido mal en la busqueda del username')});  

    };
    const confirmationToken = hashs.createConfirmToken();
    const resultMail = await mail.sendMailNewPassword(result.email,confirmationToken);

    res.status(200).json({
        success: true,
    });
};