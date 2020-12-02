const conn = require('./connection');
const { nanoid } = require('nanoid');

class dbUser {

    createUserToken = async (_lang) => {

        let db = await conn.init();

        try {

            const sql = `INSERT INTO users (user_token, language) VALUE (:nanoid, :lang)`;

            let rows = await db.execute(sql, { nanoid: nanoid(), lang: _lang });

            let [user_token] = await db.execute('SELECT user_token FROM users WHERE id=:id', { id: rows[0].insertId });

            return {
                success: true,
                data: user_token[0].user_token
            }

        } catch (e) {
            console.error(e);
            return {
                success: false,
                message: e.message
            }
        }
    }

    checkUserToken = async (_token) => {

        let db = await conn.init();

        try {

            const sql = `SELECT id, user_token, language FROM users WHERE user_token = :token LIMIT 1;`;
        
            let [rows] = await db.execute(sql, { token: _token });

            if (rows.length < 1) {
                throw new Error('Couldn\'t find a user with this user token.');
            }

            return {
                success: true,
                data: rows[0]
            }

        } catch (e) {
            console.error(e);
            return {
                success: false,
                message: e.message
            }
        }
    }

}

module.exports = new dbUser;