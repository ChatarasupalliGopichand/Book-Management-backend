const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./models"); // Adjust to match your Sequelize setup
require("dotenv").config(); // Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Routes (Example)
app.get("/", (req, res) => {
  res.send("Welcome to the Book Management API");
});

// Sync Database
(async () => {
  try {
    console.log("Connecting to the database...");
    await sequelize.authenticate(); // Test DB connection
    console.log("Database connection successful.");

    console.log("Syncing database...");
    await sequelize.sync({ force: false }); // Use `force: true` to drop & recreate tables
    console.log("Database synced!");

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
})();
