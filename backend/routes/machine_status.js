// backend/routes/machine_status.js
const express = require("express");
const router = express.Router();
const sql = require("mssql");

// This route gets the current status of a specific machine
router.get("/current/:machineCode", async (req, res) => {
  try {
    const { machineCode } = req.params;

    // Query to get the most recent status for a specific machine
    const query = `
      SELECT TOP 1
        [Id],
        [NoMachine],
        [Status],
        [Color],
        [StartDate_Time],
        [EndDate_Time],
        [Product],
        [CT],
        [Counter],
        [TotalCounter]
      FROM [PLCDATA_CKR].[dbo].[TestGoogleChart]
      WHERE [NoMachine] = @machineCode
        AND [FlgCutOff] = 0
      ORDER BY [StartDate_Time] DESC
    `;

    const result = await sql.query(query, {
      machineCode,
    });

    if (result.recordset.length === 0) {
      return res.status(404).json({
        message: "No status data found for this machine",
      });
    }

    res.status(200).json(result.recordset[0]);
  } catch (error) {
    console.error("Error fetching machine status:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.toString(),
    });
  }
});

// This route gets the status history of a machine for a specific date range
router.get("/history/:machineCode", async (req, res) => {
  try {
    const { machineCode } = req.params;
    const { startDate, endDate } = req.query;

    // Query to get status history within a date range
    const query = `
      SELECT 
        [Id],
        [NoMachine],
        [Status],
        [Color],
        [StartDate_Time],
        [EndDate_Time],
        [Product],
        [CT],
        [Counter],
        [TotalCounter]
      FROM [PLCDATA_CKR].[dbo].[TestGoogleChart]
      WHERE [NoMachine] = @machineCode
        AND [StartDate_Time] BETWEEN @startDate AND @endDate
      ORDER BY [StartDate_Time] DESC
    `;

    const result = await sql.query(query, {
      machineCode,
      startDate: startDate || new Date(new Date().setHours(0, 0, 0, 0)), // Default to start of current day
      endDate: endDate || new Date(), // Default to current time
    });

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error("Error fetching machine status history:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.toString(),
    });
  }
});

// This route gets the current status of all machines
router.get("/all", async (req, res) => {
  try {
    // Query to get the most recent status for all machines
    const query = `
      WITH LatestStatus AS (
        SELECT 
          [NoMachine],
          [Status],
          [Color],
          [StartDate_Time],
          [EndDate_Time],
          [Product],
          [CT],
          [Counter],
          [TotalCounter],
          ROW_NUMBER() OVER (PARTITION BY [NoMachine] ORDER BY [StartDate_Time] DESC) as rn
        FROM [PLCDATA_CKR].[dbo].[TestGoogleChart]
        WHERE [FlgCutOff] = 0
      )
      SELECT *
      FROM LatestStatus
      WHERE rn = 1
      ORDER BY [NoMachine]
    `;

    const result = await sql.query(query);
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error("Error fetching all machine statuses:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.toString(),
    });
  }
});

// This route gets performance metrics for a machine
router.get("/performance/:machineCode", async (req, res) => {
  try {
    const { machineCode } = req.params;
    const { date } = req.query;

    // Query to get daily performance metrics
    const query = `
      SELECT 
        [NoMachine],
        SUM([TotalCounter]) as TotalProduction,
        AVG([CT]) as AverageCycleTime,
        SUM([TotalSecond]) as TotalRunTime
      FROM [PLCDATA_CKR].[dbo].[TestGoogleChart]
      WHERE [NoMachine] = @machineCode
        AND CAST([StartDate_Time] as DATE) = @date
      GROUP BY [NoMachine]
    `;

    const result = await sql.query(query, {
      machineCode,
      date: date || new Date().toISOString().split("T")[0], // Default to current date
    });

    if (result.recordset.length === 0) {
      return res.status(404).json({
        message: "No performance data found for this machine",
      });
    }

    res.status(200).json(result.recordset[0]);
  } catch (error) {
    console.error("Error fetching machine performance:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.toString(),
    });
  }
});

module.exports = router;
