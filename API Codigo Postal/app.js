/*
//Variables requeridas https
const https = require('https');
const fs = require('fs');
const path = require('path');
*/

const express = require("express");
const { PORT, HOSTTOKENUSUARIOS, GRPCPORTCODIGOSPOSTALES } = require("./config/default.js");
const estadosRoutes = require('./routes/estados.routes.js');
const codigosPostalesRoutes = require('./routes/codigosPostales.routes.js');
const coloniasRoutes = require('./routes/colonias.routes.js');
const CustomeError = require("./utilities/customeError.js");
const grpc = require('@grpc/grpc-js');
const { packageDefinition } = require("./clienteUsuarios/cliente.js");
const errorController = require("./utilities/errrorController.js");
const cors = require('cors');
const logger = require('./utilities/logger.js'); // Importa el logger

const app = express();

app.use(express.json());
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
  const tokenHeader = req.headers.authorization;

  if (!tokenHeader) {
    const customeError = new CustomeError('Token no proporcionado.', 401);
    logger.warn('Token no proporcionado.');
    next(customeError);
    return;
  }

  const token = tokenHeader.replace('Bearer ', '');
  const serviciosProto = grpc.loadPackageDefinition(packageDefinition).servicios;

  const tokenClient = new serviciosProto.TokenService(HOSTTOKENUSUARIOS, grpc.credentials.createInsecure());

  tokenClient.validarToken({ token: token }, (err, response) => {
    if (err) {
      const customeError = new CustomeError('Error en la validación del token.', 500);
      logger.error('Error en la validación del token.');
      next(customeError);
      return;
    }

    const permisos = response.permisos;
    const id_distrito_judicial = response.id_distrito_judicial;
    const id_usuario = response.id_usuario;
    const id_empleado = response.id_empleado;
    const id_tipouser = response.id_tipouser;
    if (permisos === 0) {
      const customeError = new CustomeError('Token inválido, no ha iniciado sesión o no cuenta con permisos.', 401);
      logger.warn('Token inválido.');
      next(customeError);
    } else {
      req.id_empleado = id_empleado;
      req.id_tipouser = id_tipouser;
      req.id_usuario = id_usuario;
      req.id_distrito_judicial = id_distrito_judicial;
      req.permisos = response.permisos;
      next();
    }
  });
};

app.use('/colonias', jwtMiddleware, coloniasRoutes);
app.use('/codigospostales', jwtMiddleware, codigosPostalesRoutes);
app.use('/estados', jwtMiddleware, estadosRoutes);

app.all("*", (req, res, next) => {
  const err = new CustomeError("Cannot find " + req.originalUrl + " on the server", 404);
  logger.warn(`Cannot find ${req.originalUrl} on the server`);
  next(err);
});

app.use((err, req, res, next) => {
  logger.error(`Error: ${err.message}`);
  errorController(err, req, res, next);
});
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
  logger.info(`Aplicación corriendo en el puerto ${PORT}`);
});

const { packageDefinition2 } = require("./grpc/route.server");
const grpc2 = require('@grpc/grpc-js');
const routeguide = grpc2.loadPackageDefinition(packageDefinition2).codigoService;
const responseValido = { message: 'Codigo válido' };
const responseInvalido = { message: 'Codigo inválido' };
const controlColonias = require("./controllers/colonias.controllers.js");

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
        logger.error(`gRPC Error: ${err.message}`);
        callback(null, responseInvalido);
      });
    }
  });
  return server;
}

var server2 = getServer();
server2.bindAsync(
  `localhost:${GRPCPORTCODIGOSPOSTALES}`,
  grpc2.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err != null) {
      logger.error(`gRPC Error: ${err.message}`);
      return console.error(err);
    }
    logger.info(`gRPC listening on ${GRPCPORTCODIGOSPOSTALES}`);
  }
);