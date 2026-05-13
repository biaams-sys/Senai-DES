const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(tasks);
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { name, startDate, endDate, description } = req.body;
    
    const task = await prisma.task.create({
      data: {
        name,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        description
      }
    });
    
    res.status(201).json(task);
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    res.status(500).json({ error: 'Erro ao criar tarefa' });
  }
};