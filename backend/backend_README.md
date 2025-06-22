# FreelaHub - API (Backend)

Este repositório contém o código-fonte do backend da plataforma FreelaHub. Ele foi desenvolvido em Laravel e funciona como uma API RESTful, responsável por toda a lógica de negócio, interações com o banco de dados e autenticação de usuários.

## Visão Geral

O FreelaHub é um marketplace projetado para conectar empresas que necessitam de serviços a freelancers qualificados. O backend gerencia as seguintes entidades principais:
* **Usuários:** Com perfis distintos para 'Empresa' e 'Freelancer'.
* **Projetos:** Publicados por empresas.
* **Propostas:** Enviadas por freelancers para os projetos.

## Tecnologias Utilizadas

* **PHP:** Linguagem de programação principal.
* **Laravel:** Framework PHP para construção de APIs robustas.
* **Laravel Sanctum:** Para um sistema de autenticação seguro e baseado em tokens (SPA).
* **SQLite:** Banco de dados relacional leve e baseado em arquivo, ideal para desenvolvimento.

## Pré-requisitos

Antes de começar, certifique-se de que você tem o seguinte software instalado em sua máquina:
* PHP (versão 8.2 ou superior)
* Composer (gerenciador de dependências para PHP)

## Guia de Instalação e Execução Local

Siga estes passos para configurar e executar o backend em seu ambiente de desenvolvimento:

1.  **Clone o repositório** (se ainda não o fez).

2.  **Navegue até a pasta do backend:**
    ```bash
    cd backend
    ```

3.  **Instale as dependências do PHP via Composer:**
    ```bash
    composer install
    ```

4.  **Crie seu arquivo de ambiente:**
    Copie o arquivo de exemplo `.env.example` para um novo arquivo chamado `.env`.
    ```bash
    cp .env.example .env
    ```

5.  **Gere a chave da aplicação Laravel:**
    Este é um passo crucial para a segurança da aplicação.
    ```bash
    php artisan key:generate
    ```

6.  **Crie o arquivo do banco de dados SQLite:**
    Este comando cria um arquivo vazio que será usado como seu banco de dados.
    ```bash
    touch database/database.sqlite
    ```

7.  **Execute as Migrations:**
    Este comando irá criar todas as tabelas (`users`, `companies`, `freelancers`, `projects`, `proposals`) no banco de dados.
    ```bash
    php artisan migrate
    ```

8.  **Inicie o servidor de desenvolvimento:**
    ```bash
    php artisan serve
    ```

Pronto! A API estará rodando e acessível em `http://127.0.0.1:8000`.

## Endpoints da API

A API expõe os seguintes endpoints para o frontend consumir:

| Método | Rota                | Descrição                                      | Autenticação Requerida? |
| :----- | :------------------ | :--------------------------------------------- | :---------------------- |
| `POST` | `/api/register`     | Registra um novo usuário (empresa ou freelancer).| Não                     |
| `POST` | `/api/login`        | Autentica um usuário e retorna um token.       | Não                     |
| `GET`  | `/api/projects`     | Lista todos os projetos disponíveis.           | Não                     |
| `GET`  | `/api/projects/{id}`| Busca os detalhes de um projeto específico.    | Não                     |
| `POST` | `/api/logout`       | Desconecta o usuário logado.                   | **Sim** |
| `POST` | `/api/projects`     | Uma empresa publica um novo projeto.           | **Sim (Empresa)** |
| `POST` | `/api/proposals`    | Um freelancer envia uma proposta.              | **Sim (Freelancer)** |
| `GET`  | `/api/my-projects`  | Lista os projetos da empresa logada.           | **Sim (Empresa)** |
| `GET`  | `/api/my-proposals` | Lista as propostas do freelancer logado.       | **Sim (Freelancer)** |


## Equipe do Projeto

* **Matheus Correia** - *Desenvolvedor Full-Stack* - [mathcorreia](https://github.com/mathcorreia)
* **João Victor**
*  **Renilson Micael**