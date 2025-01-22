'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Concert = sequelize.define("Concert", {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    venue: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Concert.associate = function (models) {
    Concert.hasMany(models.Ticket, { foreignKey: "concertId", as: "tickets" });
  };

  return Concert;
};
