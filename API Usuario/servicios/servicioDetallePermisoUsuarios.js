/**
 const controlTipos = require('../controles/controlTipoUsuario');
const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");

const agregarTipoUsuario = asyncError(async (req, res, next) => {
    const result = await controlTipos.agregarTipoUsuario(req.body);
    if (result === false) {
      const error = new CustomeError('Error al agregar un tipo de usuario', 400);
      return next(error);
    } else {
      res.status(201).json({
        tipoUsuario: result
      });
    }
  }
  );
  
  
 
  const obtenerTiposUsuario = asyncError(async (req, res, next) => {
    const result = await controlTipos.obtenerTiposUsuario();
    if (result === null || result === undefined || result.length === 0) {
      const error = new CustomeError('No se encontraron tipos de usuario', 404);
      return next(error);
    } else {
      res.status(200).json({
        tiposUsuario: result
      });
    }
  } 
  );
  

  
  const eliminarTipoUsuario = asyncError(async (req, res, next) => {
    const result = await controlTipos.eliminarTipoUsuario(req.params.id);
    if (result === false) {
      const error = new CustomeError('Error al eliminar el tipo de usuario', 400);
      return next(error);
    } else {
      res.status(200).json({
        message: 'Tipo de usuario eliminado correctamente'
      });
    }
  }
  );
  

  
  const obtenerTipoUsuarioPorId = asyncError(async (req, res, next) => {
    const result = await controlTipos.obtenerTipoUsuarioPorId(req.params.id);
    if (result === null || result === undefined) {
      const error = new CustomeError('No se encontró el tipo de usuario', 404);
      return next(error);
    } else {
      res.status(200).json({
        tipoUsuario: result
      });
    }
  }
  );

  const actualizarTipoUsuario = asyncError(async (req, res, next) => {
    const result = await controlTipos.actualizarTipoUsuario(req.body);
    if (result === false) {
      const error = new CustomeError('Error al actualizar el tipo de usuario', 400);
      return next(error);
    } else {
      res.status(200).json({
        tipoUsuario: req.body
      });
    }
  }
  );
  
  //Module exports
  module.exports = {
    agregarTipoUsuario,
    obtenerTiposUsuario,
    eliminarTipoUsuario,
    obtenerTipoUsuarioPorId,
    actualizarTipoUsuario
  };


  

  
  Replica los metodos del servicio de tipo de usuario para el servicio de detallePErmisoUsuario
  //estas son las funciones exportadas del modulo de control de detallePermisoUsuario
      //Module exports:
    module.exports = {
        obtenerDetallesPermisosUsuario,
        obtenerDetallePermisoUsuarioPorId,
        agregarDetallePermisoUsuario,
        eliminarDetallePermisoUsuario,
        actualizarDetallePermisoUsuario
    };

 */


const controlDetallePermisoUsuario = require('../controles/controlDetallePermisoUsuario');
const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");

/**
 * @abstract Función que permite agregar un detalle de permiso de usuario
 * @param {*} req => Request
 * @param {*} res => Response
 * @param {*} next => Next
 * @returns detalle de permiso de usuario si se agrega correctamente, false si no se agrega
 */
const agregarDetallePermisoUsuario = asyncError(async (req, res, next) => {
    const result = await controlDetallePermisoUsuario.agregarDetallePermisoUsuario(req.body);
    if (result === false) {
      const error = new CustomeError('Error al agregar un detalle de permiso de usuario', 400);
      return next(error);
    } else {
      res.status(201).json({
        detallePermisoUsuario: result
      });
    }
  }
    );


/**
 * @abstract Función que permite obtener todos los detalles de permisos de usuario
 * @param {*} req => Request
 * @param {*} res => Response
 * @param {*} next => Next
 * @returns detalles de permisos de usuario si se obtienen correctamente, false si no se obtienen
 */

const obtenerDetallesPermisosUsuario = asyncError(async (req, res, next) => {
    const result = await controlDetallePermisoUsuario.obtenerDetallesPermisosUsuario();
    if (result === null || result === undefined || result.length === 0) {
      const error = new CustomeError('No se encontraron detalles de permisos de usuario', 404);
      return next(error);
    } else {
      res.status(200).json({
        detallesPermisosUsuario: result
      });
    }
  }
    );

 
/**
 * @abstract Función que permite eliminar un detalle de permiso de usuario
 * @param {*} req => Request
 * @param {*} res => Response
 * @param {*} next => Next
 * @returns true si se elimina correctamente, false si no se elimina
 */

const eliminarDetallePermisoUsuario = asyncError(async (req, res, next) => {
    const result = await controlDetallePermisoUsuario.eliminarDetallePermisoUsuario(req.params.id);
    if (result === false) {
      const error = new CustomeError('Error al eliminar el detalle de permiso de usuario', 400);
      return next(error);
    } else {
      res.status(200).json({
        message: 'Detalle de permiso de usuario eliminado correctamente'
      });
    }
  }
    );


/**
 * @abstract Función que permite obtener un detalle de permiso de usuario por su id
 * @param {*} req => Request
 * @param {*} res => Response
 * @param {*} next => Next
 * @returns detalle de permiso de usuario si se obtiene correctamente, null si no se obtiene
 */

const obtenerDetallePermisoUsuarioPorId = asyncError(async (req, res, next) => {
    const result = await controlDetallePermisoUsuario.obtenerDetallePermisoUsuarioPorId(req.params.id);
    if (result === null || result === undefined) {
      const error = new CustomeError('No se encontró el detalle de permiso de usuario', 404);
      return next(error);
    } else {
      res.status(200).json({
        detallePermisoUsuario: result
      });
    }
  }


    );


/**
 * @abstract Función que permite actualizar un detalle de permiso de usuario
 * @param {*} req => Request
 * @param {*} res => Response
 * @param {*} next => Next
 * @returns detalle de permiso de usuario si se actualiza correctamente, false si no se actualiza
 */

const actualizarDetallePermisoUsuario = asyncError(async (req, res, next) => {
    const result = await controlDetallePermisoUsuario.actualizarDetallePermisoUsuario(req.body);
    if (result === false) {
      const error = new CustomeError('Error al actualizar el detalle de permiso de usuario', 400);
      return next(error);
    } else {
      res.status(200).json({
        detallePermisoUsuario: req.body
      });
    }
  }
    );




//Module exports
module.exports = {
  agregarDetallePermisoUsuario,
  obtenerDetallesPermisosUsuario,
  eliminarDetallePermisoUsuario,
  obtenerDetallePermisoUsuarioPorId,
  actualizarDetallePermisoUsuario
};