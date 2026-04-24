const express = require("express");
const router = express.Router();

const imagemController = require("../controllers/imagem.controller");
const upload = require("../middlewares/uploadImg");
router.post("/:id", upload.single("imagem"), imagemController.uploadImg);
router.get("/perfume/:id", imagemController.buscarImgPerfume);
router.delete("/:id", imagemController.excluirImg);

module.exports = router;