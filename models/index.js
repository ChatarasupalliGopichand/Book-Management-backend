const { Sequelize } = require("sequelize");
require("dotenv").config(); // Load environment variables

// Initialize Sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL || "sqlite:./database.sqlite", {
  dialect: "sqlite",
  storage: "./database.sqlite", // Path to SQLite database file
  logging: false, // Disable SQL query logs for cleaner output
});

// Test database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to database successful.");
  } catch (err) {
    console.error("Unable to connect to the database:", err.message);
    process.exit(1); // Exit process on connection failure
  }
})();

const db = {};

// Import models
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Load models dynamically and initialize
const models = ["Author", "Book", "Genre"];
models.forEach((model) => {
  db[model] = require(`./${model}`)(sequelize, Sequelize);
});

// Define relationships
db.Author.hasMany(db.Book, { onDelete: "SET NULL", foreignKey: { allowNull: true } });
db.Genre.hasMany(db.Book, { onDelete: "SET NULL", foreignKey: { allowNull: true } });
db.Book.belongsTo(db.Author, { foreignKey: { allowNull: true } });
db.Book.belongsTo(db.Genre, { foreignKey: { allowNull: true } });

module.exports = db;
