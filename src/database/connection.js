require('dotenv').config()

const mysql = require('mysql2/promise');

let state = {
    db: null
}

class Connection {
    constructor() {
        var self = this;
        self.host = process.env.DB_HOST;
        self.username = process.env.DB_USER;
        self.password = process.env.DB_PASS;
        self.databaseName = process.env.DB_NAME;
        self.port = process.env.DB_PORT == undefined ? 3306 : process.env.DB_PORT;  
    }

    async init() {
        if (state.db != null)
            return state.db;

        state.db = await this.createConnection();
        return state.db;
    }

    async createConnection() {
        let connection = null;
        
        connection = await mysql.createConnection({
            host: this.host,
            port: this.port,
            user: this.username,
            password: this.password,
            database: this.databaseName,
            charset : 'utf8mb4'
        });

        connection.config.namedPlaceholders = true;

        connection.connect(function(err) {
            if (err) {
                console.log('Error connecting: ' + err.stack);
                setTimeout(function() { self.createConnection() }, 5000);
            } else {
                console.log('Connected as id ' + connection.threadId);
            }
        });

        connection.on('error', function(err) {
            console.log('db error:' + err);
            if (err.code === 'PROTOCOL_CONNECTION_LOST' ||
                err.code === 'PROTOCOL_ENQUEUE_AFTER_QUIT' ||
                err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {
                console.log('Attempting reconnect to database')
                self.createConnection();
            } else {
                throw err;
            }
        });

        return connection;
    }

}

module.exports = new Connection;