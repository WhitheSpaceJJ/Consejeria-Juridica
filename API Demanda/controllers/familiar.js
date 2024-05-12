

const FamiliarDAO = require('../data-access/familiarDAO')
const promoventeDAO = require('../data-access/promoventeDAO')
 
/**
 * Función que permite crear un familiar
 * @param {Object} req Objeto de petición
 * @param {Object} res Objeto de respuesta
 * @returns {Object} Objeto con el familiar creado
 * */


const crearFamiliar = async (req, res) => {
    try {
        const { id_promovente, nombre, nacionalidad, parentesco, perteneceComunidadLGBT, adultaMayor, saludPrecaria, pobrezaExtrema } = req.body
        const familiar = await FamiliarDAO.crearFamiliar({
            id_promovente,
            nombre,
            nacionalidad,
            parentesco,
            perteneceComunidadLGBT,
            adultaMayor,
            saludPrecaria,
            pobrezaExtrema
        })
        res.json(familiar)
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}


/**
 * Función que permite obtener un familiar por su id
 * @param {Object} req Objeto de petición
 * @param {Object} res Objeto de respuesta
 * @returns {Object} Objeto con el familiar encontrado
 * */


const obtenerFamiliar = async (req, res) => {
    try {
        const { id } = req.params
        const familiar = await FamiliarDAO.obtenerFamiliar(Number(id))
        if (familiar === null || familiar === undefined) {
            res.status(404).json({
                message: 'Familiar no encontrado'
            })
        }
        else {
            res.status(200).json(familiar)
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

/**
 * Función que permite actualizar un familiar
 * @param {Object} req Objeto de petición
 * @param {Object} res Objeto de respuesta
 * @returns {Object} Objeto con el familiar actualizado
 * */



const actualizarFamiliar = async (req, res) => {
    try {
        const { id } = req.params
        const { id_promovente, nombre, nacionalidad, parentesco, perteneceComunidadLGBT, adultaMayor, saludPrecaria, pobrezaExtrema } = req.body
        const result= await FamiliarDAO.actualizarFamiliar(Number(id), {
            id_promovente,
            nombre,
            nacionalidad,
            parentesco,
            perteneceComunidadLGBT,
            adultaMayor,
            saludPrecaria,
            pobrezaExtrema
        })
    
        if (result) {
            res.status(200).json({
                message: 'Familiar actualizado'
            })
        }
        else {
            res.status(404).json({
                message: 'Familiar no actualizado,datos iguales'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const obtenerFamiliaresPorPromovente = async (req, res) => {
    try {
        const { id } = req.params
        const familiares = await FamiliarDAO.obtenerFamiliarPorPromovente(Number(id))
        if (familiares === null || familiares === undefined || familiares.length === 0) {
            res.status(404).json({
                message: 'Familiares no encontrados'
            })
        }
        else {
            res.status(200).json(familiares)
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

/**
 * Exporta todos los módulos
 * */


module.exports = {
    crearFamiliar,
    obtenerFamiliar,
    actualizarFamiliar,
    obtenerFamiliaresPorPromovente
}





