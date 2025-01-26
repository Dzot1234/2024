'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Tickets', 'adminId', {
      type: Sequelize.INTEGER,
      allowNull: true, // или false в зависимости от требований
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Tickets', 'adminId');
  }
};
