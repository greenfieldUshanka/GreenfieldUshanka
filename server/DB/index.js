const mySql = require('mysql');
const host = process.env.DB_HOST;
const user = process.env.DB_USER; 
const password = process.env.DB_PASS; 
const database = process.env.DB_DATABASE;

const connection = mySql.createConnection({
  host: host,
  username: user,
  password: password,
  database: database
});

module.exports = connection; 