# FreelaHub - Interface do Usuário (Frontend)

Este repositório contém o código-fonte do frontend da plataforma FreelaHub. Desenvolvido como uma **Single Page Application (SPA)** usando o framework **Angular**, ele é responsável por toda a interface e experiência do usuário.

## Visão Geral

O frontend consome a API RESTful do backend para criar uma experiência de usuário fluida e interativa. Ele permite que os usuários se cadastrem, façam login, visualizem projetos, enviem propostas e gerenciem suas atividades na plataforma sem a necessidade de recarregar a página a cada ação.

## Tecnologias Utilizadas

* **Angular:** Framework principal para a construção da interface.
* **TypeScript:** Linguagem de programação que adiciona tipagem estática ao JavaScript.
* **HTML5 & CSS:** Para a estrutura e estilização das páginas.
* **Angular Router:** Para gerenciar a navegação entre as diferentes seções da aplicação.
* **Reactive Forms:** Para a criação e validação de formulários complexos como os de cadastro e criação de projetos.

## Pré-requisitos

Para executar o frontend, você precisará ter instalado:
* [Node.js](https://nodejs.org/) (versão 20.x ou superior, que inclui o `npm`)
* [Angular CLI](https://angular.dev/cli) (instalado globalmente via `npm install -g @angular/cli`)

## Guia de Instalação e Execução Local

Siga estes passos para configurar e executar o frontend em seu ambiente de desenvolvimento:

1.  **Navegue até a pasta correta do frontend:**
    *Atenção: entre na subpasta `frontend`.*
    ```bash
    cd frontend/frontend
    ```

2.  **Instale as dependências do Node.js:**
    Este comando irá baixar todas as bibliotecas que o Angular precisa para funcionar.
    ```bash
    npm install
    ```

3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    ng serve
    ```
    Acesse a aplicação em `http://localhost:4200/` no seu navegador. O servidor irá recarregar a página automaticamente sempre que você salvar uma alteração nos arquivos.

## Funcionalidades Implementadas

* **Cadastro e Login:** Sistema de autenticação completo com formulários distintos para 'Empresas' e 'Freelancers'.
* **Navegação Protegida (Guards):** Rotas específicas como `/dashboard`, `/my-projects` e `/my-proposals` são protegidas e só podem ser acessadas por usuários autenticados e com o perfil correto.
* **Dashboards Dinâmicos:** A página de dashboard exibe menus e ações diferentes com base no tipo de usuário logado.
* **Interação com Projetos e Propostas:**
    * Empresas podem criar projetos através de um formulário dedicado.
    * Freelancers podem visualizar projetos e enviar propostas detalhadas.
    * Empresas podem visualizar todas as propostas recebidas para seus projetos.
* **Páginas de Gerenciamento Pessoal:**
    * `/my-projects`: Página para empresas verem os projetos que publicaram.
    * `/my-proposals`: Página para freelancers verem as propostas que enviaram.

## Publicação no GitHub Pages

Para publicar o frontend na internet, siga os passos abaixo:

1.  **Navegue até a pasta do projeto Angular:**
    ```bash
    cd frontend/frontend
    ```
2.  **Instale a ferramenta de deploy (se ainda não o fez):**
    ```bash
    npm install angular-cli-ghpages --save-dev
    ```
3.  **Execute o comando de build e deploy:**
    *Lembre-se de substituir `FreelaHub` pelo nome exato do seu repositório no GitHub.*
    ```bash
    npx angular-cli-ghpages --base-href=/FreelaHub/
    ```
4.  **Configure o GitHub Pages:** Vá até as configurações do seu repositório no GitHub, na seção "Pages", e configure a fonte de publicação para a branch `gh-pages`.

## Equipe do Projeto

* **Matheus Correia** - *Desenvolvedor Full-Stack* - [mathcorreia](https://github.com/mathcorreia)
* **João Victor**
*  **Renilson Micael**
