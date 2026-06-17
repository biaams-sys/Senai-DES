const prisma = require("../data/prisma");

const cadastrarTurma = async (req, res) => {
    try {
        const { nome, professor_id } = req.body;
        const item = await prisma.turma.create({
            data: { nome, professor_id: Number(professor_id) },
        });
        res.json(item).status(201).end();
    } catch (error) {
        res.status(500).json({ error: "Erro ao cadastrar turma" });
    }
};

const listarTurmas = async (req, res) => {
    try {
        const { professor_id } = req.query;
        const lista = await prisma.turma.findMany({
            where: { professor_id: Number(professor_id) }
        });
        res.json(lista).status(200).end();
    } catch (error) {
        res.status(500).json({ error: "Erro ao listar turmas" });
    }
};

const excluirTurma = async (req, res) => {
    try {
        const { id } = req.params;

        const atividadeVinculada = await prisma.atividade.findFirst({
            where: { turma_id: Number(id) }
        });

        if (atividadeVinculada) {
            return res.status(400).json({ 
                error: "Você não pode excluir uma turma com atividades cadastradas" 
            });
        }

        const item = await prisma.turma.delete({
            where: { id: Number(id) },
        });
        res.json(item).status(200).end();
    } catch (error) {
        res.status(500).json({ error: "Erro ao excluir turma" });
    }
};

const atualizarTurma = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, professor_id } = req.body;

        const item = await prisma.turma.update({
            where: { id: Number(id) },
            data: {
                nome,
                professor_id: professor_id ? Number(professor_id) : undefined
            }
        });
        res.json(item).status(200).end();
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar turma" });
    }
};

module.exports = {
    cadastrarTurma,
    listarTurmas,
    excluirTurma,
    atualizarTurma
};