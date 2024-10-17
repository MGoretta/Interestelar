'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Paso 1: Eliminar la columna actual de "id"
    await queryInterface.removeColumn('MissionStatuses', 'id');

    // Paso 2: Volver a agregar la columna "id" con autoincrement y primaryKey
    await queryInterface.addColumn('MissionStatuses', 'id', {
      type: Sequelize.INTEGER,
      autoIncrement: true, // Configuramos autoincremental
      allowNull: false,
      primaryKey: true,    // Clave primaria
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Deshacer cambios si es necesario (revertir la migración)
    await queryInterface.removeColumn('MissionStatuses', 'id');
    
    await queryInterface.addColumn('MissionStatuses', 'id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    });
  }
};


