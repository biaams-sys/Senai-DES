const express = require("express");
const router = express.Router();

const imagemController = require("../controllers/imagem.controller");

router.post("/cadastrar", imagemController.cadastrarImagem);
router.get("/listar", imagemController.listarImagem);
router.get("/buscar/:id", imagemController.buscarImagem);
router.get("/perfume/:id", imagemController.buscarImgPerfume);
router.put("/atualizar/:id", imagemController.atualizarImagem);
router.delete("/excluir/:id", imagemController.excluirImg);

module.exports = router;0