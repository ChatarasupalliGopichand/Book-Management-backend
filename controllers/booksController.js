const Book = require("../models/book");
const Author = require("../models/author");
const Genre = require("../models/genre");

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll({
      include: [Author, Genre],
    });
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Add a new book
exports.addBook = async (req, res) => {
  try {
    const { title, authorId, genreId, pages, publishedDate } = req.body;
    const newBook = await Book.create({
      title,
      authorId,
      genreId,
      pages,
      publishedDate,
    });
    res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update a book
exports.updateBook = async (req, res) => {
  try {
    const { title, authorId, genreId, pages, publishedDate } = req.body;
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    book.title = title || book.title;
    book.authorId = authorId || book.authorId;
    book.genreId = genreId || book.genreId;
    book.pages = pages || book.pages;
    book.publishedDate = publishedDate || book.publishedDate;
    await book.save();
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    await book.destroy();
    res.json({ message: "Book deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
