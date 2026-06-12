const API_URL = "http://localhost:3000";

async function carregarQuartos() {
    try {
        const response = await fetch(`${API_URL}/quartos/listar`);
        const quartos = await response.json();
        
        const tbody = document.getElementById('lista-quartos');
        if (!tbody) return;
        
        tbody.innerHTML = '';

        quartos.forEach(quarto => {
            tbody.innerHTML += `
                <tr>
                    <td>${quarto.numero}</td>
                    <td>${quarto.tipo}</td>
                    <td>
                        <button onclick="irParaReservas(${quarto.id}, '${quarto.numero}', '${quarto.tipo}')">Visualizar Reservas</button>
                        <button class="btn-danger" onclick="excluirQuarto(${quarto.id})">Excluir</button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        alert("Erro ao carregar os quartos.");
    }
}

async function salvarQuarto() {
    const numero = document.getElementById('quarto-numero').value;
    const tipo = document.getElementById('quarto-tipo').value;

    if (!numero || !tipo) return alert("Preencha todos os campos!");

    try {
        await fetch(`${API_URL}/quartos/cadastrar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ numero, tipo })
        });

        alert("Quarto cadastrado com sucesso!");
        window.location.href = 'index.html';

    } catch (error) {
        alert("Erro ao cadastrar quarto.");
    }
}

async function excluirQuarto(id) {
    if (confirm("Tem certeza que deseja excluir este quarto? Todas as reservas dele também serão apagadas!")) {
        try {
            await fetch(`${API_URL}/quartos/excluir/${id}`, {
                method: 'DELETE'
            });
            carregarQuartos(); 
        } catch (error) {
            alert("Erro ao excluir quarto.");
        }
    }
}

function irParaReservas(id, numero, tipo) {
    window.location.href = `reservas.html?id=${id}&numero=${numero}&tipo=${tipo}`;
}

function inicializarTelaReservas() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const numero = urlParams.get('numero');
    const tipo = urlParams.get('tipo');

    if (id) {
        document.getElementById('info-quarto').innerText = `${numero} (${tipo})`;
        carregarReservas(id);
    }
}

async function carregarReservas(quartoId) {
    try {
        const response = await fetch(`${API_URL}/reservas/listar/quarto/${quartoId}`);
        const reservas = await response.json();

        const tbody = document.getElementById('lista-reservas');
        if (!tbody) return;

        tbody.innerHTML = '';

        reservas.forEach(reserva => {
            const dataIn = new Date(reserva.data_entrada).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
            const dataOut = new Date(reserva.data_saida).toLocaleDateString('pt-BR', { timeZone: 'UTC' });

            tbody.innerHTML += `
                <tr>
                    <td>${reserva.id}</td>
                    <td>${reserva.hospede}</td>
                    <td>${dataIn}</td>
                    <td>${dataOut}</td>
                    <td>
                        <button class="btn-danger" onclick="excluirReserva(${reserva.id}, ${quartoId})">Excluir</button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        alert("Erro ao carregar as reservas.");
    }
}

async function salvarReserva() {
    const urlParams = new URLSearchParams(window.location.search);
    const quartoId = urlParams.get('id');

    const hospede = document.getElementById('reserva-hospede').value;
    const data_entrada = document.getElementById('reserva-entrada').value;
    const data_saida = document.getElementById('reserva-saida').value;

    if (!hospede || !data_entrada || !data_saida) return alert("Preencha todos os campos da reserva!");

    try {
        await fetch(`${API_URL}/reservas/cadastrar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                hospede,
                data_entrada,
                data_saida,
                quarto_id: quartoId
            })
        });

        alert("Reserva cadastrada com sucesso!");
        
        document.getElementById('reserva-hospede').value = '';
        document.getElementById('reserva-entrada').value = '';
        document.getElementById('reserva-saida').value = '';
        carregarReservas(quartoId);
    } catch (error) {
        alert("Erro ao cadastrar reserva.");
    }
}

async function excluirReserva(id, quartoId) {
    if (confirm("Tem certeza que deseja excluir esta reserva?")) {
        try {
            await fetch(`${API_URL}/reservas/excluir/${id}`, {
                method: 'DELETE'
            });

            carregarReservas(quartoId);
        } catch (error) {
            alert("Erro ao excluir reserva.");
        }
    }
}


document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('lista-quartos')) {
        carregarQuartos();
    }
    
    if (document.getElementById('lista-reservas')) {
        inicializarTelaReservas();
    }
    
});