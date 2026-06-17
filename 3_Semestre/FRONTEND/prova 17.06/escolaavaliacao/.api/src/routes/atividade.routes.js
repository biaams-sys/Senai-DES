const express = require("express");
const router = express.Router();

const atividadeController = require("../controllers/atividade.controller");

router.post("/cadastrar", atividadeController.cadastrarAtividade);
router.get("/listar", atividadeController.listarAtividades);
router.delete("/excluir/:id", atividadeController.excluirAtividade);
router.put("/atualizar/:id", atividadeController.atualizarAtividade);

module.exports = router;