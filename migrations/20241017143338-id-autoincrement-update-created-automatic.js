'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Paso 1: Crear la secuencia manualmente si no existe
    await queryInterface.sequelize.query(`
      CREATE SEQUENCE IF NOT EXISTS "MissionStatuses_id_seq" START WITH 1 INCREMENT BY 1;
    `);

    // Paso 2: Asociar la secuencia a la columna "id"
    await queryInterface.sequelize.query(`
      ALTER TABLE "MissionStatuses"
      ALTER COLUMN "id" SET DEFAULT nextval('"MissionStatuses_id_seq"');
    `);

    // Paso 3: Modificar las columnas createdAt y updatedAt para usar NOW() como valor por defecto
    await queryInterface.changeColumn('MissionStatuses', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW'),
    });

    await queryInterface.changeColumn('MissionStatuses', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW'),
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revertir los cambios en caso de rollback
    await queryInterface.sequelize.query(`
      ALTER TABLE "MissionStatuses"
      ALTER COLUMN "id" DROP DEFAULT;
    `);

    await queryInterface.sequelize.query(`
      DROP SEQUENCE IF EXISTS "MissionStatuses_id_seq";
    `);

    await queryInterface.changeColumn('MissionStatuses', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
    });

    await queryInterface.changeColumn('MissionStatuses', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  }
};





