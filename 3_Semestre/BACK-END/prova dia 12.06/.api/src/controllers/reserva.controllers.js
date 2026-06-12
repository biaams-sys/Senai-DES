const prisma = require("../data/prisma");

const cadastrarReserva = async (req, res) => {
    try {
        const { hospede, data_entrada, data_saida, quarto_id } = req.body;

        const item = await prisma.reserva.create({
            data: {
                hospede,
                data_entrada: new Date(data_entrada),
                data_saida: new Date(data_saida),
                quarto_id: Number(quarto_id)
            },
        });

        res.json(item).status(201).end();
    } catch (error) {
        res.status(500).json({ error: "Erro ao cadastrar reserva" });
    }
};

const listarReservasPorQuarto = async (req, res) => {
    try {
        const quarto_id = parseInt(req.params.quarto_id);

        const lista = await prisma.reserva.findMany({
            where: { quarto_id }
        });

        res.json(lista).status(200).end();
    } catch (error) {
        res.status(500).json({ error: "Erro ao listar reservas do quarto" });
    }
};

const excluirReserva = async (req, res) => {
    try {
        const { id } = req.params;

        const item = await prisma.reserva.delete({
            where: { id: Number(id) },
        });

        res.json(item).status(200).end();
    } catch (error) {
        res.status(500).json({ error: "Erro ao excluir reserva" });
    }
};

const listarTodasReservas = async (req, res) => {
    try {
        const lista = await prisma.reserva.findMany();
        res.json(lista).status(200).end();
    } catch (error) {
        res.status(500).json({ error: "Erro ao listar todas as reservas" });
    }
};

module.exports = {
    cadastrarReserva,
    listarReservasPorQuarto,
    excluirReserva,
    listarTodasReservas
};