
const express = require('express');
const servicioTipoUsuario = require('../servicios/servicioTipoUsuario');


const router = express.Router();


router.route('/')
    .get(servicioTipoUsuario.obtenerTipoUsuarios);


module.exports = router;
