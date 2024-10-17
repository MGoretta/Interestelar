'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Eliminar la columna 'id' si ya existe
    await queryInterface.removeColumn('Locations', 'id');

    // Agregar la columna 'id' con autoincremento
    await queryInterface.addColumn('Locations', 'id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true, // Establecer autoincremento
      primaryKey: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Eliminar la columna 'id' en reversa
    await queryInterface.removeColumn('Locations', 'id');
  }
};


