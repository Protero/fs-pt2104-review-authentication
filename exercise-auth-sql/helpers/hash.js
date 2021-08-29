const bcrypt =  require('bcrypt');

const encryt = async hash => await bcrypt.hash(hash,await bcrypt.genSalt(Number(process.env.SALT)));
    
const compare = hashTxt => async hash => await bcrypt.compare(hashTxt,hash);


module.exports={
    encryt,
    compare,
}