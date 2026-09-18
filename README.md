# Projeto Teste Jenkins - Tela de Login

Projeto simples de tela de login construído com React, TypeScript e Vite, usado para praticar integração contínua com Jenkins.

## Funcionalidades

- Formulário de login com campos de e-mail e senha
- Validação de e-mail (formato válido) e senha (mínimo de 6 caracteres)
- Mensagem de sucesso simulada ao enviar dados válidos

## Como rodar localmente

```bash
npm install
npm run dev
```

A aplicação ficará disponível em `http://localhost:5173`.

## Como rodar os testes

```bash
npm test
```

Para rodar os testes uma única vez (sem watch mode), como é feito no pipeline de CI:

```bash
npm run test:ci
```

## Build de produção

```bash
npm run build
```

## CI/CD

O `Jenkinsfile` na raiz do projeto define uma pipeline declarativa com os estágios Checkout, Install Dependencies, Test e Build.
