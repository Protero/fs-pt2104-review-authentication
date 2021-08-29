const bcrypt =  require('bcrypt');
const crypto = require('crypto');

const encryt = async hash => await bcrypt.hash(hash,await bcrypt.genSalt(Number(process.env.SALT)));
    
const compare = hashTxt => async hash => await bcrypt.compare(hashTxt,hash);

const createConfirmToken = () => crypto.randomBytes(32).toString('hex');


module.exports={
    encryt,
    compare,
    createConfirmToken,
}
