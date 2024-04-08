const { Sequelize } = require('sequelize');

// Crear instancia de Sequelize y establecer conexión a la base de datos
const sequelize = new Sequelize(
 process.env.DB_NAME ||   "defensoria_demandas",
  process.env.DB_USER ||  "root" ,
   process.env.DB_PASSWORD || "root",
    {
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || 3306,
        dialect: 'mysql',
        logging: false
    }
);

// Exportar la instancia de Sequelize para su uso en otros archivos
module.exports = sequelize;