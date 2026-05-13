const API = "http://localhost:3000";

const usuario_id = 1;

// =========================
// EVENTOS
// =========================

async function carregarEventos() {

  const container = document.getElementById("eventosContainer");

  if (!container) return;

  try {

    const response = await fetch(`${API}/eventos/listar`);

    const eventos = await response.json();

    container.innerHTML = "";

    eventos.forEach((evento) => {

      const imagem = evento.imagem
        ? `${API}/uploads/temp/${evento.imagem}`
        : `https://picsum.photos/600/400?random=${evento.id}`;

      container.innerHTML += `
        <div class="card">

          <img src="${imagem}" alt="${evento.titulo}" />

          <div class="card-content">

            <span class="badge">
              ${evento.status}
            </span>

            <h2>${evento.titulo}</h2>

            <p class="info">
              📅 ${new Date(evento.data_evento).toLocaleDateString()}
            </p>

            <p class="info">
              📍 ${evento.local}
            </p>

            <p class="info">
              👥 ${evento.capacidade_maxima} vagas
            </p>

            <button
              class="button"
              onclick="abrirEvento(${evento.id})"
            >
              Ver detalhes
            </button>

          </div>

        </div>
      `;
    });

  } catch (error) {
    console.error("Erro ao carregar eventos:", error);
  }
}

function abrirEvento(id) {
  window.location.href = `evento.html?id=${id}`;
}

// =========================
// DETALHES EVENTO
// =========================

async function carregarDetalhesEvento() {

  const container = document.getElementById("eventoDetalhes");

  if (!container) return;

  const params = new URLSearchParams(window.location.search);

  const eventoId = params.get("id");

  if (!eventoId) return;

  try {

    const response = await fetch(
      `${API}/eventos/buscar/${eventoId}`
    );

    const evento = await response.json();

    const imagem = evento.imagem
      ? `${API}/uploads/temp/${evento.imagem}`
      : `https://picsum.photos/1200/500?random=${evento.id}`;

    container.innerHTML = `
      <div class="evento-page">

        <div>

          <img
            class="evento-banner"
            src="${imagem}"
          />

          <h1>${evento.titulo}</h1>

          <br>

          <p>${evento.descricao}</p>

        </div>

        <div class="sidebar-card">

          <h2>Informações</h2>

          <p>
            <strong>Data:</strong>
            ${new Date(evento.data_evento).toLocaleDateString()}
          </p>

          <br>

          <p>
            <strong>Local:</strong>
            ${evento.local}
          </p>

          <br>

          <p>
            <strong>Status:</strong>
            ${evento.status}
          </p>

          <br>

          <p>
            <strong>Capacidade:</strong>
            ${evento.capacidade_maxima}
          </p>

          <br>

          <button
            class="button"
            onclick="inscrever(${evento.id})"
          >
            Participar
          </button>

        </div>

      </div>
    `;

  } catch (error) {
    console.error("Erro ao carregar evento:", error);
  }
}

// =========================
// INSCREVER
// =========================

async function inscrever(eventoId) {

  try {

    const response = await fetch(
      `${API}/inscricoes/cadastrar`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          usuario_id,
          evento_id: eventoId,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return alert(data.erro || "Erro");
    }

    alert(data.message || "Inscrição realizada!");

  } catch (error) {
    console.error("Erro inscrição:", error);
  }
}

// =========================
// LISTAR INSCRIÇÕES
// =========================

async function carregarMinhasInscricoes() {

  const container = document.getElementById(
    "minhasInscricoes"
  );

  if (!container) return;

  try {

    const response = await fetch(
      `${API}/inscricoes/listar`
    );

    const inscricoes = await response.json();

    container.innerHTML = "";

    inscricoes.forEach((inscricao) => {

      const evento = inscricao.evento;

      container.innerHTML += `
        <div class="inscricao-card">

          <span class="status ${inscricao.status}">
            ${inscricao.status}
          </span>

          <h2>${evento.titulo}</h2>

          <p>
            📍 ${evento.local}
          </p>

          <p>
            📅 ${new Date(evento.data_evento).toLocaleDateString()}
          </p>

          <br>

          <button
            class="button"
            onclick="cancelarInscricao(${inscricao.id})"
          >
            Cancelar inscrição
          </button>

        </div>
      `;
    });

  } catch (error) {
    console.error("Erro inscrições:", error);
  }
}

// =========================
// CANCELAR INSCRIÇÃO
// =========================

async function cancelarInscricao(id) {

  try {

    const response = await fetch(
      `${API}/inscricoes/excluir/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    alert(data.message || "Inscrição cancelada");

    carregarMinhasInscricoes();

  } catch (error) {
    console.error("Erro cancelamento:", error);
  }
}

// =========================
// ADMIN
// =========================

async function carregarAdmin() {

  const tabela = document.getElementById(
    "participantesTabela"
  );

  if (!tabela) return;

  try {

    const response = await fetch(
      `${API}/inscricoes/listar`
    );

    const inscricoes = await response.json();

    tabela.innerHTML = "";

    let confirmados = 0;
    let espera = 0;
    let cancelados = 0;

    inscricoes.forEach((inscricao) => {

      if (inscricao.status === "confirmada") {
        confirmados++;
      }

      if (inscricao.status === "lista_espera") {
        espera++;
      }

      if (inscricao.status === "cancelada") {
        cancelados++;
      }

      tabela.innerHTML += `
        <tr>

          <td>
            ${inscricao.usuario.nome}
          </td>

          <td>
            ${inscricao.usuario.email}
          </td>

          <td>
            ${inscricao.status}
          </td>

        </tr>
      `;
    });

    document.getElementById(
      "totalInscritos"
    ).textContent = confirmados;

    document.getElementById(
      "listaEspera"
    ).textContent = espera;

    document.getElementById(
      "cancelados"
    ).textContent = cancelados;

  } catch (error) {
    console.error("Erro admin:", error);
  }
}

carregarEventos();
carregarDetalhesEvento();
carregarMinhasInscricoes();
carregarAdmin();

