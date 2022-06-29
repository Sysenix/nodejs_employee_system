'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TimeOffs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TimeOffs.hasOne(models.Employee,{
        as: 'EmployeeID',
        foreignKey: 'id'
      });
      TimeOffs.belongsTo(models.Employee);
    }
  }
  TimeOffs.init({
    startTime: DataTypes.STRING,
    endTime: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TimeOffs',
  });
  return TimeOffs;
};