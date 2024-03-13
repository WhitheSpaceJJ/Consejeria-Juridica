const { Sequelize } = require('sequelize');

// Crear instancia de Sequelize y establecer conexión a la base de datos
const sequelize = new Sequelize(
  "defensoria_demandas" || process.env.DB_NAME,
  "root" || process.env.DB_USER,
  "1234" || process.env.DB_PASSWORD,
    {
        host:"localhost"|| process.env.DB_HOST,
        port:3306|| process.env.DB_PORT,
        dialect: 'mysql',
        logging: false
    }
);

// Exportar la instancia de Sequelize para su uso en otros archivos
module.exports = sequelize;