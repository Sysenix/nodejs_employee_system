'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ColorCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  ColorCategory.init({
    colorName: DataTypes.STRING,
    colorHex: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ColorCategory',
  });
  return ColorCategory;
};