const express = require("express");
const router = express.Router();

const marcaController = require("../controllers/marca.controller");

router.post("/cadastrar", marcaController.cadastrarMarca);
router.get("/listar", marcaController.listarMarca);
router.get("/buscar/:id", marcaController.buscarMarca);
router.put("/atualizar/:id", marcaController.atualizarMarca);
router.delete("/excluir/:id", marcaController.excluirMarca);

module.exports = router;