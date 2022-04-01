const mysql = require("mysql");
require("dotenv").config();
const util = require("util");

const dbName = process.env.DB_NAME;
const dbPassword = process.env.DB_PASSWORD;
const dbUser = process.env.DB_USER;

const connection = mysql.createConnection({
  host: "localhost",
  port: 8080,
  user: dbUser,
  password: dbPassword,
  database: dbName,
});

connection.connect();
connection.query = util.promisify(connection.query);

module.exports = connection;
