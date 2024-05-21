
const express = require('express');
const servicioAsesorias = require('../servicios/servicioAsesorias');

const router = express.Router();

 
const { validarPeticionPOST, 
  validarPeticionPUT, validarPeticionPaginacion,
  validarPeticionBuscarNombre, 
  validarFiltros,validarPaginaFiltro,
   validarPeticionDescargarExcel } = require('../middlewares/middlewareAsesoria');


 router.route('/paginacion')  //
.get(
  validarPeticionPaginacion,
  servicioAsesorias.obtenerAsesoriasPagina);

//Listp
router.route('/paginacion-filtro') //
.get(
  validarPaginaFiltro,
  validarFiltros, 
  servicioAsesorias.obtenerAsesoriasPaginaFiltro);
 
router.route('/buscar') //
  .get(
     validarPeticionBuscarNombre,
    servicioAsesorias.obtenerAsesoriaNombre);
  router.route('/total-asesorias') //
  .get(servicioAsesorias.obtenerAsesoriaTotal);

  router.route('/total-asesorias-filtro'). //
   //Listo
  get(
    validarFiltros,
    servicioAsesorias.obtenerAsesoriaFiltroTotal);
  
  
    router.route('/filtro') //
    //Listo
  .get(
    validarFiltros,
    servicioAsesorias.obtenerAsesoriaFiltro);


   //Si requeirdo
  router.route('/descargar-excel') //
  .get(
    validarPeticionDescargarExcel,
    servicioAsesorias.obtenerAsesoriaFiltroExcel);
router.route('/')
//Si requerido
  .post(
     validarPeticionPOST,
    servicioAsesorias.agregarAsesoria); //
router.route('/:id')
//No requerido
  .get(servicioAsesorias.obtenerAsesoriaPorId)
   // Si requerido
  .put(
    validarPeticionPUT,
    servicioAsesorias.actualizarAsesoria) //
;
module.exports = router;
 
