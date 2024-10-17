'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Modificar createdAt
    await queryInterface.changeColumn('Locations', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW'), // Valor por defecto: fecha y hora actual
    });

    // Modificar updatedAt
    await queryInterface.changeColumn('Locations', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW'), // Valor por defecto: fecha y hora actual
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revertir cambios si es necesario
    await queryInterface.changeColumn('Locations', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
    });

    await queryInterface.changeColumn('Locations', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  }
};

