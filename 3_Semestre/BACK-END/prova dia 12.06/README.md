# Sistema de Gerenciamento do Hotel Marcondes

###  Sobre o Projeto
Este projeto foi desenvolvido como solução para a **Situação de Aprendizagem Desafiadora**, com o objetivo de substituir registros manuais ou planilhas por um sistema web full-stack eficiente. A aplicação permite o controle completo de quartos e suas respectivas reservas, garantindo a persistência dos dados e uma interface amigável e moderna.

A identidade visual foi desenvolvida de forma minimalista e limpa, utilizando tons de **rosa claro/pastel**, ideal para uma navegação fluida, profissional e organizada para a apresentação.

---

##  Requisitos de Infraestrutura & Tecnologias

* **IDE Utilizada:** Visual Studio Code (VS Code)
* **Linguagens Utilizadas:** HTML5, CSS3, JavaScript (ES6+ Nativo)
* **Ambiente de Execução Back-end:** Node.js
* **ORM (Persistência):** Prisma ORM
* **Comunicação Front/Back:** Fetch API (Nativa do JavaScript, sem dependências externas)
* **SGBD:** MariaDB
* **Servidor de Aplicação:** Servidor local Node.js (Porta `3000`)

---

##  Diagrama de Entidade-Relacionamento (DER) & Regras de Negócio

O sistema mapeia o fluxo de hospedagem através de um relacionamento clássico de **1:N (Um para Muitos)**:

* **Regra de Negócio:** Um quarto pode possuir várias reservas ao longo do tempo (`1:N`), mas uma reserva específica pertence a apenas um único quarto (`1:1`).
* **Chave Estrangeira:** A tabela `reservas` carrega o campo `quarto_id`, criando o vínculo direto e restritivo com a tabela `quartos`.

### Estrutura das Tabelas

#### Tabela: `quartos`
| Campo | Tipo | Atributos | Descrição |
| :--- | :--- | :--- | :--- |
| `id` | INT | PK, Auto Increment | Identificador único do quarto |
| `numero` | VARCHAR(10) | Not Null | Número de identificação do quarto |
| `tipo` | VARCHAR(50) | Not Null | Tipo do quarto (Ex: Standard, Master, Deluxe) |

#### Tabela: `reservas`
| Campo | Tipo | Atributos | Descrição |
| :--- | :--- | :--- | :--- |
| `id` | INT | PK, Auto Increment | Identificador único da reserva |
| `hospede` | VARCHAR(100) | Not Null | Nome completo do hóspede |
| `data_entrada` | DATE | Not Null | Data de check-in |
| `data_saida` | DATE | Not Null | Data de check-out |
| `quarto_id` | INT | FK, Not Null | Código do quarto associado |

> **Nota:** O script SQL de população inicial e o arquivo de exportação das requisições do Insomnia para avaliação estão salvos na pasta `./docs`.

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

> *Substitua os caminhos abaixo pelas imagens dos seus próprios prints na hora do envio definitivo.*

### 1. Painel Geral (Listagem de Quartos)

Interface com título estilizado, botão superior de acesso e listagem em formato de tabela exibindo os quartos vindos do banco de dados e ações de controle.


### 2. Cadastro de Quarto

Formulário em modal/tela limpa para inserção de novos quartos enviando os dados em tempo real para a API do Prisma.


### 3. Gerenciamento de Reservas

Tela alimentada de forma segura por dados em cache local, exibindo o histórico de reservas do quarto escolhido e formulário de check-in/check-out.


---

##  Desenvolvido por:

* **Bia** / @biaams-sys

```

```