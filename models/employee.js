'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Employee.hasOne(models.ColorCategory,{
      //   foreignKey: {
      //     name: 'id',
      //     allowNull: true
      //   }
      // });
      
      // sourceKey = "hexid"
      models.ColorCategory.hasMany(Employee ,{ foreignKey: {name: 'colorId', allowNull: true, sourceKey: 'colorName'}});
      //Employee.hasMany(models.ColorCategory);
      Employee.hasMany(models.TimeOffs, {foreignKey: { allowNull: false, onDelete: 'CASCADE'}});
      models.TimeOffs.belongsTo(Employee);
    }
  }
  Employee.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    dateofBirth: DataTypes.STRING,
    bloodGroup: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Employee',
  });
  return Employee;
};