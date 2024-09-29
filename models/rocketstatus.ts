'use strict';

import {
  Model
} from 'sequelize';

type RocketStatusAttributes = {
  id: number;
  status: 'Active' | 'Inactive';
  // other attributes...
};

module.exports = (sequelize: any, DataTypes: any) => {
  class RocketStatus extends Model<RocketStatusAttributes>
  implements RocketStatusAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    status!: 'Active' | 'Inactive';

    static associate(models: any) {
      // define association here
      RocketStatus.belongsTo(models.Rocket, {
        foreignKey: 'rocketId',
        as: 'statusRocket'
      })
    }
  }
  RocketStatus.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    status: {
      type: DataTypes.ENUM('Active', 'Inactive'),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'RocketStatus',
  });
  return RocketStatus;
};