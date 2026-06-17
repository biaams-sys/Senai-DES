const express = require("express");
const router = express.Router();

const turmaController = require("../controllers/turma.controller");

router.post("/cadastrar", turmaController.cadastrarTurma);
router.get("/listar", turmaController.listarTurmas);
router.delete("/excluir/:id", turmaController.excluirTurma);
router.put("/atualizar/:id", turmaController.atualizarTurma);

module.exports = router;