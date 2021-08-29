const {confirmUser} = require('../../queries/auth');

module.exports = db => async (req,res,next) => {
    const {confirmationToken} = req.params;

    if (!confirmationToken) next({error: new Error('no se recoge token')});

    const result = await confirmUser(db,confirmationToken);

    if (!result) next({error: new Error('Token inválido')});

    res.status(200).json({
        succes: true,
        data: "cuenta activada",
    });
};