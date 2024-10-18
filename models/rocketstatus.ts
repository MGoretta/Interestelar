'use strict';

import {
  Model
} from 'sequelize';

type RocketStatusAttributes = {
  id: number;
  status: 'Active' | 'Inactive' | 'Retired';
  createdAt?: Date;
  updatedAt?: Date;
};

module.exports = (sequelize: any, DataTypes: any) => {
  class RocketStatus extends Model<RocketStatusAttributes>
  implements RocketStatusAttributes {
    id!: number;
    status!: 'Active' | 'Inactive' | 'Retired';
    createdAt!: Date;
    updatedAt!: Date;

    static associate(models: any) {
      RocketStatus.belongsTo(models.Rocket, {
        foreignKey: 'rocketId',
        as: 'statusRocket'
      });
    }
  }
  
  RocketStatus.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, // Autoincremental
      primaryKey: true // Reestablecer como clave primaria
    },
    status: {
      type: DataTypes.ENUM('Active', 'Inactive', 'Retired'),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW // Generar automáticamente
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW // Generar automáticamente
    }
  }, {
    sequelize,
    modelName: 'RocketStatus',
    timestamps: true // Habilitar timestamps automáticos
  });

  return RocketStatus;
};


// 'use strict';

// import {
//   Model
// } from 'sequelize';

// type RocketStatusAttributes = {
//   id: number;
//   status: 'Active' | 'Inactive';
//   // other attributes...
// };

// module.exports = (sequelize: any, DataTypes: any) => {
//   class RocketStatus extends Model<RocketStatusAttributes>
//   implements RocketStatusAttributes {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     id!: number;
//     status!: 'Active' | 'Inactive';

//     static associate(models: any) {
//       // define association here
//       RocketStatus.belongsTo(models.Rocket, {
//         foreignKey: 'rocketId',
//         as: 'statusRocket'
//       })
//     }
//   }
//   RocketStatus.init({
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true
//     },
//     status: {
//       type: DataTypes.ENUM('Active', 'Inactive'),
//       allowNull: false
//     }
//   }, {
//     sequelize,
//     modelName: 'RocketStatus',
//   });
//   return RocketStatus;
// };