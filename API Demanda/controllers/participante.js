const participanteDAO = require('../data-access/participanteDAO')

/**
 * @abstract Método que permite actualizar un participante
 * @param {number} id - ID del participante a actualizar
 * @param {object} data - Datos del participante a actualizar
 * @returns {object} Retorna el objeto del participante actualizado si la operación fue exitosa, de lo contrario lanza un error
 */
const crearParticipante = async (req, res) => {
  try {
    /**
             "nombre": "Judith",
            "apellido_paterno": "Orozco",
            "apellido_materno": "Hernandez",
            "edad": 34,
            "telefono": "2323233434",
            "id_genero": 2,
            "id_proceso_judicial": 1
     */
    const { nombre, apellido_paterno, apellido_materno, edad, telefono, id_genero, id_proceso_judicial } = req.body
    const participante = await participanteDAO.crearParticipante({
      nombre,
      apellido_paterno,
      apellido_materno,
      edad,
      telefono,
      id_genero,
      id_proceso_judicial
    })
    res.json(participante)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

/**
 * @abstract Método que permite obtener todos los participantes
 * @returns {array} Retorna un arreglo de objetos de participantes si la operación fue exitosa, de lo contrario lanza un error
 */
const obtenerParticipantes = async (req, res) => {
  try {
    const participantes = await participanteDAO.obtenerParticipantes()
    if (participantes === null || participantes.length === 0) {
      res.json({
        message: "No hay participantes registrados"
      })
    }
    else {
      res.status(200).json(participantes)
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

/**
 * @abstract Método que permite obtener un participante por su id
 * @param {number} id - ID del participante a obtener
 * @returns {object} Retorna el objeto del participante si la operación fue exitosa, de lo contrario lanza un error
 */
const obtenerParticipante = async (req, res) => {
  try {
    const { id } = req.params
    const participante = await participanteDAO.obtenerParticipante(Number(id))
    if (participante === null) {
      res.json({
        message: "No se encontró el participante"
      })
    }
    else {
      res.status(200).json(participante)
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

/**
 * @abstract Método que permite actualizar un participante
 * @param {object} participante - Objeto que contiene los datos del participante
 * @returns {object} Retorna el objeto del participante actualizado si la operación fue exitosa, de lo contrario lanza un error
 */
const actualizarParticipante = async (req, res) => {
  try {
    const { id } = req.params
    const { nombre, apellido_paterno, apellido_materno, edad, telefono, id_genero, id_proceso_judicial } = req.body
    const result = await participanteDAO.actualizarParticipante(Number(id), {
      nombre,
      apellido_paterno,
      apellido_materno,
      edad,
      telefono,
      id_genero,
      id_proceso_judicial
    })
    if (result) {
      const actualizado = await participanteDAO.obtenerParticipante(Number(id))
      res.status(200).json(actualizado)
    }
    else {
      res.json({
        message: "No se actualizó el participante, datos iguales"
      })
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

/**
 * @abstract Método que permite eliminar un participante
 * @param {number} id - ID del participante a eliminar
 * @returns {object} Retorna el objeto del participante eliminado si la operación fue exitosa, de lo contrario lanza un error
 */
const eliminarParticipante = async (req, res) => {
  try {
    const { id } = req.params
    const participante = await participanteDAO.eliminarParticipante(Number(id))
    if (participante) {
      res.json({
        message: "Participante eliminado"
      })
    }
    else {
      res.json({
        message: "No se eliminó el participante"
      })
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

module.exports = {
  crearParticipante,
  obtenerParticipantes,
  obtenerParticipante,
  actualizarParticipante,
  eliminarParticipante
}
