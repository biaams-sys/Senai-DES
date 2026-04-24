const { excluir } = require("../controllers/inscricoes.controller");
const prisma = require("../data/prisma");

const LimiteParticipantes = async (usuarioId, eventoID) => {
    const evento = await prisma.eventos.findUnique({
        where: { id: eventoID },
        include: {
            inscricoes: true
        }
    });

    const numerosParticipantes = evento.inscricoes.filter(inscricao => inscricao.status === "CONFIRMADO").length;

    if (numerosParticipantes == evento.capacidade_maxima) {
        return "LISTA_DE_ESPERA";
    } else {
        return "CONFIRMADO";
    }
};

const verificarDuplicidade = async (usuarioID, eventoID) => {
    const cadastro = await prisma.inscricoes.findMany({
        where: {
            eventosID: eventoID,
            usuariosId: usuarioID
        }
    });

    if (cadastro.length > 0) throw new Error("Usuario já cadastrado");
};

const cancelamento = async (usuarioID, eventoID) => {

  const eventos = await prisma.inscricoes.findMany({
    where: {
      usuario_id: usuarioID
    },
    orderBy: {
      data_evento: 'desc' 
    }
  });

  function podeExecutar(eventos) {
    const dia = 24 * 60 * 60 * 1000;

    if (eventos.length === 0) {
      return true;
    }

    const ultimo = eventos[0]; 

    const antes = new Date(ultimo.data_evento);
    const agora = new Date();

    return (agora - antes) >= dia;
  }

  if (!podeExecutar(eventos)) {
    console.log("Você ja passou da data que pode excluir");
    return;
  }
  await prisma.inscricoes.delete({
    where: {
      id: eventoID
    }
  });

  console.log("Cancelado com sucesso");
};

module.exports = {
    LimiteParticipantes,
    verificarDuplicidade,
    cancelamento
}