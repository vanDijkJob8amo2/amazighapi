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

        let sql = `INSERT INTO \`categories\` (${ data.name_en === undefined ? '' : '\`name_en\`,' } 
        ${ data.name_nl === undefined ? '' : '\`name_nl\`,' } 
        ${ data.name_am === undefined ? '' : '\`name_am\`,' }) 
        VALUES 
        (${ data.name_en === undefined ? '' : ':name_en,'} ${ data.name_nl === undefined ? '' : ':name_nl,'}, ${ data.name_am === undefined ? '' : ':name_am'})`

        try {
            let [rows] = await db.execute("", 
            );
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