const sequelize = require('../config/db')
const { DataTypes } = require('sequelize')

/*
* Modelo de imputado el cual contiene los atributos de un imputado
* y establece las relaciones con el modelo de participante
*/
const imputado = sequelize.define('imputado', {
  id_imputado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'participante',
      key: 'id_participante'
    }
  }
}, {
  sequelize,
  tableName: 'imputado',
  timestamps: false,
  indexes: [
    {
      name: 'PRIMARY',
      unique: true,
      using: 'BTREE',
      fields: [
        { name: 'id_imputado' }
      ]
    }
  ]
})

module.exports = imputado
