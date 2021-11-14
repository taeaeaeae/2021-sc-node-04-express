const mysql = require("mysql2/promise");
const {DB_HOST, DB_PORT, DB_USER, DB_NAME, DB_PASS} = process.env;

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  port: DB_PORT,
  password: DB_PASS,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = { pool, mysql };