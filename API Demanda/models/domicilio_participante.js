const sequelize = require('../config/db')
const { DataTypes } = require('sequelize')

const domicilio_participante = sequelize.define('domicilio_participante', {
    id_domicilio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    calle_domicilio: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [0, 75],
        },
    },
    numero_exterior_domicilio: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [0, 25],
        },
        defaultValue: null,
    },
    numero_interior_domicilio: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [0, 25],
        },
        defaultValue: null,
    },
    id_colonia: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_participante: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'participante',
            key: 'id_participante'
        }
    },
}, {
    sequelize,
    tableName: 'domicilio_participante',
    timestamps: false,
    indexes: [
        {
            name: 'id_participante',
            using: 'BTREE',
            fields: [
                { name: 'id_participante' }
            ]
        }
    ]
})

module.exports = domicilio_participante
