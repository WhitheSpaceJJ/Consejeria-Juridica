const sequelize = require('../config/db')
const { DataTypes } = require('sequelize')

/*
* Modelo de juez el cual contiene los atributos de un juez
*/
const juez = sequelize.define('juez', {
  id_juez: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  nombre_juez: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  estatus_general: {
    type: DataTypes.ENUM('ACTIVO', 'INACTIVO'), // Usar ENUM con los valores permitidos
    allowNull: false,
    validate: {
      isIn: [['ACTIVO', 'INACTIVO']], // Validar que solo acepte estos valores
    },
  }
}, {
  sequelize,
  tableName: 'juez',
  timestamps: false,
  indexes: [
    {
      name: 'PRIMARY',
      unique: true,
      using: 'BTREE',
      fields: [
        { name: 'id_juez' }
      ]
    }
  ]
})

module.exports = juez
