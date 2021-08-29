const {sql} = require('slonik');

const createUser = async(db, email, username, hash, confirmation_token) => {
    try {
        return await db.query(sql
            `INSERT INTO users(
                email, username, hash, confirmation_token
            )VALUES( 
                ${email}, ${username}, ${hash}, ${confirmation_token}
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
                WHERE email LIKE ${email} AND
                active=true 
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

const confirmUser = async (db, confirmationToken) => {
    try {
        return await db.query(sql
            `UPDATE users
            SET
                active = true,
                confirmation_token = null
            WHERE
                confirmation_token like ${confirmationToken};
            `
        );
    } catch (error) {
        console.info('error at "confirmUser" query: ', error.message);
        return false;
    }
}

module.exports = {
    createUser,
    getUser,
    confirmUser,
};