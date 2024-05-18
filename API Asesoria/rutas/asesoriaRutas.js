
const express = require('express');
const servicioAsesorias = require('../servicios/servicioAsesorias');

const router = express.Router();

 
const { validarPeticionPOST, 
  validarPeticionPUT, validarPeticionPaginacion,
  validarPeticionBuscarNombre, 
  validarFiltros,
   validarPeticionDescargarExcel } = require('../middlewares/middlewareAsesoria');


 router.route('/paginacion')  //
.get(servicioAsesorias.obtenerAsesoriasPagina);

router.route('/paginacion-filtro') //
.get(
  validarFiltros,
  servicioAsesorias.obtenerAsesoriasPaginaFiltro);
 
router.route('/buscar') //
  .get(servicioAsesorias.obtenerAsesoriaNombre);
  router.route('/total-asesorias') //
  .get(servicioAsesorias.obtenerAsesoriaTotal);
  router.route('/total-asesorias-filtro'). //

  get(
    validarFiltros,
    servicioAsesorias.obtenerAsesoriaFiltroTotal);
  
  
    router.route('/filtro') //
  .get(
    validarFiltros,
    servicioAsesorias.obtenerAsesoriaFiltro);



  router.route('/descargar-excel') //
  .get(servicioAsesorias.obtenerAsesoriaFiltroExcel);
router.route('/')
  .post(servicioAsesorias.agregarAsesoria); //
router.route('/:id')
  .get(servicioAsesorias.obtenerAsesoriaPorId) //
  .put(servicioAsesorias.actualizarAsesoria) //
;
module.exports = router;
 
