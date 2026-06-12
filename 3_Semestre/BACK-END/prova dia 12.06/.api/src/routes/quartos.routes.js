const express = require("express");
const router = express.Router();

const quartoController = require("../controllers/quartos.controllers");

router.post("/cadastrar", quartoController.cadastrarQuarto);
router.get("/listar", quartoController.listarQuartos);
router.delete("/excluir/:id", quartoController.excluirQuarto);

module.exports = router;