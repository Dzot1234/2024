'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define("Ticket", {
    concertId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    row: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    seat: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    buyerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    buyerEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    buyerPhone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    adminId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Ticket.associate = function (models) {
    Ticket.belongsTo(models.Concert, { foreignKey: "concertId", as: "concert" });
  };

  return Ticket;
};
