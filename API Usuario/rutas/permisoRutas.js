

//Creamos un nuevo servicio de detalle de permiso de usuario
const express = require('express');

//Importamos el servicio de detalle de permiso de usuario
const servicioDetallePermisoUsuarios = require('../servicios/servicioDetallePermisoUsuarios');

//Creamos un nuevo router
const router = express.Router();

//Definimos las rutas y los controladores para cada una
router.route('/').
    //Obtener todos los detalles de permisos de usuario
    get(servicioDetallePermisoUsuarios.obtenerDetallesPermisosUsuario).
    //Agregar un nuevo detalle de permiso de usuario
    post(servicioDetallePermisoUsuarios.agregarDetallePermisoUsuario);

//Definimos las rutas y los controladores para cada una
router.route('/:id').
    //Obtener un detalle de permiso de usuario por su ID
    get(servicioDetallePermisoUsuarios.obtenerDetallePermisoUsuarioPorId).
    //Eliminar un detalle de permiso de usuario por su ID
//    delete(servicioDetallePermisoUsuarios.actualizarDetallePermisoUsuario).
    //Actualizar un detalle de permiso de usuario por su ID
    put(servicioDetallePermisoUsuarios.actualizarDetallePermisoUsuario)
    ;
    

module.exports = router;
