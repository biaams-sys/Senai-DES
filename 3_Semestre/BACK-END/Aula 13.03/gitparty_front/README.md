
# GitParty Front-End

## Estrutura

- index.html → Página principal de eventos
- meus-eventos.html → Inscrições do usuário
- evento.html → Detalhes do evento
- admin.html → Painel administrativo
- style.css → Estilos globais
- script.js → Integração com API

## Backend esperado

O front foi preparado para consumir:

http://localhost:3000

## Rotas utilizadas

GET /eventos
GET /eventos/:id
GET /usuarios/:id/inscricoes
GET /inscricoes

POST /inscricoes
PATCH /inscricoes/:id/cancelar

## Como usar

Abra os arquivos HTML com Live Server.

ou:

```bash
npx live-server
```

## Importante

No script.js altere:

const API = "http://localhost:3000";

caso seu backend esteja em outra porta.
