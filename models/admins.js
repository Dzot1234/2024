'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define("Admin", {
      login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
    
      Admin.associate = function (models) {
      Admin.hasMany(models.Ticket, { foreignKey: "adminId", as: "tickets" });
  };

  return Admin;
};