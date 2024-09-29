'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Cambiar la columna status para que sea un ENUM con 'Active' e 'Inactive'
    await queryInterface.changeColumn('RocketStatuses', 'status', {
      type: Sequelize.ENUM('Active', 'Inactive'),
      allowNull: false,
    });
  },

  async down (queryInterface, Sequelize) {
    // Revertir el cambio, devolver status a STRING (si decides hacerlo)
    await queryInterface.changeColumn('RocketStatuses', 'status', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  }
};
