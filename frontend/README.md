# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Projeto Competições Esportivas

Este projeto é composto por um sistema completo com Frontend e Backend para gerenciamento de competições esportivas.

## 🏗️ Estrutura do Projeto
* `/frontend`: Interface do usuário.
* `/backend`: API, regras de negócio e banco de dados.

## 📊 Modelagem do Banco de Dados (MySQL)
Abaixo está o diagrama do banco de dados gerado no MySQL Workbench:

![Esquema do Banco de Dados](backend/sql/esquema-banco.png)

## 🚀 Como rodar o projeto
1. Clone o repositório.
2. Importe o arquivo `banco.sql` no seu MySQL.
3. Instale as dependências no front e no back...
