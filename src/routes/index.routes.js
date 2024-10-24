const express = require("express");
const router = express.Router();
const controller = require('../controllers/index.controller');

// RUTAS DE LAS PAGINAS
router.get('/', controller.index)

router.get('/crearTaller', controller.crear)

router.get('/created', controller.creado)

router.get('/edited', controller.editado)

module.exports = router