const express = require("express");
const upload = require("../middleware/uploadImage");
const prisma = require("../data/prisma");

const router = express.Router();

router.post("/", upload, async (req, res) => {

  const { eventosID } = req.body;

  const imagem = await prisma.img.create({
    data:{
      nomeOriginal: req.file.originalname,
      nomeArquivo: req.file.filename,
      mimeType: req.file.mimetype,
      path: req.file.path,
      eventosID: Number(eventosID)
    }
  });

  res.status(200).json({
    mensagem: "Upload realizado com sucesso",
    imagem
  });

});

module.exports = router;