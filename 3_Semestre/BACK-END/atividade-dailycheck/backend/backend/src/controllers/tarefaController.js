const prisma = require("../data/prisma");

const listar = async (req, res) => {
  const tarefas = await prisma.tarefa.findMany();
  res.json(tarefas);
};

const criar = async (req, res) => {
  const { nome, descricao, dataInicio, dataFim } = req.body;

  const tarefa = await prisma.tarefa.create({
    data: {
      nome,
      descricao,
      dataInicio: new Date(dataInicio),
      dataFim: new Date(dataFim)
    }
  });

  res.json(tarefa);
};

const deletar = async (req, res) => {
  const { id } = req.params;

  await prisma.tarefa.delete({
    where: { id: Number(id) }
  });

  res.json({ message: "Deletado" });
};

module.exports = { listar, criar, deletar };