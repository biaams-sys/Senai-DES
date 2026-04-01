const url = 'https://receitasapi-b-2025.vercel.app/receitas';
const receitas = [];

getReceitas();

function getReceitas() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            if (Array.isArray(data)) {
                receitas.push(...data);
            } else if (data.receitas) {
                receitas.push(...data.receitas);
            } else {
                receitas.push(data);
            }

            renderReceitas();
        })
        .catch(error => console.error("Erro:", error));
}

function renderReceitas() {
    const main = document.querySelector('main');
    main.innerHTML = "";

    receitas.forEach(r => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <img src="${r.img || r.imagem}" alt="${r.nome}">
            <h2>${r.nome}</h2>
            <button onclick='abrirModal(${JSON.stringify(r)})'>Ver mais</button>
        `;

        main.appendChild(card);
    });
}

function abrirModal(receita) {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    modal.innerHTML = `
        <div class="modal-content">
            <span class="fechar" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <h2>${receita.nome}</h2>
            <img src="${receita.img || receita.imagem}">
            <p><strong>Ingredientes:</strong> ${receita.ingredientes}</p>
            <p><strong>Modo de preparo:</strong> ${receita.modoFazer}</p>
        </div>
    `;

    document.body.appendChild(modal);
}

document.getElementById('btnNova').addEventListener('click', abrirForm);

function abrirForm() {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    modal.innerHTML = `
        <div class="modal-content">
            <span class="fechar" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <h2>Nova Receita</h2>

            <input type="text" id="nome" placeholder="Nome">
            <input type="text" id="img" placeholder="URL da imagem">
            <textarea id="ingredientes" placeholder="Ingredientes"></textarea>
            <textarea id="modoFazer" placeholder="Modo de preparo"></textarea>

            <button onclick="salvarReceita()">Salvar</button>
        </div>
    `;

    document.body.appendChild(modal);
}

function salvarReceita() {
    const nova = {
        nome: document.getElementById('nome').value,
        img: document.getElementById('img').value,
        ingredientes: document.getElementById('ingredientes').value,
        modoFazer: document.getElementById('modoFazer').value
    };

    fetch('https://receitasapi-b-2025.vercel.app/receitas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nova)
    })
    .then(res => res.json())
    .then(() => {
        alert("Receita criada!");
        location.reload(); 
    })
    .catch(err => console.error(err));
}