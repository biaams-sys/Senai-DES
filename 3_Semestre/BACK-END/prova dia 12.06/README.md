# Sistema de Gerenciamento do Hotel Marcondes

###  Sobre o Projeto
Este projeto foi desenvolvido como solução para a **Situação de Aprendizagem Desafiadora**, com o objetivo de substituir registros manuais ou planilhas por um sistema web full-stack eficiente. A aplicação permite o controle completo de quartos e suas respectivas reservas, garantindo a persistência dos dados e uma interface amigável e moderna.

A identidade visual foi desenvolvida de forma minimalista e limpa, utilizando tons de **rosa claro/pastel**, ideal para uma navegação fluida, profissional e organizada para a apresentação.

---

##  Estrutura de Pastas do Projeto

```text
├── api/
│   ├── prisma/             # Configuração e esquemas do banco de dados
│   ├── src/                # Código-fonte da API (Rotas e Controladores)
│   ├── node_modules/       # Dependências instaladas
│   ├── package.json        # Gerenciador de dependências do Node
│   └── server.js           # Arquivo principal que roda o servidor
├── web/
│   ├── index.html          # Painel Principal (Listagem de Quartos)
│   ├── quartos.html        # Tela/Modal para novos quartos
│   ├── reservas.html       # Gerenciamento de reservas por quarto
│   ├── style.css           # Estilização visual (Tema Rosa Pastel)
│   └── script.js           # Lógica do Front-end e consumo da API
└── docs/                   # Scripts SQL e Insomnia
└── wireframes/             # Foto de referência
Tecnologias Utilizadas
Front-end: HTML, CSS e JavaScript.
---

##  Passo a Passo de Execução do Projeto

### 1. Configuração do Back-end (Node.js + MariaDB + Prisma)
1. Certifique-se de que o serviço do **MariaDB** está iniciado em seu ambiente.
2. Abra o terminal na pasta do seu back-end e instale as dependências estruturais:
   ```bash
   npm install

```

3. No seu arquivo `.env`, certifique-se de que a URL de conexão está apontando corretamente para o MariaDB:
```env
PORT=3000
DATABASE_URL="mysql://root:@localhost:3306/hotel_db"

```


4. Execute as Migrations do Prisma para estruturar as tabelas automaticamente no MariaDB:
```bash
npx prisma migrate dev --name init

```


5. Inicie o servidor de aplicação back-end:
```bash
npm start

```


*(O servidor backend estará escutando requisições na porta `3000`)*

### 2. Configuração do Front-end

1. Como a comunicação foi desenvolvida usando a **Fetch API**.
2. Abra o arquivo **`index.html`** diretamente no seu navegador ou utilize a extensão **Live Server** do VS Code para rodar a interface localmente.

---

##  Funcionalidades Visualizadas (Prints das Telas)

> 

### 1. Painel Geral (Listagem de Quartos)

Interface com título estilizado, botão superior de acesso e listagem em formato de tabela exibindo os quartos vindos do banco de dados e ações de controle.
![Tela Principal](./wireframes/index.png)

### 2. Cadastro de Quarto

Formulário em modal/tela limpa para inserção de novos quartos enviando os dados em tempo real para a API do Prisma.
![Cadastro de Quarto](./wireframes/quartos.png)

### 3. Gerenciamento de Reservas

Tela alimentada de forma segura por dados em cache local, exibindo o histórico de reservas do quarto escolhido e formulário de check-in/check-out.
![Tela de Reservas](./wireframes/reservas1.png)
![Tela de Reservas](./wireframes/reservas2.png)


---

##  Desenvolvido por:

* **Bia** / @biaams-sys

```

```
