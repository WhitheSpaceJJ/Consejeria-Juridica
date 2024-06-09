// Variable express que maneja las rutas de la API
const express = require("express");
// Variable que manda a llamar las variables de entorno, en este caso el puerto y el host del token
const { PORT, HOSTTOKENUSUARIOS, GRPCPORTCODIGOSPOSTALES } = require("./config/default.js");
// Constantes que representa las rutas de la API
// Rutas del serrvicio de estados
const estadosRoutes = require('./routes/estados.routes.js');
// Rutas del servicio de codigos postales
const codigosPostalesRoutes = require('./routes/codigosPostales.routes.js');

// Rutas del servicio de colonias
const coloniasRoutes = require('./routes/colonias.routes.js');
// Variable que manda a llamar la clase de errores
const CustomeError = require("./utilities/customeError.js");

//Variable que manda a llamar el servicio de GRPC de usuarios
const grpc = require('@grpc/grpc-js');
// Variable que manda a llamar el paquete de definiciones de los servicios GRPC
const { packageDefinition } = require("./clienteUsuarios/cliente.js")
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

const jwtMiddleware = async (req, res, next) => {
  const tokenHeader = req.headers.authorization; // Obtener el valor del encabezado "Authorization"

  // Verificar si el token existe en el encabezado
  if (!tokenHeader) {
    const customeError = new CustomeError('Token no proporcionado.', 401);
    next(customeError);
    return;
  }

  // Extraer el token del encabezado "Authorization"
  const token = tokenHeader.replace('Bearer ', ''); // Quita "Bearer " del encabezado
  const serviciosProto = grpc.loadPackageDefinition(packageDefinition).servicios;

  const tokenClient = new serviciosProto.TokenService(HOSTTOKENUSUARIOS, grpc.credentials.createInsecure());

  tokenClient.validarToken({ token: token }, (err, response) => {
    if (err) {
      const customeError = new CustomeError('Error en la validación del token.', 500);
      next(customeError);
      return;
    }

    //se supone response.permisos es un array, no hay metodo que lo trate como arreglo
    const permisos = response.permisos;
    const id_distrito_judicial = response.id_distrito_judicial;
    const id_usuario = response.id_usuario;
    if (permisos === 0) {
      const customeError = new CustomeError('Token inválido, no ha iniciado sesión o no cuenta con permisos.', 401);
      next(customeError);
    } else {
      req.id_usuario = id_usuario;
      req.id_distrito_judicial = id_distrito_judicial;
      req.permisos = response.permisos;
      next();
    }
  });
};

// Middleware para manejar las rutas de la API de colonias
app.use('/colonias',
  jwtMiddleware,
  coloniasRoutes);
// Middleware para manejar las rutas de la API de codigos postales
app.use('/codigospostales',
  jwtMiddleware,
  codigosPostalesRoutes);
// Middleware para manejar las rutas de la API de estados
app.use('/estados',
  jwtMiddleware,
  estadosRoutes);

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



/**
 * Variables del servicio de usuarios GRPC para validar el token
 */
const { packageDefinition2 } = require("./grpc/route.server")
const grpc2 = require('@grpc/grpc-js');

/**
 * Importamos el controlador de jwt,roteguide y constantes de respuesta
 */
//const jwtController = require("./utilidades/jwtController");
const routeguide = grpc2.loadPackageDefinition(packageDefinition2).codigoService;
const responseValido = { message: 'Codigo válido' };
const responseInvalido = { message: 'Codigo inválido' };
const controlColonias = require("./controllers/colonias.controllers.js");
/**
 * Función que permite crear el servidor GRPC el cual valida el token
 *  */
function getServer() {
  var server = new grpc2.Server();
  server.addService(routeguide.CodigoService.service, {
    validarCodigo: (call, callback) => {
      controlColonias.getColoniaByIDService(call.request.id_colonia).then((response) => {
        if (response !== null) {
          callback(null, responseValido);
        } else {
          callback(null, responseInvalido);
        }
      }).catch((err) => {
        callback(null, responseInvalido);
      });
    }
  });
  return server;
}

//Inicializamos el servidor GRPC en el puerto 161
var server2 = getServer();
server2.bindAsync(
  `localhost:${GRPCPORTCODIGOSPOSTALES}`,
  grpc2.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err != null) {
      return console.error(err);
    }
    console.log("")
    console.log(`gRPC listening on ${GRPCPORTCODIGOSPOSTALES}`)
    server2.start();
  }
);
