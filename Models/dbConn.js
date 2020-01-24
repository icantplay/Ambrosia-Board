var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'remotemysql.com',
    user: 'ZFzcwwht6v',
    password: 'uLwiWlfrmX',
    database: 'ZFzcwwht6v'
});
exports.pool = pool;
