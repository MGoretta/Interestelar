'use strict';

import {
  Model,
  UUIDV4
} from 'sequelize';

type MissionAttributes = {
  id: string;
  name: string;
  // other attributes...
};

module.exports = (sequelize: any, DataTypes: any) => {
  class Mission extends Model<MissionAttributes>
  implements Mission {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    name!: string;

    static associate(models: any) {
      // define association here
      Mission.belongsTo(models.Company, {
        foreignKey: 'companyId',
        as: 'missionCompany'
      });
      Mission.hasOne(models.MissionStatus, {
        foreignKey: 'missionId',
        as: 'missionStatus'
      });
      Mission.hasOne(models.Rocket, {
        foreignKey: 'missionId',
        as: 'missionRocket'
      });
      Mission.hasOne(models.DateTime, {
        foreignKey: 'missionId',
        as: 'missionDateTime'
      });
    }
  }
  Mission.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
      },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Mission',
  });
  return Mission;
};