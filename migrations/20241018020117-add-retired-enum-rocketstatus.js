// Crear una nueva migración con el comando:
// npx sequelize-cli migration:generate --name add-retired-to-rocketstatus-status

// Luego en el archivo de migración
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`ALTER TYPE "enum_RocketStatuses_status" ADD VALUE 'Retired';`);
  },
  down: async (queryInterface, Sequelize) => {
    // No puedes eliminar un valor de un enum en PostgreSQL
    // Pero puedes crear otra migración si decides cambiarlo en el futuro
  }
};

