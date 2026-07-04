const dotenv = require('dotenv');
const mysql = require('mysql2/promise');

// Load environment variables from the backend .env file.
dotenv.config();

// Create a reusable MySQL connection pool for the application.
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Verify the database connection by acquiring one connection from the pool.
const testConnection = async () => {
  const connection = await pool.getConnection();

  try {
    await connection.ping();
  } finally {
    connection.release();
  }
};

// Run a startup connection check and print a clear status message.
const verifyStartupConnection = async () => {
  try {
    await testConnection();
    console.log('✅ MySQL Connected Successfully');
  } catch (error) {
    console.error('❌ MySQL Connection Failed');
  }
};

verifyStartupConnection();

// Export the pool and the test helper for use by the backend.
module.exports = {
  pool,
  testConnection
};
