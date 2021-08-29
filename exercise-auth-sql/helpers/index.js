const {createCookie,clearCookie } = require('./cookies');
const {encryt,compare,createConfirmToken} = require('./hash');
const {toJWT,fromJWT} = require('./jwt');
const {sendMail} = require('./mailer');

const serialaze = (res,email,username) => createCookie(res,toJWT(email,username));


const deserialaze = req => {
    const {token} = req.cookies;
    return fromJWT(token);
};

module.exports = {
    cookies : {createCookie,clearCookie},
    hashs : {encryt,compare,createConfirmToken},
    jwt : {toJWT,fromJWT},
    serialaze,
    deserialaze,
    sendMail,
};