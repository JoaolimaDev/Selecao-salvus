'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserAbility = sequelize.define('UserAbility', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    ability_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Abilities',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  }, {
    timestamps: false,
    tableName: 'user_abilities',
  });

  return UserAbility;
};
