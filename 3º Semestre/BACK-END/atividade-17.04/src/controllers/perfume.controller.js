const prisma = require("../data/prisma");

const cadastrarPerfume = async (req, res) => {
  try {
    const { nome, preco, categoriaId, marcaId } = req.body;

    const perfume = await prisma.perfume.create({
      data: {
        nome,
        preco,
        categoriaId: parseInt(categoriaId),
        marcaId: parseInt(marcaId)
      }
    });

    res.status(201).json(perfume);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar perfume" });
  }
};

const listarPerfume = async (req, res) => {
  try {
    const perfumes = await prisma.perfume.findMany({
      include: {
        categoria: true,
        marca: true,
        imagens: true
      }
    });

    res.json(perfumes);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar perfumes" });
  }
};

const buscarPerfume = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const perfume = await prisma.perfume.findUnique({
      where: { id },
      include: {
        categoria: true,
        marca: true,
        imagens: true
      }
    });

    if (!perfume) {
      return res.status(404).json({ error: "Perfume não encontrado" });
    }

    res.json(perfume);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar perfume" });
  }
};

const atualizarPerfume = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nome, preco, categoriaId, marcaId } = req.body;

    const perfume = await prisma.perfume.update({
      where: { id },
      data: {
        nome,
        preco,
        categoriaId: parseInt(categoriaId),
        marcaId: parseInt(marcaId)
      }
    });

    res.json(perfume);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar perfume" });
  }
};

const excluirPerfume = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await prisma.perfume.delete({
      where: { id }
    });

    res.json({ message: "Perfume excluído com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir perfume" });
  }
};

module.exports = {
  cadastrarPerfume,
  listarPerfume,
  buscarPerfume,
  atualizarPerfume,
  excluirPerfume
};