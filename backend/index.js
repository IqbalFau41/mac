//backend/index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connection = require("./db");
const userRouter = require("./routes/auth");
const inventoryRouter = require("./routes/inventory");
const jobListRouter = require("./routes/joblist"); // Add this line
const machineNameRouter = require("./routes/machine_name"); // Updated import
const machineStatusRouter = require("./routes/machine_status");
const historyJobListRouter = require("./routes/history_joblist");
// ... other imports ...

const app = express();

// Database connection
connection();

// Middleware
app.use(express.json());
app.use(cors());

// API routes
app.use("/api/auth", userRouter);
app.use("/api/inventory", inventoryRouter);
app.use("/api/job-list", jobListRouter); // Add this line
app.use("/api/machine-names", machineNameRouter); // Updated route
app.use("/api/machine-status", machineStatusRouter);
app.use("/api/job-history", historyJobListRouter);

const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => console.log(`Listening on port ${port}...`));
