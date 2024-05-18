const procesoJudicial = require('../data-access/proceso_judicialDAO.js');

async function existeProcesoJudicial(req, res, next) {
}

async function validarPeticionTramite(req, res, next) {
}

async function validarPeticionDefensor(req, res, next) {
}


async function validarJSONProcesoJudicialPOST(req, res, next) {
}


async function validarJSONProcesoJudicialPUT(req, res, next) {
}

module.exports = {
    existeProcesoJudicial,
    validarJSONProcesoJudicialPOST,
    validarJSONProcesoJudicialPUT,
    validarPeticionTramite,
    validarPeticionDefensor
}