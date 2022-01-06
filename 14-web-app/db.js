const mysql = require("mysql2");

// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "Password@123",
//     database: "join_us",
//   });

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Password@123",
  database: "join_us",
});

module.exports = connection.promise();
