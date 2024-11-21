'use strict';

import { Model } from 'sequelize';

type DateTimeAttributes = {
  id: number;
  dateandtime: Date; // Cambiamos a tipo Date
  createdAt?: Date; // Hacer estos campos opcionales
  updatedAt?: Date; // Hacer estos campos opcionales
};

module.exports = (sequelize: any, DataTypes: any) => {
  class DateTime extends Model<DateTimeAttributes> implements DateTime {
    id!: number;
    dateandtime!: Date; // Cambiamos el tipo a Date
    createdAt!: Date; // Asegúrate de incluir estos campos en la clase
    updatedAt!: Date; // Asegúrate de incluir estos campos en la clase

    static associate(models: any) {
      // Definir la relación con Mission
      DateTime.belongsTo(models.Mission, {
        foreignKey: 'missionId',
        as: 'missionDateTime'
      });
    }
  }

  DateTime.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true, // Habilitamos auto-incremento
      },
      dateandtime: {
        type: DataTypes.DATE, // Cambiado a tipo DATE
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // Establecer valor por defecto
        allowNull: false, // Asegurarse de que no sea nulo
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // Establecer valor por defecto
        allowNull: false, // Asegurarse de que no sea nulo
      },
    },
    {
      sequelize,
      modelName: 'DateTime',
      timestamps: true, // Habilita el manejo automático de createdAt y updatedAt
    }
  );
  return DateTime;
};


// 'use strict';

// import { Model } from 'sequelize';

// type DateTimeAttributes = {
//   id: number;
//   dateandtime: Date; // Cambiamos a tipo Date
// };

// module.exports = (sequelize: any, DataTypes: any) => {
//   class DateTime extends Model<DateTimeAttributes> implements DateTime {
//     id!: number;
//     dateandtime!: Date; // Cambiamos el tipo a Date

//     static associate(models: any) {
//       // Definir la relación con Mission
//       DateTime.belongsTo(models.Mission, {
//         foreignKey: 'missionId',
//         as: 'datetimeMission'
//       });
//     }
//   }

//   DateTime.init(
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey: true,
//         autoIncrement: true, // Habilitamos auto-incremento
//       },
//       dateandtime: {
//         type: DataTypes.DATE, // Cambiado a tipo DATE
//         allowNull: false,
//       },
//     },
//     {
//       sequelize,
//       modelName: 'DateTime',
//     }
//   );
//   return DateTime;
// };
