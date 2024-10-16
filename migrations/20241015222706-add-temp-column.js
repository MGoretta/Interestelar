'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Agregar una columna temporal de tipo DATE
    await queryInterface.addColumn('DateTimes', 'dateandtime_temp', {
      type: Sequelize.DATE,
      allowNull: true, // Permitir nulos inicialmente
    });

    // Si hubiera datos, se copiarían aquí. Dado que está vacía, esto no afectará nada.
    await queryInterface.sequelize.query(`
      UPDATE "DateTimes"
      SET "dateandtime_temp" = to_timestamp("dateandtime", 'YYYY-MM-DD HH24:MI:SS')
      WHERE "dateandtime" IS NOT NULL;
    `);
  },

  async down(queryInterface, Sequelize) {
    // Eliminar la columna temporal si se revierte
    await queryInterface.removeColumn('DateTimes', 'dateandtime_temp');
  }
};

