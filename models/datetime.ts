'use strict';

import {
  Model
} from 'sequelize';

type DateTimeAttributes = {
  id: number;
  dateandtime: string;
  // other attributes...
};

module.exports = (sequelize: any, DataTypes: any) => {
  class DateTime extends Model<DateTimeAttributes>
  implements DateTime {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    dateandtime!: string;

    static associate(models: any) {
      // define association here
      DateTime.belongsTo(models.Mission, {
        foreignKey: 'missionId',  
        as: 'datetimeMission'
      });
    }
  }
  DateTime.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    dateandtime: {
    type: DataTypes.STRING,
    allowNull: false
  },
  }, {
    sequelize,
    modelName: 'DateTime',
  });
  return DateTime;
};