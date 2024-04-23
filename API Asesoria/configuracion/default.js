
  // Importamos dotenv
const dotenv = require('dotenv'); 
// Invocamos el metodo config de dotenv
dotenv.config(); 



// Obtenemos el valor de la variable de entorno DBHOST o usamos localhost por defecto
const DBHOST = process.env.DBHOST ; 
// Obtenemos el valor de la variable de entorno DBUSER o usamos root por defecto
const DBUSER = process.env.DBUSER ; 
// Obtenemos el valor de la variable de entorno DBPASSWORD o usamos 1234 por defecto
const DBPASSWORD = process.env.DBPASSWORD ; 
// Obtenemos el valor de la variable de entorno DATABASE o usamos consejeria por defecto
const DATABASE = process.env.DATABASE ; 
// Obtenemos el valor de la variable de entorno PORT o usamos el puerto 3000 por defecto
const PORT = process.env.PORT; 
// Obtenemos el valor de la variable de entorno DBPORT o usamos el puerto 3306 por defecto
const DBPORT = process.env.DBPORT ; 
 // Obtenemos el valor de la variable de entorno HOSTTOKEN o usamos el puerto 3306 por defecto
const HOSTTOKEN = process.env.HOSTTOKEN ;
// Obtenemos el valor de la variable de entorno HOSTTOKENGR
const HOSTTOKENGRPCPORT = process.env.HOSTTOKENGRPCPORT ; 
// Exportamos las variables
module.exports = {
    DBHOST,
    DBUSER,
    DBPASSWORD,
    DATABASE,
    PORT,
    DBPORT,
    HOSTTOKEN,HOSTTOKENGRPCPORT
}
 


