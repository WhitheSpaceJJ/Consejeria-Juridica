const grpc = require('@grpc/grpc-js')
const { packageDefinition } = require('../clienteUsuarios/cliente')
const CustomeError = require("../utilidades/customeError");
/**
 * @abstract Middleware que verifica y valida el token JWT en el encabezado "Authorization" de la solicitud
 * @param {object} req - Objeto de la solicitud
 * @param {object} res - Objeto de la respuesta
 * @param {function} next - Función que pasa al siguiente middleware
 * @returns {object} Retorna un mensaje de error si el token no es válido o no se proporcionó, de lo contrario pasa al siguiente middleware
 */
const jwtMiddleware = async (req, res, next) => {
  const tokenHeader = req.headers.authorization; // Obtener el valor del encabezado "Authorization"

  // Verificar si el token existe en el encabezado
  if (!tokenHeader) {
    res.status(401).json({ message: 'No se proporcionó un token de autenticación.' });
  } else {

    // Extraer el token del encabezado "Authorization"
    const token = tokenHeader.replace('Bearer ', ''); // Quita "Bearer " del encabezado
    const serviciosProto = grpc.loadPackageDefinition(packageDefinition).servicios;

    const tokenClient = new serviciosProto.TokenService(process.env.HOSTTOKENUSUARIOS, grpc.credentials.createInsecure());

    tokenClient.validarToken({ token: token }, (err, response) => {
      if (err) {
        res.status(500).json({ message: 'Error al validar el token.' });
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
  }


};

module.exports = jwtMiddleware
