const API_URL = "http://localhost:3000";

const telaLogin = document.getElementById("tela-login");
const telaTurmas = document.getElementById("tela-turmas");
const telaAtividades = document.getElementById("tela-atividades");

let professorLogado = JSON.parse(localStorage.getItem("professor")) || null;
let turmaSelecionadaId = null;

document.addEventListener("DOMContentLoaded", () => {
    if (professorLogado) {
        mostrarTelaTurmas();
    }
});

document.getElementById("form-login").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const email = document.getElementById("login-email").value;
    const senha = document.getElementById("login-senha").value;

    try {
        const response = await fetch(`${API_URL}/professor/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha })
        });

        if (!response.ok) {
            alert("E-mail ou senha inválidos");
            document.getElementById("form-login").reset();
            return;
        }

        const professor = await response.json();
        
        localStorage.setItem("professor", JSON.stringify(professor));
        professorLogado = professor;

        mostrarTelaTurmas();
    } catch (error) {
        console.error(error);
        alert("Erro ao conectar com o servidor.");
    }
});

function mostrarTelaTurmas() {
    telaLogin.classList.add("hidden");
    telaAtividades.classList.add("hidden");
    telaTurmas.classList.remove("hidden");

    document.getElementById("nome-professor-turmas").textContent = `Olá Professor(a) ${professorLogado.nome}`;
    
    carregarTurmas();
}

async function carregarTurmas() {
    try {
        const response = await fetch(`${API_URL}/turma/listar/${professorLogado.id}`);
        const turmas = await response.json();

        const tbody = document.getElementById("tabela-turmas-body");
        tbody.innerHTML = "";

        if (turmas.length === 0) {
            tbody.innerHTML = `<tr><td colspan="3" style="text-align:center; color:#999;">Nenhuma turma cadastrada.</td></tr>`;
            return;
        }

        turmas.forEach((turma, index) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${turma.nome}</td>
                <td class="text-right">
                    <button class="btn-action-del" onclick="deletarTurma(${turma.id})">Excluir</button>
                    <button class="btn-action-view" onclick="verAtividades(${turma.id}, '${turma.nome}')">Visualizar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error(error);
    }
}

document.getElementById("form-cadastrar-turma").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const nome = document.getElementById("nome-turma").value;

    try {
        const response = await fetch(`${API_URL}/turma/cadastrar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nome: nome,
                professor_id: professorLogado.id
            })
        });

        if (response.ok) {
            document.getElementById("nome-turma").value = "";
            carregarTurmas();
        } else {
            alert("Erro ao cadastrar a turma.");
        }
    } catch (error) {
        console.error(error);
    }
});

async function deletarTurma(id) {
    const confirmar = confirm("Deseja realmente excluir esta turma?");
    if (!confirmar) return;

    try {
        const response = await fetch(`${API_URL}/turma/excluir/${id}`, {
            method: "DELETE"
        });

        if (response.status === 400) {
            const dadosErro = await response.json();
            alert(dadosErro.error);
            return;
        }

        if (response.ok) {
            carregarTurmas();
        } else {
            alert("Erro ao processar exclusão.");
        }
    } catch (error) {
        console.error(error);
    }
}

function verAtividades(id, nomeTurma) {
    turmaSelecionadaId = id;
    
    telaTurmas.classList.add("hidden");
    telaAtividades.classList.remove("hidden");

    document.getElementById("nome-professor-atividades").textContent = `Olá Professor(a) ${professorLogado.nome}`;
    document.getElementById("titulo-turma-atividades").textContent = nomeTurma;

    carregarAtividades();
}

function voltarParaTurmas() {
    turmaSelecionadaId = null;
    mostrarTelaTurmas();
}

async function carregarAtividades() {
    try {
        const response = await fetch(`${API_URL}/atividade/listar/${turmaSelecionadaId}`);
        const atividades = await response.json();

        const tbody = document.getElementById("tabela-atividades-body");
        tbody.innerHTML = "";

        if (atividades.length === 0) {
            tbody.innerHTML = `<tr><td colspan="2" style="text-align:center; color:#999;">Nenhuma atividade para esta turma.</td></tr>`;
            return;
        }

        atividades.forEach((ativ, index) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${ativ.descricao}</td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error(error);
    }
}

document.getElementById("form-cadastrar-atividade").addEventListener("submit", async (e) => {
    e.preventDefault();

    const descricao = document.getElementById("descricao-atividade").value;

    try {
        const response = await fetch(`${API_URL}/atividade/cadastrar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                descricao: descricao,
                turma_id: turmaSelecionadaId
            })
        });

        if (response.ok) {
            document.getElementById("descricao-atividade").value = "";
            carregarAtividades();
        } else {
            alert("Erro ao cadastrar atividade.");
        }
    } catch (error) {
        console.error(error);
    }
});

function logout() {
    localStorage.removeItem("professor");
    professorLogado = null;
    turmaSelecionadaId = null;

    document.getElementById("form-login").reset();

    telaTurmas.classList.add("hidden");
    telaAtividades.classList.add("hidden");
    telaLogin.classList.remove("hidden");
}