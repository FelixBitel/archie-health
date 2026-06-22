const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Archie = sequelize.define('Archie', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    defaultValue: 'Арчи'
  },
  breed: {
    type: DataTypes.STRING,
    defaultValue: 'Мишлинг'
  },
  age: {
    type: DataTypes.INTEGER,
    defaultValue: 11
  },
  weight: {
    type: DataTypes.FLOAT,
    defaultValue: 21
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Под наблюдением после операции'
  },
  lastCheckup: {
    type: DataTypes.DATEONLY,
    defaultValue: '2024-12-05'
  }
});

module.exports = Archie;