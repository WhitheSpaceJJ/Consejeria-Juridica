const grpc = require('@grpc/grpc-js')
const { packageDefinition } = require('../clienteUsuarios/cliente')
 
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
    const customeError = new CustomeError('Token no proporcionado.', 401);
    next(customeError);
    return;
  }

  // Extraer el token del encabezado "Authorization"
  const token = tokenHeader.replace('Bearer ', ''); // Quita "Bearer " del encabezado
  const serviciosProto = grpc.loadPackageDefinition(packageDefinition).servicios;

  const tokenClient = new serviciosProto.TokenService(process.env.HOSTTOKEN, grpc.credentials.createInsecure());

  tokenClient.validarToken({ token: token }, (err, response) => {
    if (err) {
      const customeError = new CustomeError('Error en la validación del token.', 500);
      next(customeError);
      return;
    }

    if (response.message === "Token inválido") {
      const customeError = new CustomeError('Token inválido, no ha iniciado sesión.', 401);
      next(customeError);
    } else if (response.message === "Token válido") {
      next();
    }
  });
};

module.exports = jwtMiddleware
