const prisma = require("../data/prisma");

const cadastrarCategoria = async (req, res) => {
    const data = req.body;

    const item = await prisma.categoria.create({
        data,
    });

    res.json(item).status(201).end();
};

const listarCategoria = async (req, res) => {
    const lista = await prisma.categoria.findMany();

    res.json(lista).status(200).end();
};

const buscarCategoria = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const item = await prisma.categoria.findUnique({
      where: { id }
    });

    if (!item) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar categoria" });
  }
};

const atualizarCategoria = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nome } = req.body;

    const categoria = await prisma.categoria.update({
      where: { id },
      data: { nome }
    });

    res.json(categoria);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar categoria" });
  }
};

const excluirCategoria = async (req, res) => {
    const { id } = req.params;

    const item = await prisma.categoria.delete({
        where: { id: Number(id) },
    });

    res.json(item).status(200).end();
};

module.exports = {
    cadastrarCategoria,
    listarCategoria,
    buscarCategoria,
    atualizarCategoria,
    excluirCategoria
};4