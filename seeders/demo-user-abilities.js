'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('user_abilities', [
      { user_id: 3, ability_id: 1 }, 
      { user_id: 3, ability_id: 2 }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user_abilities', null, {});
  },
};
