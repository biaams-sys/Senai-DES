async function inscrever(){

    const dados = {
        usuariosId: Number(usuarioId.value),
        eventosID: Number(eventoId.value)
    };

    const resposta = await fetch(`${API}/inscricoes/cadastrar`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(dados)
    });

    const resultado = await resposta.json();

    console.log(resultado);

    alert("Inscrição realizada");
}