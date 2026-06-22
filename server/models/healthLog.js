const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const HealthLog = sequelize.define('HealthLog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('walk', 'medication', 'weight', 'health', 'mood', 'appetite', 'bathroom'),
    allowNull: false
  },
  notes: {
    type: DataTypes.TEXT
  },
  weight: {
    type: DataTypes.FLOAT
  },
  energy: {
    type: DataTypes.ENUM('высокая', 'средняя', 'низкая')
  },
  severity: {
    type: DataTypes.ENUM('легкая', 'средняя', 'тяжелая')
  },
  sideEffects: {
    type: DataTypes.STRING
  }
});

module.exports = HealthLog;