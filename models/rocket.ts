'use strict';

import {
  Model
} from 'sequelize';

type RocketAttributes = {
  id: number;
  name: string;
  // other attributes...
};

module.exports = (sequelize:any, DataTypes:any) => {
  class Rocket extends Model<RocketAttributes> 
  implements Rocket {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
  name!: string;

    static associate(models: any) {
      // define association here
      Rocket.belongsTo(models.Mission, {
        foreignKey: 'missionId',
          as: 'rocketMission'
      });
      Rocket.belongsTo(models.Company, {
        foreignKey: 'companyId',
          as: 'rocketCompany'
      });
      Rocket.hasOne(models.RocketStatus, {
        foreignKey: 'rocketId',
          as: 'rocketStatus'
      });
      Rocket.hasOne(models.Price, {
        foreignKey: 'rocketId',
          as: 'rocketPrice'
      });
      }
    }
  
  Rocket.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Rocket',
  });
  return Rocket;
};