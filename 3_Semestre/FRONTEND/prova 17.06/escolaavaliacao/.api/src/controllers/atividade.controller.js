const prisma = require("../data/prisma");

const cadastrarAtividade = async (req, res) => {
    try {
        const { descricao, turma_id } = req.body;
        const item = await prisma.atividade.create({
            data: { descricao, turma_id: Number(turma_id) },
        });
        res.json(item).status(201).end();
    } catch (error) {
        res.status(500).json({ error: "Erro ao cadastrar atividade" });
    }
};

const listarAtividades = async (req, res) => {
    try {
        const { turma_id } = req.query;
        const lista = await prisma.atividade.findMany({
            where: { turma_id: Number(turma_id) },
            include: {
                turma: { select: { nome: true } }
            }
        });
        res.json(lista).status(200).end();
    } catch (error) {
        res.status(500).json({ error: "Erro ao listar atividades" });
    }
};

// ADICIONADO: Excluir atividade para fechar o CRUD
const excluirAtividade = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await prisma.atividade.delete({
            where: { id: Number(id) },
        });
        res.json(item).status(200).end();
    } catch (error) {
        res.status(500).json({ error: "Erro ao excluir atividade" });
    }
};
const atualizarAtividade = async (req, res) => {
    try {
        const { id } = req.params;
        const { descricao, turma_id } = req.body;

        const item = await prisma.atividade.update({
            where: { id: Number(id) },
            data: {
                descricao,
                turma_id: turma_id ? Number(turma_id) : undefined
            }
        });
        res.json(item).status(200).end();
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar atividade" });
    }
};

module.exports = {
    cadastrarAtividade,
    listarAtividades,
    excluirAtividade,
    atualizarAtividade
};