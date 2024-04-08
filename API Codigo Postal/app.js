// Variable express que maneja las rutas de la API
const express = require("express");
// Variable que manda a llamar las variables de entorno, en este caso el puerto y el host del token
const {PORT,HOSTTOKEN} = require("./config/default.js");
// Constantes que representa las rutas de la API
// Rutas del serrvicio de estados
const estadosRoutes = require('./routes/estados.routes.js');
// Rutas del servicio de municipios
const municipiosRoutes = require('./routes/municipios.routes.js');
// Rutas del servicio de codigos postales
const codigosPostalesRoutes = require('./routes/codigosPostales.routes.js');
// Rutas del servicio de ciudades
const ciudadesRoutes = require('./routes/ciudades.routes.js');
// Rutas del servicio de colonias
const coloniasRoutes = require('./routes/colonias.routes.js');
// Variable que manda a llamar la clase de errores
const CustomeError = require("./utilities/customeError.js");

//Variable que manda a llamar el servicio de GRPC de usuarios
const grpc = require('@grpc/grpc-js');
// Variable que manda a llamar el paquete de definiciones de los servicios GRPC
const {packageDefinition}=require("./cliente/cliente.js")
// Constante que maneja los  de errores
const errorController = require("./utilities/errrorController.js")

// Variable que manda a llamar el modulo de cors
const cors = require('cors');
//Consntante que representa la aplicacion de express
const app = express();

// Middleware para manejar los datos en formato JSON
app.use(express.json());
// Middleware para manejar los datos en formato URL
app.use(cors());

//Aqui se utilizara el servicio GRPC de usuarios ya que ahi estara el token.
const jwtMiddleware = async (req, res, next) => {
   // Obtener el valor del encabezado "Authorization"
  const tokenHeader = req.headers.authorization;
  // Verificar si el token existe en el encabezado
  if (!tokenHeader) {
    // Si no existe, enviar un error
    const customeError = new CustomeError('Token no proporcionado.', 401);
    next(customeError);
    return;
  }
  // Extraer el token del encabezado "Authorization"
  // Quita "Bearer " del encabezado
  const token = tokenHeader.replace('Bearer ', ''); 
  // Crear un cliente GRPC
  let token_client = grpc.loadPackageDefinition(packageDefinition).tokenService;
  // Crear un cliente GRPC para el servicio de token
  const validador = new token_client.TokenService(HOSTTOKEN , grpc.credentials.createInsecure());
   
  // Llamar al servicio de validación de token
  validador.validarToken({ token: token }, function (err, response) {
    // Verificar si el token es inválido
    if (response.message === "Token inválido") {
      // Si es inválido, enviar un error
      const customeError = new CustomeError('Token inválido, no ha iniciado sesión.', 401);
      next(customeError);
    } else if (response.message === "Token válido") {
      // Si es válido, continuar con la petición
      next();
    }
  });
};

// Middleware para manejar las rutas de la API de colonias
app.use('/colonias',
//jwtMiddleware, 
coloniasRoutes);
// Middleware para manejar las rutas de la API de codigos postales
app.use('/codigospostales',
//jwtMiddleware,
 codigosPostalesRoutes);
// Middleware para manejar las rutas de la API de estados
app.use('/estados',
//jwtMiddleware,
estadosRoutes);
// Middleware para manejar las rutas de la API de municipios
//app.use('/municipios',
//jwtMiddleware,
// municipiosRoutes);
// Middleware para manejar las rutas de la API de ciudades
//app.use('/ciudades',
//jwtMiddleware, 
//ciudadesRoutes);

// Middleware para manejar las rutas no encontradas
app.all("*", (req, res, next) => {
  const err = new CustomeError("Cannot find " + req.originalUrl + " on the server", 404);
  next(err);
});
// Middleware para manejar los errores
app.use(errorController);
// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Aplicación corriendo en el puerto ${PORT}`);
});
