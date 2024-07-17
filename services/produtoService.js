const { Produto, User, Ability } = require('../models');

const createProduto = async (id, data) => {


  const user = await User.findByPk(id, {
    include: [{
      model: Ability,
      as: 'abilities',
      attributes: ['name'],
      through: { attributes: [] }
    }]
  });

  const hasWriteAbility = user.abilities.some(ability => ability.name === 'write');
  if (!hasWriteAbility) {
    throw new Error('Este usuário não possui a permissão de escrita!');
  }
  
  return await Produto.create(data);
};

const getAllProdutos = async (page, limit) => {
  const offset = (page - 1) * limit;
  return await Produto.findAndCountAll({
    limit,
    offset,
  });
};

const getProdutoById = async (id) => {
  const produto = await Produto.findByPk(id);
  if (!produto) {
    throw new Error('Produto não encontrado');
  }
  return produto;
};

const updateProduto = async (id, data) => {
  const produto = await Produto.findByPk(id);
  if (!produto) {
    throw new Error('Produto não encontrado');
  }
  return await produto.update(data);
};

const deleteProduto = async (id) => {
  const produto = await Produto.findByPk(id);
  if (!produto) {
    throw new Error('Produto não encontrado');
  }
  return await produto.destroy();
};

module.exports = {
  createProduto,
  getAllProdutos,
  getProdutoById,
  updateProduto,
  deleteProduto,
};
