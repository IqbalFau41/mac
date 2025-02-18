require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDatabases } = require("./db");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Fungsi async untuk inisialisasi server
const startServer = async () => {
  try {
    // Sambungkan ke kedua database
    const databases = await connectDatabases();

    // Tambahkan database ke global atau gunakan dependency injection
    global.databases = databases;

    // API routes
    const userRouter = require("./routes/auth");
    const inventoryRouter = require("./routes/inventory");
    const jobListRouter = require("./routes/joblist");
    const machineNameRouter = require("./routes/machine_name");
    const machineStatusRouter = require("./routes/machine_status");
    const machineHistoryRouter = require("./routes/machine_history");
    const historyJobListRouter = require("./routes/history_joblist");

    app.use("/api/auth", userRouter);
    app.use("/api/inventory", inventoryRouter);
    app.use("/api/job-list", jobListRouter);
    app.use("/api/machine-names", machineNameRouter);
    app.use("/api/machine-status", machineStatusRouter);
    app.use("/api/machine-history", machineHistoryRouter);
    app.use("/api/job-history", historyJobListRouter);

    const port = process.env.PORT || 3000;
    app.listen(port, "0.0.0.0", () =>
      console.log(`Listening on port ${port}...`)
    );
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

// Jalankan server
startServer();
