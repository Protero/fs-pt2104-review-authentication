const {sql} = require('slonik');

const createUser = async(db, email, username, hash) => {
    try {
        return await db.query(sql
            `INSERT INTO users(
                email, username, hash
            )VALUES( 
                ${email}, ${username}, ${hash}
            )`
        );
    } catch (error) {
        console.log('> error at "creatUser" query: ', error.message);
        return false;
    }
};

const getUser = async (db, email, fn) => {
    try {
        const result = await db.maybeOne(sql
            `
                SELECT email, username, hash
                FROM users
                WHERE email LIKE ${email} 
            `);

        if (!result) throw new Error('mail incorrecto. Más adelante modificaré el texto');

        const isValidHash = fn(result.hash);

        if (!isValidHash) throw new Error('hash incorrecto. Más adelante modificaré el texto');

        return result;
    } catch (error) {
        console.log('> error at "getUser" query: ', error.message);
        return false;
    }

};

module.exports = {
    createUser,
    getUser
};