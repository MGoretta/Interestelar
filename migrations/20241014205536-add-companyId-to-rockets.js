'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Solo agrega la clave foránea si la columna ya existe
    await queryInterface.addConstraint('Rockets', {
      fields: ['companyId'],
      type: 'foreign key',
      name: 'fk_rockets_companyId', // Nombre de la clave foránea
      references: {
        table: 'Companies',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revertir la adición de la clave foránea
    await queryInterface.removeConstraint('Rockets', 'fk_rockets_companyId');
  }
};


