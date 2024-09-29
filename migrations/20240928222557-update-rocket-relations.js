'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Rockets', 'missionId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Missions', // Nombre de la tabla a la que se refiere la FK
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
    
    await queryInterface.changeColumn('Rockets', 'companyId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Companies', // Nombre de la tabla a la que se refiere la FK
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Rockets', 'missionId', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    
    await queryInterface.changeColumn('Rockets', 'companyId', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  }
};
