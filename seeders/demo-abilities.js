'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('abilities', [
      { name: 'read', createdAt: new Date(), updatedAt: new Date() },
      { name: 'write', createdAt: new Date(), updatedAt: new Date() },
      { name: 'delete', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('abilities', null, {});
  },
};
