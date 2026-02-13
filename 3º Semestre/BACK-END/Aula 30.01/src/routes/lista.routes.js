const express = require("express");

const router = express.Router();

const listaController = require("../controllers/lista.controller");

router.get("/listar", listaController.listarItens);

module.exports = router;