const express = require("express");
const { Book } = require("../models");
const router = express.Router();

// Delete book by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Book.destroy({ where: { id } });
    if (result) {
      res.status(200).send({ message: "Book deleted successfully" });
    } else {
      res.status(404).send({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error deleting book", error: error.message });
  }
});

module.exports = router;
