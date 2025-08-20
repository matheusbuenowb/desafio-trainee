# Desafio Trainee - CRM com Django, Postgres e n8n

Este projeto é uma aplicação de CRM simples que permite cadastrar leads e enviar os dados para um workflow do n8n via webhook. Todo o projeto roda via Docker Compose, incluindo backend (Django), frontend (React), banco de dados PostgreSQL e n8n.

# Observação sobre o Frontend

No enunciado, a especificação pedia que o frontend fosse implementado em Django templates. Para poupar tempo de desenvolvimento e manter uma melhor separação de responsabilidades, optei por utilizar React no frontend, com intuito de garantir um maior desacoplamento de serviços, e visando assim uma arquitetura mais próxima possível da de microsserviços.

Essa abordagem traz alguns benefícios, tais como:

- Maior interatividade e experiência de usuário com SPA (Single Page Application).

- Consumo direto da API Django, mantendo o backend desacoplado e reutilizável para outros tipos de aplicações.

- Facilidade de manutenção.

Contudo, o backend do Django ainda continua responsável por toda a lógica de negócios, persistência em banco de dados e comunicação com o n8n.

---

## Estrutura do Projeto

Optei por separar o projeto em duas pastas diferentes: back end e front end. 
- No back end está toda a parte do django responsável por persistência dos dados.
- No front end estão localizados todos os arquivos de páginas (em jsx), estilizadores (css) e também o dockfile exclusivo para o react.

  Na raíz do projeto estão os arquivos .env, .env.example e dockercompose, responsáveis pela configuração de cada microsserviço para a criação das imagens e orquestração de containers. Também na raíz está localizado o arquivo de fluxo do n8n "workflow_n8n.json", e também o gitignore e requirements para instalação de frameworks específicos.  

---

## Pré-requisitos

- Docker 20 ou maior
- Docker Compose 2 ou maior
- Node.js e npm (somente se for rodar React localmente sem Docker)

---

## Variáveis de Ambiente

Crie um arquivo `.env` baseado no `.env.example` e configure os valores:

Configuração do Postgres:
- POSTGRES_USER=usuario_aqui
- POSTGRES_PASSWORD=senha_aqui
- POSTGRES_DB=nome_do_banco_aqui
- POSTGRES_HOST=host_do_banco_aqui
- POSTGRES_PORT=5432

Configuração do Django:
- DJANGO_SECRET_KEY=chave_secreta_aqui
- DJANGO_DEBUG=True
- DJANGO_ALLOWED_HOSTS=*

Webhook do n8n:
- N8N_WEBHOOK_URL=url_do_webhook_aqui

---

## Subindo a aplicação

Na raiz do projeto, execute:

- docker compose up --build

Esse comando irá criar os containers:

  - challenge_db (Postgres)
  
  - challenge_web (Django)
  
  - challenge_n8n (n8n)
  
  - frontend (React)

Além disso, serão executados as migrations do Django e os serviços estarão ativos nas portas especificadas.

A aplicação estará disponível nas seguintes portas:

- Frontend React: http://localhost:3000

- Backend Django: http://localhost:8080

- n8n: http://localhost:5678

Workflow do n8n:

O fluxo do n8n está exportado no arquivo n8n_workflow.json, aqui na raiz do depositório. Ele recebe dados do webhook do Django e responde HTTP 200 com { "ok": true } quando válido (é possível ver pelos logs no prompt de comando, ex: challenge_web  | [20/Aug/2025 20:19:18] "POST /api/leads/ HTTP/1.1" 200 34).


Principal link para a aplicação:
- Cadastro de leads: http://localhost:3000/new-lead

- Para ver lista de leads: http://localhost:3000/leads

- Dashboard: http://localhost:3000/dashboard

O frontend consome a API do Django diretamente (porta 8080 dentro do Docker).

