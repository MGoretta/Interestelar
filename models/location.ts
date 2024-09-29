'use strict';

import {
  Model
} from 'sequelize';

type LocationAttributes = {
  id: number;
  address: string;
  // other attributes...
};

module.exports = (sequelize: any, DataTypes: any) => {
  class Location extends Model<LocationAttributes> 
  implements LocationAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    address!: string;

    static associate(models: any) {
      // define association here
      Location.belongsTo(models.Company, {
        foreignKey: 'companyId',  
        as: 'locationCompany'
      });
    }
  }
  Location.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Location',
  });
  return Location;
};