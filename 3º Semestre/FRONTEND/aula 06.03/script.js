// cosnt -> objeto
// var -> global
// let -> local

//lista=[]
//for each()
//push()
//splice()

const modalFli = document.querySelector("#modalFli")
var filmes = JSON.parse(localStorage.getItem("filmes")) || [];

renderizarTabela();

function salvarLocal(){
    localStorage.setItem("filmes", JSON.stringify(filmes));
    window.location.reload();
}

function abrirModal(){
    modalFli.style.display="block";
}

function fecharModal(){
    modalFli.style.display="none";
}
const formFli = document.querySelector("#formFli");
formFli.addEventListener("submit", e => {
    e.preventDefault();
    const obj = {
        Nome: formFli.Nome.value,
        Ano: formFli.Ano.value,
        Genero: formFli.Genero.value,
        Duracao: formFli.Duracao.value,
        Diretor: formFli.Diretor.value,
        Classificacao: formFli.Classificacao.value,
        Sinopse: formFli.Sinopse.value,
        Capa: formFli.Capa.value,
    }
    filmes.push(obj);
    formFli.reset();
    salvarLocal();
 
});

function renderizarTabela(){
    const corpo = document.querySelector("#dados");
    corpo.innerHTML = "";
    filmes.forEach((c, i) =>{
        corpo.innerHTML += `
        <tr>
        <td>${c.Nome}</td>
        <td>${c.Ano}</td>
        <td>${c.Genero}</td>
        <td>${c.Duracao}</td>
        <td>${c.Diretor}</td>
        <td>${c.Classificacao}</td>
        <td>${c.Sinopse}</td>
        <td><img src="${c.Capa}" width="80"></td>
        <td><button onclick="excluir(${i})">Excluir</button></td>
        </tr>
        `;
    })
}

const pesquisa = document.querySelector("#pesquisagen");

pesquisa.addEventListener("input", function(){

    const pesquisa = pesquisa.value.toLowerCase();
    const linhas = document.querySelectorAll("#dados tr");

    linhas.forEach(linha => {

        const genero = linha.children[2].textContent.toLowerCase();

        if(genero.includes(pesquisa)){
            linha.style.display = "";
        }else{
            linha.style.display = "none";
        }

    });

});

function excluir(indice){
    filmes.splice(indice,1);
    renderizarTabela();
}