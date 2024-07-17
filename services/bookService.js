const { Book } = require('../models');

const createBook = async (data) => {
  return await Book.create(data);
};

const getAllBooks = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  const { count, rows } = await Book.findAndCountAll({
    limit,
    offset,
  });

  return {
    totalItems: count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    books: rows,
  };
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
