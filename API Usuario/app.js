

// Importamos los módulos necesarios
const express = require('express');
const {PORT,HOSTTOKENGRPCPORT} = require("./configuracion/default.js");

const usuariosRutas = require("./rutas/usuarioRutas");

const permisosRutas = require("./rutas/permisosRutas"); 
 
const tipoUsuarioRutas = require("./rutas/tipoUsuarioRutas");


const CustomeError = require("./utilidades/customeError");
const errorController = require("./utilidades/errrorController")


const jwtController = require("./utilidades/jwtController");
// Importamos el módulo cors para permitir solicitudes de origen cruzado
const cors = require('cors');

// Creamos una nueva aplicación express
const app = express();

// Usamos el middleware express.json() para analizar las solicitudes con cuerpos JSON
app.use(express.json());

// Usamos el middleware cors para permitir solicitudes de origen cruzado
app.use(cors());

const jwtMiddleware = async (req, res, next) => {
  // Obtenemos el token del encabezado de la solicitud
  const tokenHeader = req.headers.authorization; 
  if (!tokenHeader) {
    // Si no hay token, creamos un error personalizado y lo pasamos al siguiente middleware
    const customeError = new CustomeError('Token no proporcionado.', 401);
    next(customeError);
    return;
  }
  // Eliminamos el prefijo 'Bearer ' del token
  const token = tokenHeader.replace('Bearer ', '');
  
    try {
  await  jwtController.verifyToken(token);
    next();
  } catch (error) {
    const customeError = new CustomeError('Token inválido, no ha iniciado sesión.', 401);
    next(customeError);
  }
};

// Usamos el middleware de rutas de usuarios
app.use('/usuarios', usuariosRutas);

app.use('/permisos', 
//jwtMiddleware,
 permisosRutas);

app.use('/tipo-usuario',
//jwtMiddleware,
 tipoUsuarioRutas);


// Si ninguna ruta coincide, creamos un error personalizado y lo pasamos al siguiente middleware
app.all("*", (req, res, next) => {
  const err = new CustomeError("No se puede encontrar " + req.originalUrl + " en el servidor", 404);
  next(err);
});

// Usamos el controlador de errores como último middleware
app.use(errorController);

// Hacemos que la aplicación escuche en el puerto especificado
app.listen(PORT, () => {
  console.log(`Aplicación corriendo en el puerto ${PORT}`);
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
        .then(() => {
          callback(null, responseValido);
        })
        .catch(() => {
          callback(null, responseInvalido);
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
          callback(null, { message: 'Usuario inválido' });
        });
    }
  });

  return server;
}

const controlUsuarios = require("./controles/controlUsuario");


const server = getServer();
server.bindAsync(
  `localhost:${HOSTTOKENGRPCPORT}`,
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err != null) {
      return console.error(err);
    }
    console.log(`gRPC listening on ${HOSTTOKENGRPCPORT}`);
    server.start();
  }
);
