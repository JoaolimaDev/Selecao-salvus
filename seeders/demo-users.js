'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        id: 3,
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        password: 'hashedpassword1',
        scope_id: 1, // admin
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        firstname: 'Jane',
        lastname: 'Doe',
        email: 'jane.doe@example.com',
        password: 'hashedpassword2',
        scope_id: 2, // user
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
