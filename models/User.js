'use strict';
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    scope_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'scopes',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  }, {
    tableName: 'users',
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
      beforeUpdate: async (user) => {
       
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        
      },
    },
  });

  User.associate = (models) => {
    User.belongsTo(models.Scope, {
      foreignKey: 'scope_id',
      as: 'scope',
    });
    User.belongsToMany(models.Ability, {
      through: 'user_abilities',
      foreignKey: 'user_id',
      as: 'abilities', 
    });
  };

  return User;
};
