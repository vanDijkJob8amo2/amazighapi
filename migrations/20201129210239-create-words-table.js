'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
    dbm = options.dbmigrate;
    type = dbm.dataType;
    seed = seedLink;
};

exports.up = function (db) {
    return db.createTable('words', {
        id: {
            type: 'int',
            primaryKey: true,
            autoIncrement: true,
            notNull: true
        },
        category_id: { 
            type: 'int',
            notNull: true
        },
        word_am: 'string',
        word_nl: 'string',
        word_en: 'string',
        picture: 'string',
        sound: 'string',
    });
};

exports.down = function (db) {
    return db.dropTable('words');
};

exports._meta = {
    "version": 1
};
