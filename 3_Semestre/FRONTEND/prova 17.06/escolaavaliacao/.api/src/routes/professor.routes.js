const express = require("express");
const router = express.Router();

const professorController = require("../controllers/professor.controller");

router.post("/login", professorController.loginProfessor);
router.post("/cadastrar", professorController.cadastrarProfessor);
router.get("/listar", professorController.listarProfessores);
router.delete("/excluir/:id", professorController.excluirProfessor);
router.put("/atualizar/:id", professorController.atualizarProfessor);

module.exports = router;