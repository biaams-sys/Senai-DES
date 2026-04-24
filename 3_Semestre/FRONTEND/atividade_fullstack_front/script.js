// Rotas do backend
const ROTAS = {
    listar: 'http://localhost:3000/perfume/listar',
    cadastrar: 'http://localhost:3000/perfume/cadastrar',
    atualizar: id => `http://localhost:3000/perfume/atualizar/${id}`,
    excluir: id => `http://localhost:3000/perfume/excluir/${id}`
};

let perfumes = [];
let editandoId = null;

// Carrega lista
async function carregarPerfumes() {
    try {
        const response = await fetch(ROTAS.listar);
        if (!response.ok) throw new Error(`Erro HTTP ${response.status}`);
        perfumes = await response.json();
        renderizarPerfumes();
    } catch (error) {
        console.error('Erro ao listar:', error);
        document.getElementById('perfumesGrid').innerHTML = 
            '<div class="empty-state"><h3>Erro ao carregar perfumes</h3></div>';
    }
}

// ✅ PRIMEIRA IMAGEM das imagens[]
function getPrimeiraImagem(perfume) {
    if (perfume.imagens && perfume.imagens.length > 0) {
        return perfume.imagens[0].url;
    }
    return null;
}

// Renderiza cards
function renderizarPerfumes() {
    const grid = document.getElementById('perfumesGrid');
    
    if (!perfumes || perfumes.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <h3>Nenhum perfume cadastrado</h3>
                <p>Adicione o primeiro perfume</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = perfumes.map((perfume, index) => {
        const precoNum = parseFloat(perfume.preco) || 0;
        const precoFormatado = precoNum.toFixed(2).replace('.', ',');
        const imagemUrl = getPrimeiraImagem(perfume);
        
        return `
            <div class="perfume-card" style="position: relative;">
                ${imagemUrl ? `
                    <img src="${imagemUrl}" alt="${perfume.nome}" 
                         style="width: 100%; height: 200px; object-fit: cover; border-radius: 6px 6px 0 0;">
                ` : `
                    <div style="width: 100%; height: 200px; background: #ecf0f1; display: flex; align-items: center; justify-content: center; border-radius: 6px 6px 0 0; font-size: 4rem; color: #bdc3c7;">
                        ${perfume.nome ? perfume.nome.charAt(0).toUpperCase() : '?'}
                    </div>
                `}
                <div style="padding: 15px;">
                    <div class="perfume-name">${perfume.nome}</div>
                    <div class="perfume-brand">${perfume.marca?.nome || 'Sem marca'}</div>
                    <div class="perfume-price">R$ ${precoFormatado}</div>
                    <div class="perfume-size">${perfume.categoria?.nome || 'Sem categoria'}</div>
                    <button class="btn btn-primary btn-small" onclick="abrirDetalhes(${index}); event.stopPropagation();" 
                            style="width: 100%; margin-top: 10px;">
                        Ver detalhes
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Detalhes com todas as imagens
function abrirDetalhes(index) {
    const perfume = perfumes[index];
    const precoNum = parseFloat(perfume.preco) || 0;
    const precoFormatado = precoNum.toFixed(2).replace('.', ',');
    const imagens = perfume.imagens || [];
    
    let galeriaImagens = '';
    if (imagens.length > 0) {
        galeriaImagens = `
            <div style="margin-bottom: 20px;">
                ${imagens.slice(0, 3).map(img => `
                    <img src="${img.url}" alt="Imagem ${perfume.nome}" 
                         style="width: 100px; height: 100px; object-fit: cover; border-radius: 6px; margin: 2px; border: 1px solid #e0e0e0; cursor: pointer;"
                         onclick="abrirImagemGrande('${img.url}')">
                `).join('')}
                ${imagens.length > 3 ? `<p style="font-size: 0.9rem; color: #7f8c8d;">+${imagens.length - 3} imagens</p>` : ''}
            </div>
        `;
    }
    
    document.getElementById('perfumeDetails').innerHTML = `
        ${galeriaImagens}
        <div class="detail-row">
            <span class="detail-label">Nome:</span>
            <span class="detail-value">${perfume.nome}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Marca:</span>
            <span class="detail-value">${perfume.marca?.nome || 'N/A'}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Categoria:</span>
            <span class="detail-value">${perfume.categoria?.nome || 'N/A'}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Preço:</span>
            <span class="detail-value">R$ ${precoFormatado}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Total de imagens:</span>
            <span class="detail-value">${imagens.length}</span>
        </div>
        ${perfume.descricao ? `
            <div class="detail-row">
                <span class="detail-label">Descrição:</span>
                <span class="detail-value">${perfume.descricao}</span>
            </div>
        ` : ''}
        <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #e0e0e0; display: flex; gap: 10px; justify-content: center;">
            <button class="btn btn-primary btn-small" onclick="editarPerfume(${index})">Editar</button>
            <button class="btn btn-secondary btn-small" onclick="excluirPerfume(${perfume.id})">Excluir</button>
        </div>
    `;
    openModal('detailsModal');
}

// Abre imagem em tamanho grande
function abrirImagemGrande(url) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 90%; max-height: 90%; display: flex; align-items: center; justify-content: center;">
            <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <img src="${url}" style="max-width: 100%; max-height: 100%; object-fit: contain;">
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Editar (preenche categoria e marca também)
function editarPerfume(index) {
    const perfume = perfumes[index];
    editandoId = perfume.id;
    
    document.getElementById('nome').value = perfume.nome || '';
    document.getElementById('marca').value = perfume.marcaId || '';
    document.getElementById('preco').value = perfume.preco || '';
    document.getElementById('tamanho').value = perfume.tamanho || '';
    document.getElementById('categoria').value = perfume.categoriaId || '';
    document.getElementById('descricao').value = perfume.descricao || '';
    
    document.querySelector('.modal-header h2').textContent = 'Editar Perfume';
    openModal('addModal');
}

// Demais funções permanecem iguais (salvarPerfume, excluirPerfume, modais...)

// Salvar (cadastrar ou atualizar)
async function salvarPerfume() {
    const dados = {
        nome: document.getElementById('nome').value.trim(),
        marca: document.getElementById('marca').value.trim(),
        preco: parseFloat(document.getElementById('preco').value),
        tamanho: document.getElementById('tamanho').value,
        descricao: document.getElementById('descricao').value.trim()
    };

    if (!dados.nome || !dados.marca || !isNaN(dados.preco) === false || !dados.tamanho) {
        alert('Preencha corretamente todos os campos obrigatórios');
        return;
    }

    try {
        let response;
        if (editandoId) {
            response = await fetch(ROTAS.atualizar(editandoId), {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });
        } else {
            response = await fetch(ROTAS.cadastrar, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });
        }

        if (response.ok) {
            alert(editandoId ? 'Perfume atualizado!' : 'Perfume cadastrado!');
            closeModal('addModal');
            limparFormulario();
            editandoId = null;
            carregarPerfumes();
        } else {
            alert('Erro no servidor: ' + response.status);
        }
    } catch (error) {
        console.error('Erro salvar:', error);
        alert('Erro de conexão com servidor');
    }
}

// Modal controls
function openModal(id) {
    document.getElementById(id).style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
    document.body.style.overflow = 'auto';
    if (id === 'addModal') {
        limparFormulario();
        editandoId = null;
        document.querySelector('.modal-header h2').textContent = 'Novo Perfume';
    }
}

function limparFormulario() {
    document.getElementById('perfumeForm').reset();
}

// Event listeners
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        closeModal(event.target.id);
    }
};

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(function(modal) {
            if (modal.style.display === 'block') {
                closeModal(modal.id);
            }
        });
    }
});

// Inicializa
document.addEventListener('DOMContentLoaded', carregarPerfumes);