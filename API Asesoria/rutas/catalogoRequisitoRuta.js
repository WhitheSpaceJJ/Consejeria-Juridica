// Importamos los módulos necesarios
const express = require('express');
const servicioCatalogoRequisitos = require('../servicios/servicioCatalogoRequisitos');

const { validarJSONCatalogoRequisitosPOST, validarJSONCatalogoRequisitosPUT, existeCatalogoRequisitos } = require('../middlewares/middlewareCatalogoRequisitos');

// Creamos un nuevo router
const router = express.Router();

/** Operaciones Básicas */

router.route('/')
  // Obtener todos los requisitos del catálogo
  .get(servicioCatalogoRequisitos.obtenerCatalogoRequisitos)
  // Agregar un nuevo requisito al catálogo
  .post(
    validarJSONCatalogoRequisitosPOST,
    servicioCatalogoRequisitos.agregarCatalogoRequisito);

router.route('/:id')
  // Obtener un requisito del catálogo por su ID
  .get(servicioCatalogoRequisitos.obtenerCatalogoRequisitoPorId)
  // Actualizar un requisito del catálogo por su ID
  .put(
    existeCatalogoRequisitos,
    validarJSONCatalogoRequisitosPUT,
    servicioCatalogoRequisitos.actualizarCatalogoRequisito);


// Exportamos el router
module.exports = router;
