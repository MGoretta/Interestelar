'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Establecer `createdAt` y `updatedAt` con default NOW()
    await queryInterface.changeColumn('RocketStatuses', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('NOW()') // Usar NOW() por defecto
    });

    await queryInterface.changeColumn('RocketStatuses', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('NOW()') // Usar NOW() por defecto
    });

    // No modificar la columna `id` ya que está configurada correctamente
  },

  async down(queryInterface, Sequelize) {
    // En el caso de deshacer los cambios
    await queryInterface.changeColumn('RocketStatuses', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null
    });

    await queryInterface.changeColumn('RocketStatuses', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null
    });
  }
};






