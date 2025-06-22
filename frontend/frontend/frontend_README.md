# 🎨 FreelaHub - Aplicação Frontend (Angular)

Este arquivo é para quem for trabalhar na interface do usuário com Angular.
Este diretório contém a Single-Page Application (SPA) do projeto FreelaHub, desenvolvida com o framework Angular. A aplicação é responsável por toda a interface do usuário e consome a API RESTful do backend em Laravel.

---

## 🖥️ Tecnologias
- **Angular 17+**
- **TypeScript**
- **Angular Router** para navegação.
- **Reactive Forms** para formulários.
- **HTTP Client & Interceptors** para comunicação com a API.
- **CSS3/SCSS** para estilização.

---

# 🛠️ Instalação e Execução 

**Pré-requisito:** O backend em Laravel deve estar rodando em `http://localhost:8000`.

```bash
# 1. Instale as dependências do Node.js
npm install

# 2. Inicie o servidor de desenvolvimento
ng serve --open
```
A aplicação estará disponível em http://localhost:4200.

# 📂 Arquitetura do Frontend

A estrutura de pastas foi organizada para escalabilidade:

- src/app/components/: Componentes reutilizáveis (Header, Footer, etc.).
- src/app/pages/: Componentes que representam uma página inteira e são usados no roteamento (Login, Home, ProjectList).
- src/app/services/: Serviços responsáveis pela lógica de negócios e comunicação com a API (AuthService, ProjectService).
- src/app/guards/: Lógica para proteger rotas (ex: garantir que só empresas acessem certas páginas).
- src/app/interceptors/: Lógica para interceptar e modificar requisições HTTP (ex: adicionar o token de autenticação).
- src/styles.css: Arquivo de estilos globais para toda a aplicação.
