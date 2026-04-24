const express = require("express");
const router = express.Router();

const categoriaController = require("../controllers/categoria.controller");

router.post("/cadastrar", categoriaController.cadastrarCategoria);
router.get("/listar", categoriaController.listarCategoria);
router.get("/buscar/:id", categoriaController.buscarCategoria);
router.put("/atualizar/:id", categoriaController.atualizarCategoria);
router.delete("/excluir/:id", categoriaController.excluirCategoria);

module.exports = router;