'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Eliminar la columna rocketId
    await queryInterface.removeColumn('Rockets', 'rocketId');
  },

  async down (queryInterface, Sequelize) {
    // Volver a agregar la columna rocketId si deshaces la migración
    await queryInterface.addColumn('Rockets', 'rocketId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Rockets', // Cambiar si corresponde a otra tabla
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  }
};
