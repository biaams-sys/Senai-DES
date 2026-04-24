const prisma = require("../data/prisma");

const cadastrarImagem = async (req, res) => {
  try {
    const { url, perfumeId } = req.body;

    const imagem = await prisma.imagem.create({
      data: {
        url,
        perfumeId: parseInt(perfumeId)
      }
    });

    res.status(201).json(imagem);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const listarImagem = async (req, res) => {
  try {
    const imagens = await prisma.imagem.findMany({
      include: {
        perfume: true
      }
    });

    res.json(imagens);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar imagens" });
  }
};

const buscarImagem = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const imagem = await prisma.imagem.findUnique({
      where: { id }
    });

    if (!imagem) {
      return res.status(404).json({ error: "Imagem não encontrada" });
    }

    res.json(imagem);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar imagem" });
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

const atualizarImagem = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { url } = req.body;

    const imagem = await prisma.imagem.update({
      where: { id },
      data: { url }
    });

    res.json(imagem);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar imagem" });
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

    res.json({ message: "Imagem deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar imagem" });
  }
};

module.exports = {
  cadastrarImagem,
  listarImagem,
  buscarImagem,
  buscarImgPerfume,
  atualizarImagem,
  excluirImg
};