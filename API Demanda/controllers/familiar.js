

const FamiliarDAO = require('../data-access/familiarDAO')


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

const obtenerFamiliares = async (req, res) => {
    try {
        const familiars = await FamiliarDAO.obtenerFamiliars()
        if (familiars === null || familiars === undefined || familiars.length === 0) {
            res.status(404).json({
                message: 'No hay familiares registrados'
            })
        }
        else {
            res.status(200).json(familiars)
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

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


const obtenerFamiliarPorPromovente = async (req, res) => {
    try {
        const { id } = req.params
        const familiar = await FamiliarDAO.obtenerFamiliarPorPromovente(Number(id))
        res.json(familiar)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}



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


const eliminarFamiliar = async (req, res) => {
    try {
        const { id } = req.params
        const familiar = await FamiliarDAO.eliminarFamiliar(Number(id))
        if (familiar) {
            res.status(200).json({
                message: 'Familiar eliminado'
            })
        }
        else {
            res.status(404).json({
                message: 'Familiar no eliminado'
            })
        }
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}



module.exports = {
    crearFamiliar,
    obtenerFamiliares,
    obtenerFamiliar,
    obtenerFamiliarPorPromovente,
    actualizarFamiliar,
    eliminarFamiliar
}





