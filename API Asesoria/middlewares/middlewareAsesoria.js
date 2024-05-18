const controlAsesorias = require('../controles/controlAsesoria.js');

async function existeAsesoria(req, res, next) {

}


async function validarPeticionPaginacion(req, res, next) {

}


async function validarPeticionBuscarNombre(req, res, next) {

}



async function validarPeticionDescargarExcel(req, res, next) {

}

async function validarPeticionPOST(req, res, next) {

}

async function validarPeticionPUT(req, res, next) {


}

async function validarFiltros(req, res, next) {
  const filtrosPeticion = req.query.filtros;
  const filtros = JSON.parse(filtrosPeticion);
 const filtroKeys = Object.keys(filtros);
 if (filtroKeys.length === 0) {
   return res.status(400).json({ message: "El arreglo de filtros no debe estar vacío." });
 }
 if (filtroKeys.length > 8) {
   return res.status(400).json({ message: "El arreglo de filtros no debe tener más de 8 elementos." });
 }

 const clavesEsperadas = ['fecha-inicio', 'fecha-final', 'id_defensor', 'id_municipio', 'id_zona', 'id_asesor', 'fecha_registro', 'id_distrito_judicial'];
 const clavesInvalidas = filtroKeys.filter(key => !clavesEsperadas.includes(key));
 if (clavesInvalidas.length > 0) {
   return res.status(400).json({ message: `Las siguientes claves no son válidas: ${clavesInvalidas.join(', ')}` });
 }
  
  
 //Verifica que no exitan mas dar


 next();
}



module.exports = {
  existeAsesoria,
  validarPeticionPaginacion,
  validarPeticionBuscarNombre,
  validarPeticionDescargarExcel,
  validarPeticionPOST,
  validarFiltros,
  validarPeticionPUT,
};

