'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('user_abilities', [
      { user_id: 1, ability_id: 1 }, // John can read
      { user_id: 1, ability_id: 2 }, // John can write
      { user_id: 2, ability_id: 1 }, // Jane can read
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user_abilities', null, {});
  },
};
