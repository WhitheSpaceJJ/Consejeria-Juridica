const sequelize = require("./conexion");

const { DataTypes } = require("sequelize");


/**
 * Modelo de la tabla tipo de usuario 
 * @property {string} id_tipouser - id del tipo de usuario
 * @property {string} tipo_usuario - nombre del tipo de usuario
 * */
const TipoUser = sequelize.define("tipo_user", {
  id_tipouser
    : {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  tipo_usuario: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [0, 45]
    }
  }
}, {
  timestamps: false,
  tableName: "tipo_user"
});

/**
 * Modelo de la tabla usuario 
 * y se relaciona con los modelos de tipo de usuario y zona
 * @property {string} id_usuario - id del usuario
 * @property {string} nombre - nombre del usuario
 * @property {string} materno - apellido materno del usuario
 * @property {string} paterno - apellido paterno del usuario
 * @property {string} correo - correo del usuario
 * @property {string} password - contraseña del usuario
 * @property {string} id_tipouser - id del tipo de usuario
 * @property {string} id_zona - id de la zona
 * */
const Usuario = sequelize.define("usuarios", {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [0, 45]
    }
  },
  materno: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [0, 45]
    }
  },
  paterno: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [0, 45]
    }
  }
  ,
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [0, 45]
    }
  }
  ,
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [0, 65]
    }
  },
  id_tipouser: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
  ,
  id_distrito_judicial: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  id_empleado: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  estatus_general: {
    type: DataTypes.ENUM('ACTIVO', 'INACTIVO'), // Usar ENUM con los valores permitidos
    allowNull: false,
    validate: {
      isIn: [['ACTIVO', 'INACTIVO']], // Validar que solo acepte estos valores
    },
  }
}, {
  freezeTableName: true,
  timestamps: false
  ,
  name: {
    singular: 'usuario',
    plural: 'usuarios'
  }
});

//Module exports
module.exports = {
  TipoUser
  ,
  Usuario
};
