'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        id: 3,
        firstname: 'John',
        lastname: 'Doe',
        email: 'testeSalvus@gmail.com',
        password: '$2a$10$chixCB2C8K4mHZHduBYbqeSaW2ES5gI6HhZeuHoZrvRlH8GgIDsh.',
        scope_id: 1, // admin
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
