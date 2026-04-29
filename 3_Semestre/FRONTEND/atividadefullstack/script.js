class PerfumesAdmin {
    constructor() {
        this.API = "http://localhost:3000/perfume";
        this.perfumes = [];
        this.marcas = [];
        this.categorias = [];
        this.currentPerfumeId = null;

        this.IMAGEM_PADRAO = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjIyIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZpbGw9IiNkNGFmMzciIGZvbnQtc2l6ZT0iMTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';

        this.init();
    }

    async init() {
        this.bindEvents();
        await this.loadAllData();
    }

    bindEvents() {

        document.getElementById('btn-add-perfume')
            ?.addEventListener('click', () => this.openModalForm());


        document.getElementById('btn-close-modal')
            ?.addEventListener('click', () => this.closeModalForm());

        document.getElementById('btn-cancelar')
            ?.addEventListener('click', () => this.closeModalForm());

        document.getElementById('form-perfume')
            ?.addEventListener('submit', (e) => this.handleSubmit(e));


        document.getElementById('btn-close-detalhes')
            ?.addEventListener('click', () => this.closeDetalhes());

        document.getElementById('btn-fechar-detalhes')
            ?.addEventListener('click', () => this.closeDetalhes());

        document.getElementById('btn-editar')
            ?.addEventListener('click', () => {
                this.closeDetalhes();
                this.openModalForm(this.currentPerfumeId);
            });

        document.getElementById('btn-excluir')
            ?.addEventListener('click', () => this.deletePerfume(this.currentPerfumeId));
    }



    async loadAllData() {
        try {
            const [perfumesRes, categoriasRes, marcasRes] = await Promise.all([
                fetch(`${this.API}/listar`),
                fetch(`http://localhost:3000/categoria/listar`),
                fetch(`http://localhost:3000/marca/listar`)
            ]);

            this.perfumes = await perfumesRes.json();
            this.categorias = await categoriasRes.json();
            this.marcas = await marcasRes.json();

            this.renderSelects();
            this.renderPerfumes();

        } catch (e) {
            console.error(e);
            alert("Erro ao carregar dados");
        }
    }
    getUnicos(arr) {
        const map = new Map();
        arr.filter(Boolean).forEach(item => map.set(item.id, item));
        return Array.from(map.values());
    }



    renderSelects() {
        const marca = document.getElementById('marca-id');
        const categoria = document.getElementById('categoria-id');

        if (marca) {
            marca.innerHTML = '<option value="">Selecione</option>';
            this.marcas.forEach(m => {
                marca.innerHTML += `<option value="${m.id}">${m.nome}</option>`;
            });
        }

        if (categoria) {
            categoria.innerHTML = '<option value="">Selecione</option>';
            this.categorias.forEach(c => {
                categoria.innerHTML += `<option value="${c.id}">${c.nome}</option>`;
            });
        }
    }

    renderPerfumes() {
        const grid = document.getElementById('perfumes-grid');
        if (!grid) return;

        grid.innerHTML = this.perfumes.map(p => {
            const img = p.imagens?.[0]?.url || this.IMAGEM_PADRAO;

            return `
                <div class="perfume-card">
                    <img src="${img}" onerror="this.src='${this.IMAGEM_PADRAO}'">
                    <h3>${p.nome}</h3>
                    <p>${p.marca?.nome || ''}</p>
                    <strong>R$ ${parseFloat(p.preco).toFixed(2)}</strong>

                    <button onclick="app.openDetalhes(${p.id})">Detalhes</button>
                </div>
            `;
        }).join('');
    }



    openDetalhes(id) {
        const p = this.perfumes.find(x => x.id == id);
        if (!p) return;

        this.currentPerfumeId = id;

        const img = p.imagens?.[0]?.url || this.IMAGEM_PADRAO;

        document.getElementById('detalhes-body').innerHTML = `
            <img src="${img}">
            <h2>${p.nome}</h2>
            <p>${p.marca?.nome}</p>
            <p>${p.categoria?.nome}</p>
            <strong>R$ ${parseFloat(p.preco).toFixed(2)}</strong>
        `;

        document.getElementById('modal-detalhes').classList.add('active');
    }

    closeDetalhes() {
        document.getElementById('modal-detalhes').classList.remove('active');
    }



    openModalForm(id = null) {
        const modal = document.getElementById('modal-form');

        if (id) {
            const p = this.perfumes.find(x => x.id == id);
            if (!p) return;

            this.currentPerfumeId = id;

            document.getElementById('nome').value = p.nome;
            document.getElementById('preco').value = p.preco;
            document.getElementById('marca-id').value = p.marcaId;
            document.getElementById('categoria-id').value = p.categoriaId;
            document.getElementById('imagem-url').value = p.imagens?.[0]?.url || '';
        } else {
            this.currentPerfumeId = null;
            document.getElementById('form-perfume').reset();
        }

        modal.classList.add('active');
    }

    closeModalForm() {
        document.getElementById('modal-form').classList.remove('active');
    }

    async handleSubmit(e) {
        e.preventDefault();

        const data = {
            nome: document.getElementById('nome').value,
            preco: parseFloat(document.getElementById('preco').value),
            marcaId: parseInt(document.getElementById('marca-id').value),
            categoriaId: parseInt(document.getElementById('categoria-id').value),
        };

        const img = document.getElementById('imagem-url').value;
        if (img) data.imagens = [{ url: img }];

        const url = this.currentPerfumeId
            ? `${this.API}/atualizar/${this.currentPerfumeId}`
            : `${this.API}/cadastrar`;

        const method = this.currentPerfumeId ? 'PUT' : 'POST';

        try {
            await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            this.closeModalForm();
            await this.loadAllData();

        } catch (e) {
            alert("Erro ao salvar");
        }
    }



    async deletePerfume(id) {
        if (!confirm("Excluir perfume?")) return;

        await fetch(`${this.API}/excluir/${id}`, { method: 'DELETE' });

        this.closeDetalhes();
        await this.loadAllData();
    }
}

const app = new PerfumesAdmin();