'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('MissionStatuses', 'id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true, // Agregar la restricción de clave primaria
      autoIncrement: true // Asegurar que sea autoincremental
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('MissionStatuses', 'id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: false, // Eliminar la restricción de clave primaria
      autoIncrement: false // Asegurar que no sea autoincremental
    });
  }
};

