const {createCookie,clearCookie } = require('./cookies');
const {encryt,compare} = require('./hash');
const {toJWT,fromJWT} = require('./jwt');

const serialaze = (res,email,username) => createCookie(res,toJWT(email,username));


const deserialaze = () => {};

module.exports = {
    cookies : {createCookie,clearCookie},
    hashs : {encryt,compare},
    jwt : {toJWT,fromJWT},
    serialaze,
    deserialaze,
};