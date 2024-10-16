'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('DateTimes', 'dateandtime'); // Eliminar la columna original
    await queryInterface.renameColumn('DateTimes', 'dateandtime_temp', 'dateandtime'); // Renombrar la columna temporal
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('DateTimes', 'dateandtime', 'dateandtime_temp'); // Renombrar de nuevo en caso de rollback
    await queryInterface.addColumn('DateTimes', 'dateandtime', {
      type: Sequelize.STRING, // Cambiar al tipo original
      allowNull: false,
    });
  }
};

