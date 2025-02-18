// backend/routes/machine_history.js
const express = require("express");
const router = express.Router();
const sql = require("mssql");

// Get machine history
router.get("/:location", async (req, res) => {
  try {
    const { location } = req.params;
    const { lineGroup } = req.query;

    // Gunakan global.databases untuk mengakses database IOT_HUB
    const iotHubDb = global.databases.iotHub;

    let query = `
      SELECT 
        [ID],
        [MachineCode],
        [MachineName],
        [OPERATION_NAME],
        [MACHINE_COUNTER],
        [SEND_PLC],
        [CreatedAt]
      FROM [dbo].[HISTORY_MACHINE_PRODUCTION]
      WHERE 1=1
    `;

    const request = iotHubDb.request();

    // Tambahkan filter opsional
    if (lineGroup) {
      query += ` AND [LineGroup] = @lineGroup`;
      request.input("lineGroup", sql.VarChar, lineGroup);
    }

    query += ` ORDER BY [CreatedAt] DESC`;

    const result = await request.query(query);
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error("Error fetching machine history:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.toString(),
    });
  }
});

module.exports = router;
