const prisma = require("../data/prisma");
const fs = require("fs");

const uploadImg = async (req, res) => {
  try {
    const perfumeId = parseInt(req.params.id);
    const arquivo = req.file;

    if (!arquivo) {
      return res.status(400).json({ error: "Nenhuma imagem enviada" });
    }

    const imagem = await prisma.imagem.create({
      data: {
        nomeOriginal: arquivo.originalname,
        nomeArquivo: arquivo.filename,
        mimeType: arquivo.mimetype,
        path: arquivo.path,
        perfumeId: perfumeId
      }
    });

    res.status(201).json(imagem);
  } catch (error) {
    res.status(500).json({ error: "Erro ao fazer upload da imagem" });
  }
};

const buscarImgPerfume = async (req, res) => {
  try {
    const perfumeId = parseInt(req.params.id);

    const imagens = await prisma.imagem.findMany({
      where: {
        perfumeId: perfumeId
      }
    });

    res.json(imagens);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar imagens" });
  }
};


const excluirImg = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const imagem = await prisma.imagem.findUnique({
      where: { id }
    });

    if (!imagem) {
      return res.status(404).json({ error: "Imagem não encontrada" });
    }

    await prisma.imagem.delete({
      where: { id }
    });

    if (fs.existsSync(imagem.path)) {
      fs.unlinkSync(imagem.path);
    }

    res.json({ message: "Imagem deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar imagem" });
  }
};

module.exports = {
  uploadImg,
  buscarImgPerfume,
  excluirImg
};