// Variable para cargar el módulo de express 
const express = require('express');
// Puerto en el que se ejecutará el servidor
const {PORT,HOSTTOKENUSUARIOS,GRPCPORTASESORIAS} = require("./configuracion/default.js");
// Rutas de la aplicación
const zonasRutas = require("./rutas/zonaRutas");
const tipoDeJuiciosRutas = require("./rutas/tipoJuicioRutas");
const generosRutas = require("./rutas/generoRutas");
const estadosCivilesRutas = require("./rutas/estadoCivilRutas");
const motivosRutas = require("./rutas/motivoRutas");
const asesoriasRutas = require("./rutas/asesoriaRutas");
const asesoresRutas = require("./rutas/asesorRutas");
const turnoRutas = require("./rutas/turnoRutas");
const catalogoRequisitosRutas = require("./rutas/catalogoRequisitoRuta");
const asesoradoRutas = require("./rutas/asesorRutas");


const defensorRuta = require("./rutas/defensorRuta.js");
const distritoJudicialRuta = require("./rutas/distritoJudicialRuta.js");
const empleadoRuta = require("./rutas/empleadoRuta.js");
const municipioDistro = require("./rutas/municipioDistroRuta.js");

// Variable para cargar el módulo de gRPC
const grpc = require('@grpc/grpc-js');
// Variable para cargar el módulo de proto-loader
const { packageDefinition3 } = require("./clienteUsuarios/cliente.js")
// Variable para cargar el módulo de errores personalizados
const CustomeError = require("./utilidades/customeError");
// Variable para cargar el módulo de control de errores
const errorController = require("./utilidades/errrorController")
// Variable para cargar el módulo de cors
const cors = require('cors');
// Variable para cargar el módulo de express
const app = express();
// Uso de express.json
app.use(express.json());
// Uso de cors
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
  const serviciosProto = grpc.loadPackageDefinition(packageDefinition3).servicios;

  const tokenClient = new serviciosProto.TokenService(HOSTTOKENUSUARIOS, grpc.credentials.createInsecure());

  tokenClient.validarToken({ token: token }, (err, response) => {
    if (err) {
      const customeError = new CustomeError('Error en la validación del token.', 500);
      next(customeError);
      return;
    }
    //se supone response.permisos es un array, no hay metodo que lo trate como arreglo
     const permisos =  response.permisos;
     const id_distrito_judicial = response.id_distrito_judicial;
     const id_usuario = response.id_usuario;
    if ( permisos=== 0) {
      const customeError = new CustomeError('Token inválido, no ha iniciado sesión o no cuenta con permisos.', 401);
      next(customeError);
    } else{
      req.id_usuario = id_usuario;
      req.id_distrito_judicial = id_distrito_judicial;
      req.permisos = response.permisos;
      next();
    }

  });
};


app.use('/tipos-de-juicio', 
jwtMiddleware, 
tipoDeJuiciosRutas);
// Usamos el middleware de validación de tokens en nuestras rutas
app.use('/asesorias', 
jwtMiddleware, 
asesoriasRutas);

app.use('/asesores',
 jwtMiddleware,
  asesoresRutas);
app.use('/generos', 
jwtMiddleware,
 generosRutas);
app.use('/estados-civiles',
 jwtMiddleware, 
 estadosCivilesRutas);
app.use('/motivos',
jwtMiddleware, 
 motivosRutas);
app.use('/zonas',
 jwtMiddleware, 
 zonasRutas);
app.use('/turnos', 
jwtMiddleware, 
turnoRutas);
app.use('/catalogo-requisitos', 
jwtMiddleware, 
catalogoRequisitosRutas);
app.use('/defensores',
 jwtMiddleware,
  defensorRuta);
app.use('/distritos-judiciales', 
jwtMiddleware,
 distritoJudicialRuta);
app.use('/empleados',
 jwtMiddleware,
  empleadoRuta);
app.use('/municipios-distritos', 
jwtMiddleware,
 municipioDistro);


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





const { packageDefinition2 } = require("./grpc/route.server")
const grpc2 = require('@grpc/grpc-js');

/**
* Importamos el controlador de jwt,roteguide y constantes de respuesta
*/
//const jwtController = require("./utilidades/jwtController");
const routeguide = grpc2.loadPackageDefinition(packageDefinition2).servicios;
const responseValidoEmpleado = { message: 'Empleado válido' };
const responseInvalidoEmpleado = { message: 'Empleado inválido' };
const responseValidoDistrito = { message: 'Distrito válido' };
const responseInvalidoDistrito = { message: 'Distrito inválido' };

 const responseValidoTurno = { message: 'Turno válido' };
const responseInvalidoTurno = { message: 'Turno inválido' };

 const responseValidoTipoJuicio = { message: 'Tipo Juicio válido' };
const responseInvalidoTipoJuicio = { message: 'Tipo Juicio inválido' };



  const responseValidoDefensor = { message: 'Defensor válido' };
const responseInvalidoDefensor = { message: 'Defensor inválido' };


const controlEmpleados = require("./controles/controlEmpleados.js");
const controlDistritos = require("./controles/controlDistritosJudiciales.js");

const controlTurnos = require("./controles/controlTurno.js");
const controlTipoJuicio = require("./controles/controlTipoJuicio.js");
const controlDefensores = require("./controles/controlDefensor.js");
/**
* Función que permite crear el servidor GRPC el cual valida el token
*  */
function getServer() {
 var server = new grpc2.Server();
 server.addService(routeguide.EmpleadoService.service, {
   validarEmpleado: (call, callback) => {
    controlEmpleados.obtenerEmpleadoIDAndDistrito(call.request).then((response) => {
       if (response !== null) {
         callback(null, responseValidoEmpleado);
       } else {
         callback(null, responseInvalidoEmpleado);
       }

     }).catch((err) => {
       callback(null, responseInvalidoEmpleado);
     });
   }
 });

 server.addService(routeguide.DistritoService.service, {
  validarDistrito: (call, callback) => {
   controlDistritos.obtenerDistritoJudicial(call.request.id_distrito_judicial).then((response) => {
      if (response !== null) {
        callback(null, responseValidoDistrito);
      } else {
        callback(null, responseInvalidoDistrito);
      }

    }).catch((err) => {
      callback(null, responseInvalidoDistrito);
    });
  }
});

server.addService(routeguide.TurnoService.service, {
  validarTurno: (call, callback) => {
   controlTurnos.onbtenerTurnoIDSimple(call.request.id_turno).then((response) => {
      if (response !== null) {
        callback(null,  responseValidoTurno);
      } else {
        callback(null, responseInvalidoTurno);
      }

    }).catch((err) => {
      callback(null,  responseInvalidoTurno);
    });
  }

});


server.addService(routeguide.TipoJuicioService.service, {
  validarTipoJuicio: (call, callback) => {
   controlTipoJuicio.obtenerTipoDeJuicioPorId(call.request.id_tipo_juicio).then((response) => {
      if (response !== null) {
        callback(null,  responseValidoTipoJuicio);
      } else {
        callback(null,  responseInvalidoTipoJuicio);
      }

    }).catch((err) => {
      callback(null,  responseInvalidoTipoJuicio);
    });
  }

});


server.addService(routeguide.DefensorService.service, {
  validarDefensor: (call, callback) => {
   controlDefensores.obtenerDefensorPorId(call.request.id_defensor).then((response) => {
      if (response !== null) {
        callback(null, responseValidoDefensor);
      } else {
        callback(null,  responseInvalidoDefensor);
      }

    }).catch((err) => {
      callback(null, responseInvalidoDefensor);
    });
  }

});



 return server;
}

//Inicializamos el servidor GRPC en el puerto 161
var server2 = getServer();
server2.bindAsync(
 `localhost:${GRPCPORTASESORIAS}`,
 grpc2.ServerCredentials.createInsecure(),
 (err, port) => {
   if (err != null) {
     return console.error(err);
   }
   console.log("")
   console.log(`gRPC listening on ${GRPCPORTASESORIAS}`)
   server2.start();
 }
);
