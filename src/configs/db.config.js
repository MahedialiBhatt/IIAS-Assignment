const mysql = require("mysql2/promise");
require("dotenv").config();

const mySqlConnectionPool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB,
  connectionLimit: 10, // Default: 10
  waitForConnections: true, // Default: true
  queueLimit: 0, // Default:0
});

async function createDatabaseAndTable() {
  try {
    const connection = await mySqlConnectionPool.getConnection();

    // Create the database if it doesn't exist
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || "IIAS"}`
    );

    // Switch to the specified database
    await connection.query(`USE ${process.env.DB_NAME || "IIAS"}`);

    // Create the table if it doesn't exist
    await connection.query(`
    CREATE TABLE IF NOT EXISTS attendance (
      id INT PRIMARY KEY AUTO_INCREMENT,
      instructor_id INT NOT NULL,
      date DATE NOT NULL,
      check_in_time TIME NOT NULL,
      check_out_time TIME
     );`);

    console.log("DB schemas initialized...");

    connection.release();
  } catch (err) {
    console.error("Error creating database and table:", err);
  }
}

module.exports = { mySqlConnectionPool, createDatabaseAndTable };
