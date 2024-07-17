const { Book } = require('../models');

const createBook = async (data) => {
  return await Book.create(data);
};

const getAllBooks = async () => {
  return await Book.findAll();
};

const getBookById = async (id) => {
  const book = await Book.findByPk(id);
  if (!book) throw new Error('Book not found');
  return book;
};

const updateBook = async (id, data) => {
  const book = await getBookById(id);
  return await book.update(data);
};

const deleteBook = async (id) => {
  const book = await getBookById(id);
  return await book.destroy();
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
