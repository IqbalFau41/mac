// backend/routes/machine_name.js
const express = require("express");
const router = express.Router();
const sql = require("mssql");

router.get("/", async (req, res) => {
  try {
    console.log("Attempting to fetch machine data...");
    const result = await sql.query`
        SELECT 
          [Machine_Code],
          [LineName]
        FROM [PLCDATA_CKR].[dbo].[MachineData]
        ORDER BY [LineName]
      `;
    console.log("Fetched machine data:", result.recordset);
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error("Detailed Error:", {
      message: error.message,
      stack: error.stack,
      sqlState: error.sqlState,
      originalError: error,
    });
    res.status(500).json({
      message: "Internal Server Error",
      error: error.toString(),
    });
  }
});

module.exports = router;
