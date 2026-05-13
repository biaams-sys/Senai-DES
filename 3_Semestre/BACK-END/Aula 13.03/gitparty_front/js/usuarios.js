async function cadastrarUsuario(){

    const dados = {
        nome: nome.value,
        email: email.value,
        senha: senha.value
    };

    await fetch(`${API}/usuarios/cadastrar`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(dados)
    });

    listarUsuarios();
}

async function listarUsuarios(){

    const resposta = await fetch(`${API}/usuarios/listar`);

    const usuarios = await resposta.json();

    listaUsuarios.innerHTML = "";

    usuarios.forEach(usuario => {

        listaUsuarios.innerHTML += `
        
        <div class="evento">
            <h2>${usuario.nome}</h2>
            <p>${usuario.email}</p>
        </div>
        
        `;
    });

}

listarUsuarios();