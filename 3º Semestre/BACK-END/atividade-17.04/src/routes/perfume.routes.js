const express = require("express");
const router = express.Router();

const perfumeController = require("../controllers/perfume.controller");

router.post("/cadastrar", perfumeController.cadastrarPerfume);
router.get("/listar", perfumeController.listarPerfume);
router.get("/buscar/:id", perfumeController.buscarPerfume);
router.put("/atualizar/:id", perfumeController.atualizarPerfume);
router.delete("/excluir/:id", perfumeController.excluirPerfume);

module.exports = router;