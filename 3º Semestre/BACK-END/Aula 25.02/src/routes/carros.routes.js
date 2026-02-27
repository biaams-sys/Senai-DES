const express = require("express");
const router = express.Router();

const carrosController = require("../controllers/carros.controller");

router.get("/carros", carrosController.listarCarro);
router.get("/carros/buscar/:id", carrosController.buscarCarro);
router.post("/carro/cadastrar", carrosController.cadastrarCarro);
router.delete("/carro/excluir/:id", carrosController.excluirCarro);
router.put("/carro/atualizar/:id", carrosController.atualizarCarro);

module.exports = router;