//backend/routes/inventory.js
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
  const { Name, Quantity, Description } = req.body;
  if (!Name || Quantity === undefined || Description === undefined) {
    return res.status(400).json({
      error: "Name, Quantity, and Description are required",
    });
  }
  next();
};

// GET all inventory items
router.get("/", async (req, res) => {
  try {
    const result = await sql.query`
      SELECT 
        Id as id,
        Name,
        Quantity,
        Description
      FROM Inventory
      ORDER BY Id ASC
    `;
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error("Error fetching inventory items:", error.message);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// GET single inventory item by ID
router.get("/:id", validateId, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await sql.query`
      SELECT 
        Id as id,
        Name,
        Quantity,
        Description
      FROM Inventory 
      WHERE Id = ${id}
    `;

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "Inventory item not found" });
    }

    res.status(200).json(result.recordset[0]);
  } catch (error) {
    console.error("Error fetching inventory item:", error.message);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// Create new inventory item
router.post("/", validateBody, async (req, res) => {
  const { Name, Quantity, Description } = req.body;

  try {
    await sql.query`
      INSERT INTO Inventory (Name, Quantity, Description) 
      VALUES (${Name}, ${Quantity}, ${Description})
    `;
    res.status(201).json({ message: "Item created successfully" });
  } catch (error) {
    console.error("Error creating inventory item:", error.message);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// Update inventory item
router.put("/:id", validateId, validateBody, async (req, res) => {
  const { id } = req.params;
  const { Name, Quantity, Description } = req.body;

  try {
    const checkItem = await sql.query`
      SELECT Id FROM Inventory WHERE Id = ${id}
    `;

    if (checkItem.recordset.length === 0) {
      return res.status(404).json({ error: "Item not found" });
    }

    await sql.query`
      UPDATE Inventory 
      SET Name = ${Name}, 
          Quantity = ${Quantity}, 
          Description = ${Description} 
      WHERE Id = ${id}
    `;
    res.status(200).json({ message: "Item updated successfully" });
  } catch (error) {
    console.error("Error updating inventory:", error.message);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// Delete inventory item
router.delete("/:id", validateId, async (req, res) => {
  const { id } = req.params;

  try {
    const checkItem = await sql.query`
      SELECT Id FROM Inventory WHERE Id = ${id}
    `;

    if (checkItem.recordset.length === 0) {
      return res.status(404).json({ error: "Item not found" });
    }

    await sql.query`
      DELETE FROM Inventory WHERE Id = ${id}
    `;
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting inventory item:", error.message);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

module.exports = router;
