// backend/routes/machine_name.js
const express = require("express");
const router = express.Router();
const sql = require("mssql");

// Helper function to build the base query for machine data
const buildMachineQuery = (remarks, lineGroup) => {
  let query = `
    SELECT 
      [Machine_Code],
      [LineName],
      [Remarks],
      [Factory],
      [LineGroup]
    FROM [PLCDATA_CKR].[dbo].[MachineData]
    WHERE [Remarks] = ${remarks}
  `;

  if (lineGroup) {
    query += ` AND [LineGroup] = '${lineGroup}'`;
  }

  return query + ` ORDER BY [LineName]`;
};

// Get machines for either Cikarang (remarks=1) or Karawang (remarks=2)
router.get("/:location", async (req, res) => {
  try {
    const { location } = req.params;
    const { lineGroup } = req.query;

    // Determine remarks based on location
    const remarks =
      location === "cikarang" ? 1 : location === "karawang" ? 2 : null;

    // Validate location parameter
    if (remarks === null) {
      return res.status(400).json({
        message: "Invalid location. Use 'cikarang' or 'karawang'.",
      });
    }

    const query = buildMachineQuery(remarks, lineGroup);
    const result = await sql.query(query);

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error(`Detailed Error for ${req.params.location} Machines:`, error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.toString(),
    });
  }
});

// Get line groups for either Cikarang or Karawang
router.get("/:location/line-groups", async (req, res) => {
  try {
    const { location } = req.params;

    // Determine remarks based on location
    const remarks =
      location === "cikarang" ? 1 : location === "karawang" ? 2 : null;

    // Validate location parameter
    if (remarks === null) {
      return res.status(400).json({
        message: "Invalid location. Use 'cikarang' or 'karawang'.",
      });
    }

    const query = `
      SELECT DISTINCT 
        [LineGroup]
      FROM [PLCDATA_CKR].[dbo].[MachineData]
      WHERE [Remarks] = ${remarks}
      ORDER BY [LineGroup]
    `;

    const result = await sql.query(query);
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error(
      `Detailed Error fetching ${req.params.location} Line Groups:`,
      error
    );
    res.status(500).json({
      message: "Internal Server Error",
      error: error.toString(),
    });
  }
});

module.exports = router;
