const {confirmUser} = require('../../queries/auth');
const {mail} = require('../../helpers');

module.exports = db => async (req,res,next) => {
    const {confirmationToken} = req.params;

    if (!confirmationToken) next({error: new Error('no se recoge token')});

    const result = await confirmUser(db,confirmationToken);

    if (!result) next({error: new Error('Token inválido')});
    
    const to =  result.rows[0].email;
    const username = result.rows[0].username;
    const resultMailFinal = await mail.sendMailFinal(to,username);
    
    if (resultMailFinal === false) return next({error: new Error('Algo ha ido mal en el envío de correo final')});

    res.status(200).json({
        succes: true,
        data: "cuenta activada",
    });
};