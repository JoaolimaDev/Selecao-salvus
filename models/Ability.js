'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ability = sequelize.define('Ability', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  }, {
    timestamps: true,
    tableName: 'abilities',
  });

  Ability.associate = (models) => {
    Ability.belongsToMany(models.User, {
      through: 'user_abilities',
      foreignKey: 'ability_id',
      otherKey: 'user_id',
      as: 'users',
    });
  };

  return Ability;
};
