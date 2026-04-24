const prisma = require("../data/prisma");

const cadastrarMarca = async (req, res) => {
  try {
    const { nome } = req.body;

    const marca = await prisma.marca.create({
      data: {
        nome
      }
    });

    res.status(201).json(marca);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar marca" });
  }
};


const listarMarca = async (req, res) => {
  try {
    const marcas = await prisma.marca.findMany();

    res.json(marcas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar marcas" });
  }
};

const buscarMarca = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const marca = await prisma.marca.findUnique({
      where: { id }
    });

    if (!marca) {
      return res.status(404).json({ error: "Marca não encontrada" });
    }

    res.json(marca);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar marca" });
  }
};

const atualizarMarca = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nome } = req.body;

    const marca = await prisma.marca.update({
      where: { id },
      data: { nome }
    });

    res.json(marca);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar marca" });
  }
};

const excluirMarca = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const perfumes = await prisma.perfume.findMany({
      where: { marcaId: id }
    });

    if (perfumes.length > 0) {
      return res.status(400).json({
        error: "Não é possível excluir marca com perfumes vinculados"
      });
    }

    await prisma.marca.delete({
      where: { id }
    });

    res.json({ message: "Marca excluída com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir marca" });
  }
};

module.exports = {
  cadastrarMarca,
  listarMarca,
  buscarMarca,
  atualizarMarca,
  excluirMarca
};