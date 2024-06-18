/*
//Variables requeridas https
const https = require('https');
const fs = require('fs');
const path = require('path');
*/

// Importamos los módulos necesarios
const express = require('express');
const { PORT, GRPCPORTUSUARIOS } = require("./configuracion/default.js");

const usuariosRutas = require("./rutas/usuarioRutas");


const CustomeError = require("./utilidades/customeError");
const errorController = require("./utilidades/errrorController")


const jwtController = require("./utilidades/jwtController");

const logger = require('./utilidades/logger');

// Importamos el módulo cors para permitir solicitudes de origen cruzado
const cors = require('cors');

// Creamos una nueva aplicación express
const app = express();

// Usamos el middleware express.json() para analizar las solicitudes con cuerpos JSON
app.use(express.json());

// Usamos el middleware cors para permitir solicitudes de origen cruzado
app.use(cors());

// Middleware para loguear cada petición con URL completa, headers, y cuerpo
app.use((req, res, next) => {
  const { method, url, body, query, headers } = req;

  // Filtrar solo los encabezados relevantes
  const relevantHeaders = {
    authorization: headers.authorization,
    'user-agent': headers['user-agent'],
    referer: headers.referer,
    origin: headers.origin
  };
  logger.info(`Request: ${method} ${url} - Headers: ${JSON.stringify(relevantHeaders)} - Query: ${JSON.stringify(query)} - Body: ${JSON.stringify(body)}`);
  next();
});

const jwtMiddleware = async (req, res, next) => {
  // Obtenemos el token del encabezado de la solicitud
  if (req.path === "/usuario" || req.path === "/recuperacion") {
    next();
  } else {

    const tokenHeader = req.headers.authorization;
    if (!tokenHeader) {
      // Si no hay token, creamos un error personalizado y lo pasamos al siguiente middleware
      const customeError = new CustomeError('Token no proporcionado.', 401);
      logger.warn('Token no proporcionado.');
      next(customeError);
      return;
    }
    // Eliminamos el prefijo 'Bearer ' del token
    const token = tokenHeader.replace('Bearer ', '');
    try {
      const data = await jwtController.verifyToken(token);
      req.id_usuario = data.id_usuario;
      req.id_tipouser = data.id_tipouser;
      req.id_empleado = data.id_empleado;
      req.id_distrito_judicial = data.id_distrito_judicial;
      req.permisos = data.permisos;
      next();
    } catch (error) {
      const customeError = new CustomeError('Token inválido, no ha iniciado sesión o cuenta con permisos', 401);
      logger.warn('Token inválido.');
      next(customeError);
    }
  }

};

// Usamos el middleware de rutas de usuarios
app.use('/usuarios',
  jwtMiddleware,
  usuariosRutas);



// Si ninguna ruta coincide, creamos un error personalizado y lo pasamos al siguiente middleware
app.all("*", (req, res, next) => {
  const err = new CustomeError("No se puede encontrar " + req.originalUrl + " en el servidor", 404);
  logger.warn("No se puede encontrar " + req.originalUrl + " en el servidor");
  next(err);
});

// Usamos el controlador de errores como último middleware
app.use(errorController);

/*
//Forma con https
const privateKey = fs.readFileSync(path.join(__dirname, 'server.key'), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname, 'server.cer'), 'utf8');
const credentials = { key: privateKey, cert: certificate };

// Crear el servidor HTTPS
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(PORT, () => {
  logger.info(`Aplicación HTTPS corriendo en el puerto ${PORT}`);
});
*/
//Forma sin https
app.listen(PORT, () => {
  logger.info(`Servidor escuchando en el puerto ${PORT}`);
});

const { packageDefinition } = require("./grpc/route.server");
const grpc = require('@grpc/grpc-js');

const serviciosProto = grpc.loadPackageDefinition(packageDefinition).servicios;

const responseValido = { message: 'Token válido' };
const responseInvalido = { message: 'Token inválido' };

/**
 * Función que permite crear el servidor GRPC el cual valida el token y el usuario.
 */
function getServer() {
  const server = new grpc.Server();

  server.addService(serviciosProto.TokenService.service, {
    validarToken: (call, callback) => {
      jwtController.verifyToken(call.request.token)
        .then((data) => {
          callback(null, {
            permisos: data.permisos, id_distrito_judicial: data.id_distrito_judicial,
            id_usuario: data.id_usuario, id_tipouser: data.id_tipouser , id_empleado: data.id_empleado
          });
        })
        .catch((error) => {
          logger.error('Error en la validación del token: ', error.message);
          callback(null, { permisos: [] });
        });
    }
  });

  server.addService(serviciosProto.UsuarioService.service, {
    validarUsuario: (call, callback) => {
      // Aquí puedes agregar la lógica para validar el usuario
      const { id_usuario, usuario } = call.request;
      controlUsuarios.obtenerUsuarioByIDAndNameGrpc(id_usuario, usuario)
        .then((usuario) => {
          if (usuario) {
            callback(null, { message: 'Usuario válido' });
          } else {
            callback(null, { message: 'Usuario inválido' });
          }
        })
        .catch(() => {
          logger.error('Error en la validación del usuario: ', error.message);
          callback(null, { message: 'Usuario inválido' });
        });
    }
  });

  return server;
}

const controlUsuarios = require("./controles/controlUsuario");


var server = getServer();
server.bindAsync(
  `localhost:${GRPCPORTUSUARIOS}`,
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err != null) {
      logger.error(`gRPC Error: ${err.message}`);
      return console.error(err);
    }
    logger.info(`gRPC listening on ${GRPCPORTUSUARIOS}`);
  }
);