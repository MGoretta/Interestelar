'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('MissionStatuses', {
      fields: ['id'],
      type: 'primary key',
      name: 'custom_primary_key_constraint' // nombre personalizado para la restricción
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('MissionStatuses', 'custom_primary_key_constraint');
  }
};

