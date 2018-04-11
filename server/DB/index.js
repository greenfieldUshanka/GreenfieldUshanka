const mySql = require('mysql');

const connection = mySql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Hyundai1', 
    database: 'greenfield'
});

module.exports = connection; 