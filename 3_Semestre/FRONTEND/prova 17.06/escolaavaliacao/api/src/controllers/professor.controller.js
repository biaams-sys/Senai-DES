const prisma = require("../data/prisma");

const loginProfessor = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const professor = await prisma.professor.findUnique({ where: { email } });

        if (!professor || professor.senha !== senha) {
            return res.status(401).json({ error: "E-mail ou senha inválidos" });
        }
        res.json({ id: professor.id, nome: professor.nome }).status(200).end();
    } catch (error) {
        res.status(500).json({ error: "Erro ao realizar login" });
    }
};

const cadastrarProfessor = async (req, res) => {
    try {
        const data = req.body;
        const item = await prisma.professor.create({ data });
        res.json(item).status(201).end();
    } catch (error) {
        res.status(500).json({ error: "Erro ao cadastrar professor" });
    }
};

const listarProfessores = async (req, res) => {
    try {
        const lista = await prisma.professor.findMany();
        res.json(lista).status(200).end();
    } catch (error) {
        res.status(500).json({ error: "Erro ao listar professores" });
    }
};

const excluirProfessor = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await prisma.professor.delete({
            where: { id: Number(id) },
        });
        res.json(item).status(200).end();
    } catch (error) {
        res.status(500).json({ error: "Erro ao excluir professor" });
    }
};

const atualizarProfessor = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const item = await prisma.professor.update({
            where: { id: Number(id) },
            data
        });
        res.json(item).status(200).end();
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar professor" });
    }
};

module.exports = {
    loginProfessor,
    cadastrarProfessor,
    listarProfessores,
    excluirProfessor,
    atualizarProfessor
};