async function cadastrarEvento(){

    const dados = {
        titulo: document.getElementById("titulo").value,
        descricao: document.getElementById("descricao").value,
        data_evento: document.getElementById("data_evento").value,
        local: document.getElementById("local").value,
        capacidade_maxima: Number(document.getElementById("capacidade").value)
    };

    // cadastra evento
    const resposta = await fetch(`${API}/eventos/cadastrar`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(dados)
    });

    const evento = await resposta.json();

    // pega imagem
    const arquivo = document.getElementById("imagem").files[0];

    // cria formdata
    const formData = new FormData();

    formData.append("imagem", arquivo);

    formData.append("eventosID", evento.id);

    // envia imagem
    await fetch(`${API}/upload`,{
        method:"POST",
        body: formData
    });

    alert("Evento cadastrado");

    listarEventos();
}

async function listarEventos() {

    const resposta = await fetch(`${API}/eventos/listar`);

    const eventos = await resposta.json();

    const lista = document.getElementById("listaEventos");

    lista.innerHTML = "";

    eventos.forEach(evento => {

        lista.innerHTML += `

<div class="evento">

    ${evento.Img.length > 0 
? `<img src="http://localhost:3000/${evento.Img[0].path}" width="300">`
: `<p>Sem imagem</p>`
}

    <h2>${evento.titulo}</h2>

    <p>${evento.descricao}</p>

</div>

`;
    });

}

async function excluirEvento(id) {

    await fetch(`${API}/eventos/excluir/${id}`, {
        method: "DELETE"
    });

    listarEventos();
}

listarEventos();