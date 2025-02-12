const express = require("express");
const router = express.Router();
const sql = require("mssql");

// Middleware for validating ID
const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({ error: "Valid ID is required" });
  }
  next();
};

// Middleware for validating body
const validateBody = (req, res, next) => {
  const { nqp, nama_job } = req.body;

  if (!nqp || !nama_job) {
    return res.status(400).json({
      error: "NQP and Job Name are required",
    });
  }
  next();
};

// GET all job list items
router.get("/", async (req, res) => {
  try {
    const result = await sql.query`
      SELECT * FROM member_joblist
      ORDER BY no_part DESC
    `;
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error("Error fetching job list items:", error.message);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// GET single job list item by ID
router.get("/:id", validateId, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await sql.query`
      SELECT *
      FROM member_joblist 
      WHERE no_part = ${id}
    `;

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "Job list item not found" });
    }

    res.status(200).json(result.recordset[0]);
  } catch (error) {
    console.error("Error fetching job list item:", error.message);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// Create new job list item
router.post("/", validateBody, async (req, res) => {
  try {
    await sql.query`
      INSERT INTO member_joblist (
        nqp, 
        nama_job, 
        job_class, 
        sub_section, 
        factory, 
        job_des, 
        update_job, 
        due_date, 
        status
      ) VALUES (
        ${req.body.nqp}, 
        ${req.body.nama_job}, 
        ${req.body.job_class || null}, 
        ${req.body.sub_section || null}, 
        ${req.body.factory || null}, 
        ${req.body.job_des || null}, 
        ${req.body.update_job || null}, 
        ${req.body.due_date || null}, 
        ${req.body.status || null}
      )
    `;
    res.status(201).json({ message: "Job list item created successfully" });
  } catch (error) {
    console.error("Error creating job list item:", error.message);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// Update job list item
router.put("/:id", validateId, validateBody, async (req, res) => {
  const { id } = req.params;

  try {
    const checkItem = await sql.query`
      SELECT no_part FROM member_joblist WHERE no_part = ${id}
    `;

    if (checkItem.recordset.length === 0) {
      return res.status(404).json({ error: "Item not found" });
    }

    await sql.query`
      UPDATE member_joblist 
      SET 
        nqp = ${req.body.nqp}, 
        nama_job = ${req.body.nama_job}, 
        job_class = ${req.body.job_class || null}, 
        sub_section = ${req.body.sub_section || null}, 
        factory = ${req.body.factory || null}, 
        job_des = ${req.body.job_des || null}, 
        update_job = ${req.body.update_job || null}, 
        due_date = ${req.body.due_date || null}, 
        status = ${req.body.status || null}
      WHERE no_part = ${id}
    `;
    res.status(200).json({ message: "Job list item updated successfully" });
  } catch (error) {
    console.error("Error updating job list item:", error.message);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// Delete job list item
router.delete("/:id", validateId, async (req, res) => {
  const { id } = req.params;

  try {
    const checkItem = await sql.query`
      SELECT no_part FROM member_joblist WHERE no_part = ${id}
    `;

    if (checkItem.recordset.length === 0) {
      return res.status(404).json({ error: "Item not found" });
    }

    await sql.query`
      DELETE FROM member_joblist WHERE no_part = ${id}
    `;
    res.status(200).json({ message: "Job list item deleted successfully" });
  } catch (error) {
    console.error("Error deleting job list item:", error.message);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

module.exports = router;
