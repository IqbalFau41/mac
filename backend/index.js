require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connection = require("./db");
const userRouter = require("./routes/auth");
const inventoryRouter = require("./routes/inventory");

const app = express();

// Koneksi ke database
connection();

// Middleware
app.use(express.json());
app.use(cors());

// Rute API
app.use("/api/auth", userRouter);
app.use("/api/inventory", inventoryRouter);

const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => console.log(`Listening on port ${port}...`));
