const sql = require("mssql");
require("dotenv").config();

// Fungsi untuk menghubungkan ke database
module.exports = async () => {
  const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT) || 1433,
    options: {
      encrypt: true,
      trustServerCertificate: true,
    },
  };

  try {
    await sql.connect(config);
    console.log("Connected to SQL Server");
  } catch (error) {
    console.error("Error connecting to SQL Server:", error.message);
  }
};
