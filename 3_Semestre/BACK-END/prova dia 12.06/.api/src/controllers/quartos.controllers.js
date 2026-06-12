const prisma = require("../data/prisma");

const cadastrarQuarto = async (req, res) => {
    try {
        const data = req.body;

        const item = await prisma.quarto.create({
            data,
        });

        res.json(item).status(201).end();
    } catch (error) {
        res.status(500).json({ error: "Erro ao cadastrar quarto" });
    }
};

const listarQuartos = async (req, res) => {
    try {
        const lista = await prisma.quarto.findMany();

        res.json(lista).status(200).end();
    } catch (error) {
        res.status(500).json({ error: "Erro ao listar quartos" });
    }
};

const excluirQuarto = async (req, res) => {
    try {
        const { id } = req.params;

        const item = await prisma.quarto.delete({
            where: { id: Number(id) },
        });

        res.json(item).status(200).end();
    } catch (error) {
        res.status(500).json({ error: "Erro ao excluir quarto" });
    }
};

module.exports = {
    cadastrarQuarto,
    listarQuartos,
    excluirQuarto
};