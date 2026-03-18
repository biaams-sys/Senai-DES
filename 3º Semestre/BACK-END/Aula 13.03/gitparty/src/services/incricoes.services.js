const prisma = require("../data/prisma");

const LimiteParticipantes = async(usuarioID, eventoID) => {
    const evento = await prisma.eventos.findUnique({
        where: {id : eventoID},
        include: {
            inscricoes: true
        }
    });

    const numerosParticipantes = evento.inscricoes.filter(inscricao => inscricao.status == "CONFIRMADO").length;

    console.log(numerosParticipantes);
};

module.exports = {
    LimiteParticipantes
}