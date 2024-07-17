'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('books', [
      {
        title: 'Book One',
        author: 'Author One',
        published_date: new Date('2021-01-01'), // Use Date object for date fields
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Book Two',
        author: 'Author Two',
        published_date: new Date('2020-05-15'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Book Three',
        author: 'Author Three',
        published_date: new Date('2019-08-20'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('books', null, {});
  }
};
