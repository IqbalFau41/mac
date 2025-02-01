//backend/models/inventory.js
const sql = require("mssql");

// Fungsi untuk membuat item inventaris baru
const createInventoryItem = async (data) => {
  const { Name, Quantity, Description } = data;

  try {
    await sql.query`INSERT INTO Inventory (Name, Quantity, Description) VALUES (${Name}, ${Quantity}, ${Description})`;
    return { message: "Item created successfully" };
  } catch (error) {
    console.error("Error creating inventory item:", error.message);
    throw error;
  }
};

// Fungsi untuk mendapatkan semua item inventaris
const getInventoryItems = async () => {
  try {
    const result = await sql.query`SELECT * FROM Inventory`;
    return result.recordset;
  } catch (error) {
    console.error("Error fetching inventory items:", error.message);
    throw error;
  }
};

// Fungsi untuk memperbarui item inventaris
const updateInventoryItem = async (id, data) => {
  const { Name, Quantity, Description } = data;

  if (!Name || !Quantity) {
    throw new Error("Name and Quantity are required.");
  }

  const checkItem = await sql.query`SELECT * FROM Inventory WHERE Id = ${id}`;
  if (checkItem.recordset.length === 0) {
    throw new Error("Item not found");
  }

  try {
    await sql.query`UPDATE Inventory SET Name = ${Name}, Quantity = ${Quantity}, Description = ${Description} WHERE Id = ${id}`;
    return { message: "Item updated successfully" };
  } catch (error) {
    console.error("Error updating inventory item:", error.message);
    throw error;
  }
};

// Fungsi untuk menghapus item inventaris
const deleteInventoryItem = async (id) => {
  // Cek apakah item ada
  const checkItem = await sql.query`SELECT * FROM Inventory WHERE Id = ${id}`;
  if (checkItem.recordset.length === 0) {
    throw new Error("Item not found");
  }

  try {
    await sql.query`DELETE FROM Inventory WHERE Id = ${id}`;
    return { message: "Item deleted successfully" };
  } catch (error) {
    console.error("Error deleting inventory item:", error.message);
    throw error;
  }
};

// Ekspor fungsi
module.exports = {
  createInventoryItem,
  getInventoryItems,
  updateInventoryItem,
  deleteInventoryItem,
};
