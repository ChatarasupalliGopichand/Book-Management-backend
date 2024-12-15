const express = require('express');
const db = require('./models'); // Make sure this points to your models/index.js

const app = express();
app.use(express.json());

// Sync database
db.sequelize.sync({ alter: true }) // Use `force: true` only in development
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Failed to sync database:', err.message));

// Routes (example)
app.get('/', (req, res) => res.send('Welcome to the Book Management API'));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
