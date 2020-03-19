const mysql = require('mysql');

const conn = mysql.createPool({
    host: 'us-cdbr-iron-east-04.cleardb.net',
    user: 'b6ccbdfa252ada',
    password: 'b82a68ba',
    database: 'heroku_7743fdf79d38ef1'
});

module.exports = conn;