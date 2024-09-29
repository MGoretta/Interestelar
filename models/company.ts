'use strict';

import {
  Model,
  UUIDV4
} from 'sequelize';

type CompanyAttributes = {
  id: string;
  name: string;
  // other attributes...
};

module.exports = (sequelize: any, DataTypes: any) => {
  class Company extends Model<CompanyAttributes>
  implements CompanyAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    name!: string;
    
    static associate(models:any) {
      // define association here
      Company.hasOne(models.Location, {
        foreignKey: 'companyId',  // Clave foránea en Location
        as: 'location'
      });
      Company.hasMany(models.Rocket, {
        foreignKey: 'companyId',  // opcional: puedes definir la foreign key explícitamente
        as: 'companyRockets'
      });
      Company.hasMany(models.Mission, {
        foreignKey: "companyId",
        as: 'companyMission'
      });
    }
  }
  Company.init({
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
    modelName: 'Company',
  });
  return Company;
};