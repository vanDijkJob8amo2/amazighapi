const conn = require('./connection');

class dbCategory {

    getAllCategories = async (lang = "*") => {

        let db = await conn.init();

        let sql;
        try {

            if (lang == "*") {
                sql = 'SELECT * FROM categories';
            } else if (lang.length == 2) {
                sql = `SELECT id, name_${ lang } AS name FROM categories;`
            } else {
                throw new Error('Language code is supposed to be 2 chars');
            }

        
            let [rows] = await db.execute(sql);
            return {
                success: true,
                data: rows
            }

        } catch (e) {
            console.error(e);
            return {
                success: false,
                message: e.message
            }
        }
        
    }

    createNewCategory = async (data) => {
        
        let db = await conn.init();

        let sql = 'INSERT INTO `categories` (';
        Object.keys(data).forEach(name => {
            sql+=`\`${name}\`,`
        });
        sql = sql.slice(0, -1);
        sql += ') VALUES ('
        Object.keys(data).forEach(name => {
            sql+=`:${name},`
        });
        sql = sql.slice(0, -1);
        sql += ')'
        
        console.log(sql);

        try {
            let [rows] = await db.execute(sql, data);
            return {
                success: true,
                data: rows
            };
        } catch(e) {
            console.error(e);
            return {
                success: false,
                message: e.message
            }
        } 
    }

}

module.exports = new dbCategory;