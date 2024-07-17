'use strict';
module.exports = (sequelize, DataTypes) => {
  const Scope = sequelize.define('Scope', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {
    tableName: 'scopes',
  });

  Scope.associate = function(models) {
    Scope.hasMany(models.User, {
      foreignKey: 'scope_id',
      as: 'users',
    });
  };

  return Scope;
};
