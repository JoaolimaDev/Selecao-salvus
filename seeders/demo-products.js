'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('produtos', [
      {
        nome: 'Produto 1',
        descricao: 'Descrição do Produto 1',
        preco: 99.99,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Produto 2',
        descricao: 'Descrição do Produto 2',
        preco: 199.99,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('produtos', null, {});
  },
};
