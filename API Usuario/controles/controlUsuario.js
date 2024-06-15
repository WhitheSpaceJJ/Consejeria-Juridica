const modelUsuario = require("../modelos/modeloUsuario");
const bcrypt = require('bcrypt');
const controlDetallePermisos = require("../controles/controlDetallePermisoUsuario.js");
const controlPermisos = require("../controles/controlPermisos.js");

/**
 * @description Función que permite obtener todos los usuarios
 * @returns {Array} Array con todos los usuarios registrados en la base de datos, si no hay usuarios retorna un null
 * */
const obtenerUsuarios = async () => {
  try {
    const usuarios_pre = await modelUsuario.Usuario.findAll({
      attributes: {
        exclude: ['id_tipouser',
          'password'
        ],
      },
      raw: false,
      nest: true,
      include: [
        { model: modelUsuario.TipoUser },

      ]
    });
    const usuarios = JSON.parse(JSON.stringify(usuarios_pre));
    if (usuarios !== null && usuarios !== undefined && usuarios.length > 0) {
      for (let i = 0; i < usuarios.length; i++) {
        const permisos = await controlDetallePermisos.obtenerPermisosUsuario(usuarios[i].id_usuario);
        usuarios[i].permisos = await obtenerPermisosUsuaris(permisos);
      }
      return usuarios;
    }
    return null;
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};

/**
 * @description Función que permite obtener un usuario por su id
 * @param {Number} id Id del usuario a buscar
 * @returns {Object} Objeto con el usuario encontrado, si no hay usuarios retorna un null
 * */
const obtenerUsuarioPorId = async (id) => {
  try {
    const uusuario_pre = await modelUsuario.Usuario.findByPk(id, {
      attributes: {
        exclude: ['id_tipouser',
          'password'
        ],
      },
      raw: true,
      nest: true,
      include: [
        { model: modelUsuario.TipoUser },

      ]
    });
    const usuario = JSON.parse(JSON.stringify(uusuario_pre));
    if (usuario !== null && usuario !== undefined) {
      const permisos = await controlDetallePermisos.obtenerPermisosUsuario(usuario.id_usuario);
      usuario.permisos = await obtenerPermisosUsuaris(permisos);
      return usuario;
    }
    return null;
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};

/**
 * @description Función que permite obtener un usuario por su correo y contraseña
 * @param {String} correo Correo del usuario a buscar
 * @param {String} password Contraseña del usuario a buscar
 * @returns {Object} Objeto con el usuario encontrado, o null si la constraseña no es válida o no se encuentra el usuario 
 *  */
const obtenerUsuarioCorreoPassword = async (correo, password) => {
  try {
    const usuario = await modelUsuario.Usuario.findOne({
      attributes: {
      },
      raw: true,
      nest: true,
      where: {
        correo: correo
      },
      include: [
        { model: modelUsuario.TipoUser },

      ],
    });


    if (!usuario) {
      return null;
    }
    const esContraseñaValida = await bcrypt.compare(password, usuario.password);
    if (esContraseñaValida) {
      //Obtener Permisos
      const permisos = await controlDetallePermisos.obtenerPermisosUsuario(usuario.id_usuario);
      usuario.permisos = await obtenerPermisosUsuaris(permisos);
      return usuario;
    } else {
      return null;
    }
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};

async function obtenerPermisosUsuaris(permisos) {
  let permisosUsuario = [];
  for (let i = 0; i < permisos.length; i++) {
    permisosUsuario.push(permisos[i].permiso.nombre_permiso);
  }
  return permisosUsuario;
}

/**
 * @description Función que permite obtener un usuario por su correo
 * @param {String} correo Correo del usuario a buscar
 * @returns {Object} Objeto con el usuario encontrado, o null si no se encuentra el usuario
 * */
const obtenerUsuarioCorreo = async (correo, password) => {
  try {
    const usuario = await modelUsuario.Usuario.findOne({
      attributes: {
        exclude: ['id_tipouser'],
      },
      raw: true,
      nest: true,
      where: {
        correo: correo
      },
      include: [
        { model: modelUsuario.TipoUser },
      ],
    });

    if (!usuario) {
      return null;
    } else {
      const permisos = await controlDetallePermisos.obtenerPermisosUsuario(usuario.id_usuario);
      usuario.permisos = await obtenerPermisosUsuaris(permisos);
      return usuario;
    }
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};


/**
 * 
 *  @description Función que permite agregar un usuario
 * @param {Object} usuario Objeto con la información del usuario a agregar
 * @returns {Boolean} el usuario si este se agrega correctamente, false si no se agrega
 */
const agregarUsuario = async (usuario) => {
  try {
    const hashedPassword = await bcrypt.hash(usuario.password, 10);
    delete usuario.password;
    usuario.password = hashedPassword;
    let permisosID = await controlPermisos.obtenerIDPermisos(usuario.permisos);
    const usuarioCreado = (await modelUsuario.Usuario.create(usuario, { raw: true, nest: true })).dataValues;
    if (permisosID !== null && permisosID !== undefined && permisosID.length > 0) {
      for (let i = 0; i < permisosID.length; i++) {
        const detallePermisoUsuario = {
          id_usuario: usuarioCreado.id_usuario,
          id_permiso: permisosID[i]
        };
        await controlDetallePermisos.crearDetallePermisoUsuario(detallePermisoUsuario);
      }
    }
    return usuarioCreado;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};



/**
 * @description Función que permite actualizar un usuario
 * @param {Object} usuario Objeto con la información del usuario a actualizar
 * @returns {Boolean} true si el usuario se actualiza correctamente, false si no se actualiza
 */

const actualizarUsuario = async (usuario) => {
  try {

    const result = await modelUsuario.Usuario.update(usuario, { where: { id_usuario: usuario.id_usuario } });

    const permisosID = await controlDetallePermisos.obtenerPermisosUsuario(usuario.id_usuario);
    let permisos = await obtenerPermisosUsuaris(permisosID);
    let permisosPeticion = usuario.permisos;

    let permisosEliminar = permisos.filter(x => !permisosPeticion.includes(x));
    let permisosAgregar = permisosPeticion.filter(x => !permisos.includes(x));

    let verifiicarCambiosPermisos = false;

    if (permisosEliminar !== null && permisosEliminar !== undefined && permisosEliminar.length > 0) {
      verifiicarCambiosPermisos = true;
      for (let i = 0; i < permisosEliminar.length; i++) {
        const id_permiso = await controlPermisos.obtenerIDPermiso(permisosEliminar[i]);
        await controlDetallePermisos.eliminarDetallePermisoUsuario(usuario.id_usuario, id_permiso);
      }
    }
    if (permisosAgregar !== null && permisosAgregar !== undefined && permisosAgregar.length > 0) {
      verifiicarCambiosPermisos = true;
      for (let i = 0; i < permisosAgregar.length; i++) {
        const id_permiso = await controlPermisos.obtenerIDPermiso(permisosAgregar[i]);
        const detallePermisoUsuario = {
          id_usuario: usuario.id_usuario,
          id_permiso: id_permiso
        };
        await controlDetallePermisos.crearDetallePermisoUsuario(detallePermisoUsuario);
      }
    }
    if (verifiicarCambiosPermisos) {
      return true;
    }

    return result[0] === 1;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};


const obtenerUsuarioByIDAndNameGrpc = async (id_usuario, usuario) => {
  try {
    const usuario_pre = await modelUsuario.Usuario.findOne({
      raw: false,
      nest: true,
      where: {
        id_usuario: id_usuario,
      },
    });
    if (!usuario_pre) {
      return null;
    }

    const nombre = usuario_pre.nombre;

    const nombreCompletoRegex = new RegExp(
      `${nombre}`
    );

    if (!nombreCompletoRegex.test(usuario)) {
      return null;
    } else {
      return usuario;
    }
  }
  catch (error) {
    console.log("Error:", error.message);
    return null;
  }


};


const obtenerUsuarioCorreoPasswordEncriptada = async (correo, password) => {
  try {
    const usuario = await modelUsuario.Usuario.findOne({
      attributes: {
      },
      raw: true,
      nest: true,
      where: {
        correo: correo
      },
      include: [
        { model: modelUsuario.TipoUser },

      ],
    });


    if (!usuario) {
      return null;
    }

    //$2b$10$rqM7e6nK76voSs2MZMkmJ.vvUw1F2Q6U/XlUgozRcEzVbq6bDifCi
    //$2b$10$rqM7e6nK76voSs2MZMkmJ.vvUw1F2Q6U/XlUgozRcEzVbq6bDifCi
    if (password === usuario.password) {
      //Obtener Permisos
      const permisos = await controlDetallePermisos.obtenerPermisosUsuario(usuario.id_usuario);
      usuario.permisos = await obtenerPermisosUsuaris(permisos);
      return usuario;
    } else {
      return null;
    }
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};
const { Op, literal } = require("sequelize");
const obtenerUsuariosBusqueda = async (correo, id_distrito_judicial, total, pagina) => {
  try {
    const limite = 10;
    const offset = (parseInt(pagina, 10) - 1) * limite;

    const whereClause = {};
    if (correo) whereClause.correo = { [Op.like]: `%${correo}%` };
    if (id_distrito_judicial) whereClause.id_distrito_judicial = id_distrito_judicial;

    if (total) {
      return await modelUsuario.Usuario.count({ where: whereClause });
    } else {
      const usuarios_pre = await modelUsuario.Usuario.findAll({
        attributes: { exclude: ['id_tipouser', 'password'] },
        raw: false,
        nest: true,
        include: [{ model: modelUsuario.TipoUser }],
        where: whereClause,
        limit: limite,
        offset: offset
      });
      
      const usuarios = JSON.parse(JSON.stringify(usuarios_pre));

      for (let usuario of usuarios) {
        const permisos = await controlDetallePermisos.obtenerPermisosUsuario(usuario.id_usuario);
        usuario.permisos = await obtenerPermisosUsuaris(permisos);
      }
      return usuarios;
    }
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  agregarUsuario,
  obtenerUsuarioCorreoPassword,
  obtenerUsuarioCorreo,
  obtenerUsuarioByIDAndNameGrpc,
  obtenerUsuarioCorreoPasswordEncriptada,
  obtenerUsuariosBusqueda
};
