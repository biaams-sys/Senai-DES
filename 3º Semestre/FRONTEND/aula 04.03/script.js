var produtos = [
    {nome:"Pikachu", preco:500, img:"https://i.gifer.com/4bXB.gif"}
    ,
    {nome:"Charizard", preco:1500, img:"https://i.gifer.com/536F.gif"},

    {nome:"Bulbasaur", preco:400, img:"https://i.gifer.com/WnES.gif"},

    {nome:"Squirtle", preco:400, img:"https://i.gifer.com/ZDcp.gif"},

    {nome:"Gengar", preco:900, img:"https://i.gifer.com/YlVy.gif"},

    {nome:"Espion", preco:600, img:"https://i.gifer.com/3Ezy.gif"},

    {nome:"Snorlax", preco:800, img:"https://i.gifer.com/ZAbj.gif"},

    {nome:"Dragonite", preco:2000, img:"https://i.gifer.com/H0b3.gif"},

    {nome:"Mewtwo", preco:5000, img:"https://i.gifer.com/D6w1.gif"},

    {nome:"Magika", preco:1200, img:"https://i.gifer.com/5GpG.gif"}
];

var carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

renderizarProdutos();

function salvarLocal(){
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function renderizarProdutos(){
    var lista = document.getElementById("listaProdutos");
    lista.innerHTML = "";

    produtos.forEach(function(p, i){
        lista.innerHTML += `
        <div class="card">
            <img src="${p.img}" width="100">
            <h3>${p.nome}</h3>
            <p>R$ ${p.preco}</p>
            <button onclick="adicionar(${i})">Add ao carrinho</button>
        </div>
        `;
    });
}

function adicionar(indice){
    var existe = false;

    carrinho.forEach(function(c){
        if(c.nome == produtos[indice].nome){
            c.qtd += 1;
            existe = true;
        }
    });

    if(existe == false){
        var obj = {
            nome: produtos[indice].nome,
            preco: produtos[indice].preco,
            img: produtos[indice].img,
            qtd: 1
        };
        carrinho.push(obj);
    }

    salvarLocal();
}

function abrirCarrinho(){
    document.getElementById("modalCarrinho").style.display="block";
    renderizarCarrinho();
}

function fecharCarrinho(){
    document.getElementById("modalCarrinho").style.display="none";
}

function renderizarCarrinho(){
    var corpo = document.getElementById("dadosCarrinho");
    var total = 0;
    corpo.innerHTML = "";

    carrinho.forEach(function(c, i){
        total += c.preco * c.qtd;

        corpo.innerHTML += `
        <tr>
            <td><img src="${c.img}" width="50"></td>
            <td>${c.nome}</td>
            <td>
                <button onclick="diminuir(${i})">-</button>
                ${c.qtd}
                <button onclick="aumentar(${i})">+</button>
            </td>
            <td>R$ ${c.preco * c.qtd}</td>
            <td><button onclick="remover(${i})">Excluir</button></td>
        </tr>
        `;
    });

    document.getElementById("total").innerText = "Total: R$ " + total;
}

function aumentar(indice){
    carrinho[indice].qtd += 1;
    salvarLocal();
    renderizarCarrinho();
}

function diminuir(indice){
    carrinho[indice].qtd -= 1;

    if(carrinho[indice].qtd <= 0){
        carrinho.splice(indice,1);
    }

    salvarLocal();
    renderizarCarrinho();
}

function remover(indice){
    carrinho.splice(indice,1);
    salvarLocal();
    renderizarCarrinho();
}

function finalizar(){
    carrinho = [];
    localStorage.removeItem("carrinho");
    renderizarCarrinho();
    var msg = document.getElementById("mensagem");
    msg.innerText = "Pedido finalizado com sucesso!";

    setTimeout(function(){
        msg.innerText = "";
    }, 15000);
}