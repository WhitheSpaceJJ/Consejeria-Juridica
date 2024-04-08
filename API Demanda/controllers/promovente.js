const promoventeDAO = require('../data-access/promoventeDAO')


/**
 * @abstract Método que permite crear un promovente
 * @param {object} promovente - Objeto que contiene los datos del promovente
 * @returns {object} Retorna el objeto del promovente creado si la operación fue exitosa, de lo contrario lanza un error
 */
const crearPromovente = async (req, res) => {
  try {
    /**
        "id_promovente": 1,
        "espanol": 0,
        "id_escolaridad": 1,
        "id_etnia": 1,
        "id_ocupacion": 1
     */
    const { id_promovente, espanol, id_escolaridad, id_etnia, id_ocupacion } = req.body
    const promovente = await promoventeDAO.crearPromovente({
      id_promovente, espanol, id_escolaridad, id_etnia, id_ocupacion
    })
 
    res.status(201).json(promovente)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

/**
 * @abstract Método que permite obtener todos los promoventes
 * @returns {array} Retorna un arreglo de objetos de promoventes si la operación fue exitosa, de lo contrario lanza un error
 */
const obtenerPromoventes = async (req, res) => {
  try {
    const promoventes = await promoventeDAO.obtenerPromoventes()
     if(promoventes === null || promoventes.length === 0){
       res.status(404).json({ message: 'No se encontraron promoventes' })
      } else{
    
        res.status(200).json(promoventes)
      }

  } catch (error) {
    res.status(500).json({
      message:error.message
    })
  }
}

/**
 * @abstract Método que permite obtener un promovente por su id
 * @param {number} id - ID del promovente a obtener
 * @returns {object} Retorna el objeto del promovente si la operación fue exitosa, de lo contrario lanza un error
 */
const obtenerPromovente = async (req, res) => {
  try {
    const { id } = req.params
    const promovente = await promoventeDAO.obtenerPromovente(Number(id))
     if( promovente === null){
       res.status(404).json({ message: 'No se encontró el promovente' })
      }
      else{
       
        res.status(200).json(promovente)
      }
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

/**
 * @abstract Método que permite actualizar un promovente
 * @param {object} promovente - Objeto que contiene los datos del promovente
 * @returns {object} Retorna el objeto del promovente actualizado si la operación fue exitosa, de lo contrario lanza un error
 */
const actualizarPromovente = async (req, res) => {
  try {
    const { id } = req.params

    const { id_promovente, espanol, id_escolaridad, id_etnia, id_ocupacion } = req.body
    const result=  await promoventeDAO.actualizarPromovente(Number(id), {
      id_promovente, espanol, id_escolaridad, id_etnia, id_ocupacion
    })
    if(result){
      const actualizado = await promoventeDAO.obtenerPromovente(Number(id))
      res.status(200).json(actualizado)
    }
    else{
      res.status(404).json({ message: 'No se encontró el promovente, datos iguales' })
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

/**
 * @abstract Método que permite eliminar un promovente
 * @param {number} id - ID del promovente a eliminar
 * @returns {object} Retorna el objeto del promovente eliminado si la operación fue exitosa, de lo contrario lanza un error
 */
const eliminarPromovente = async (req, res) => {
  try {
    const { id } = req.params
    const promovente = await promoventeDAO.eliminarPromovente(Number(id))
    if(promovente){
      res.status(200).json({ message: 'Promovente eliminado con éxito' })
    }
    else{
      res.status(404).json({ message: 'No se encontró el promovente' })
    }
  } catch (error) {
    res.status(500).json({
      message:error.message
    })
  }
}

module.exports = {
  crearPromovente,
  obtenerPromoventes,
  obtenerPromovente,
  actualizarPromovente,
  eliminarPromovente
}
