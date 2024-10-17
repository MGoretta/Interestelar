'use strict';

import { Model } from 'sequelize';

type MissionStatusAttributes = {
  id: number;
  status: 'Success' | 'Failure' | 'Partial Failure' | 'Prelaunch Failure';
};

module.exports = (sequelize: any, DataTypes: any) => {
  class MissionStatus extends Model<MissionStatusAttributes>
  implements MissionStatusAttributes {
    id!: number;
    status!: 'Success' | 'Failure' | 'Partial Failure' | 'Prelaunch Failure';

    static associate(models: any) {
      MissionStatus.belongsTo(models.Mission, {
        foreignKey: 'missionId',
        as: 'missionStatus',
      });
    }
  }
  MissionStatus.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,  // Asegurando el autoincremento
    },
    status: {
      type: DataTypes.ENUM('Success', 'Failure', 'Partial Failure', 'Prelaunch Failure'),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'MissionStatus',
    timestamps: true, // Asegura que createdAt y updatedAt se gestionen automáticamente
  });
  return MissionStatus;
};


// 'use strict';

// import {
//   Model
// } from 'sequelize';

// type MissionStatusAttributes = {
//   id: number;
//   status: 'Success' | 'Failure' | 'Partial Failure' | 'Prelaunch Failure';  // Enum-like typing
//   // other attributes...
// };

// module.exports = (sequelize: any, DataTypes: any) => {
//   class MissionStatus extends Model<MissionStatusAttributes>
//   implements MissionStatusAttributes {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     id!: number;
//     status!: 'Success' | 'Failure' | 'Partial Failure' | 'Prelaunch Failure';  // Enum-like typing

//     static associate(models: any) {
//       // define association here
//       MissionStatus.belongsTo(models.Mission, {
//         foreignKey: 'missionId',
//         as: 'missionStatus'
//       })
//     }
//   }
//   MissionStatus.init({
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true
//     },
//     status: {
//       type: DataTypes.ENUM('Success', 'Failure', 'Partial Failure', 'Prelaunch Failure'),  // Solo permite estos valores
//       allowNull: false}
//   }, {
//     sequelize,
//     modelName: 'MissionStatus',
//   });
//   return MissionStatus;
// };