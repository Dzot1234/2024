'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Concerts",
      [
        {
          date: "2024-12-20",
          city: "Москва",
          venue: "Барвиха LUXURY VILLAGE",
        },
        {
          date: "2024-12-21",
          city: "Санкт-Петербург",
          venue: "Барвиха LUXURY VILLAGE",
        },
        {
          date: "2024-12-22",
          city: "кАЛИНИНГРАД",
          venue: "Барвиха LUXURY VILLAGE",
        },
        {
          date: "2024-12-23",
          city: "Магнитогорск",
          venue: "Барвиха LUXURY VILLAGE",
        },
        {
          date: "2024-12-24",
          city: "Электросталь",
          venue: "Барвиха LUXURY VILLAGE",
        },
        {
          date: "2024-12-25",
          city: "Саратов",
          venue: "Барвиха LUXURY VILLAGE",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Concerts", null, {});
  },
};