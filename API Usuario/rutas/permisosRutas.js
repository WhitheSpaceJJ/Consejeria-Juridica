

const express = require('express');
const servicioPermisos = require('../servicios/servicioPermisos');

const router = express.Router();


router.route('/')
    .get(servicioPermisos.obtenerPermisos);

module.exports = router;