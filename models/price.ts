'use strict';

import {
  Model
} from 'sequelize';

type PriceAttributes = {
  id: number;
  price: number;
  // other attributes...
};

module.exports = (sequelize: any, DataTypes: any) => {
  class Price extends Model<PriceAttributes>
  implements PriceAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
  price!: number;

    static associate(models:any) {
      // define association here
      Price.belongsTo(models.Rocket, {
        foreignKey: 'rocketId',
        as: 'priceRocket'
      })
    }
  }
  Price.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Price',
  });
  return Price;
};