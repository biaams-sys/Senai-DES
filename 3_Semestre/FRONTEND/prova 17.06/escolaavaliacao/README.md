# Sistema de Controle de Turmas e Atividades

##  Sobre o Projeto
Este sistema é uma aplicação web full-stack desenvolvida para a gestão de turmas e controle de atividades pedagógicas de professores. O projeto simula o cenário do SAEP, dividindo-se em:
* `./api`: Back-end em Node.js com Prisma e MySQL, contendo também a exportação das rotas do Insomnia (`.yaml`).
* `./web`: Front-end puro com `index.html`, `style.css` e `script.js` (usando Fetch API).

---
##  Ferramentas Necessárias (Apps)
1. **VS Code** (Editor)
2. **XAMPP** (Servidor local para o banco de dados MySQL)
3. **Node.js** (Ambiente de execução do back-end)
4. **Navegador Web** (Chrome, Edge ou Firefox para rodar a interface)
5. **Insomnia** (Para testes e carga da massa de dados)

---

##  Instalação e Execução (Back-end)

1. Abra o **XAMPP** e dê **Start** no serviço do **MySQL**.
2. Acesse o painel do MySQL e crie um banco de dados vazio chamado `turmas_db`.
3. Certifique-se de que o seu arquivo `.env` dentro da pasta `./api` está configurado corretamente:
   ```env
   DATABASE_URL="mysql://root:@localhost:3306/turmas_db"
   PORT=3000

```

4. Abra o terminal dentro da pasta **`.api`** e execute o comando abaixo para instalar tudo, rodar o banco e subir o servidor de uma vez só:

```bash
npm i express cors dotenv prisma @prisma/client @prisma/adapter-mariadb && npx prisma migrate dev --name init && node server.js

```

*O terminal exibirá a mensagem: `Servidor rodando na porta 3000`.*

---

## Execução do Front-end

Como o front-end utiliza apenas tecnologias nativas:

1. Vá até a pasta `./web`.
2. Dê dois cliques no arquivo `index.html` para abri-lo direto no seu navegador (ou execute usando a extensão Live Server do VS Code).

---

##  Guia de Testes do Sistema

### Fluxo de Uso e Regras de Negócio

1. **Massa de Dados Inicial:** Importe o arquivo `./api/insomnia_export.yaml` no seu Insomnia e execute as rotas de cadastro de professores para povoar o banco (obrigatório pelo menos 3 registros).
2. **Tela de Autenticação (Login):** Insira o e-mail e senha criados (Ex: `ana@escola.com` / `senha123`). O sistema criará a sessão no `localStorage` e liberará o painel.
3. **Painel do Professor:** Exibe o nome do professor logado e lista dinamicamente apenas as turmas associadas a ele. Permite o cadastro de novas turmas informando o nome.
4. **Visualização de Atividades:** Ao clicar em **Visualizar** em uma turma, o sistema carrega os dados e a lista de atividades daquela turma específica, permitindo cadastrar novas tarefas com descrição.
5. **Regra de Exclusão (Trava Obrigatória do Requisito 6):**
* Ao clicar em **Excluir** em uma turma, o navegador exibirá uma caixa de confirmação.
* Se a turma selecionada possuir atividades vinculadas, o back-end bloqueará a ação e o sistema exibirá o alerta exato: `"Você não pode excluir uma turma com atividades cadastradas"`.


6. **Sair do Sistema (Logout):** O botão **Sair** destrói os dados salvos no `localStorage` e limpa os formulários, redirecionando o usuário de volta à tela de login de forma segura.

---

##  Massa de Dados e Testes da API (Insomnia)

O arquivo de exportação contendo todos os testes de rotas da API em formato YAML foi salvo junto ao back-end no caminho:

* `./api/insomnia_export.yaml`

---

##  Imagens web

2. **Tela de Autenticação (Login):** ...
   
   ![Tela de Login](assets/login.png) 

3. **Painel do Professor:** ...
   
   ![Listagem de Turmas](assets/listarturmas.png) 

4. **Visualização de Atividades:** ...
   
   ![Listagem de Atividades](assets/listaratividade.png) 

###  Desenvolvido por:

* **Beatriz Albuquerque (@biaams-sys)** 🚀

```

```
