# 🚀 *FreelaHub* - Conectando Talentos ao Sucesso
FreelaHub é uma plataforma web full-stack, moderna e intuitiva, que conecta freelancers a empresas. O objetivo é criar um ecossistema digital onde empresas possam postar projetos e freelancers possam encontrar oportunidades, com a plataforma facilitando a comunicação, a contratação e a avaliação mútua.

&lt;br>

🔗 Link para o Design no Figma: Acesse o protótipo do FreelaHub aqui

# 🖥️ Tecnologias Utilizadas
Este projeto foi construído com uma arquitetura de API RESTful no backend e uma Single-Page Application (SPA) no frontend.

## Backend (Laravel)
✅ PHP 8+ 
<br>
✅ Laravel 11+: Um framework PHP robusto e elegante.
<br>
✅ SQLite: Banco de dados leve e baseado em arquivo, ideal para desenvolvimento.
<br>
✅ Laravel Sanctum: Para autenticação de API segura e baseada em tokens.
<br>
✅ Eloquent ORM: Para manipulação de dados de forma intuitiva e segura.


## Frontend (Angular)
✅ Angular 17+: Um framework de ponta para criar aplicações web dinâmicas.
<br>
✅ TypeScript: Superset do JavaScript que adiciona tipagem estática.
<br>
✅ HTML5 & CSS3/SCSS: Para estruturação e estilização modernas.
<br>
✅ Angular Router: Para criar uma experiência de navegação fluida de Single-Page Application (SPA).
<br>
✅ Reactive Forms: Para criar formulários robustos e escaláveis.
<br>
✅ HTTP Client & Interceptors: Para uma comunicação eficiente e segura com a API.

## 🎯 Funcionalidades Implementadas

### 👩‍💼 Para Empresas
Autenticação Segura: Cadastro e Login específicos para empresas.
<br>
Gerenciamento de Projetos: Publicação de novos projetos com título, descrição e orçamento.
<br>
Visualização de Propostas: Acesso a uma lista de propostas enviadas por freelancers para seus projetos.
<br>
Navegação Protegida: Acesso exclusivo à página de criação de projetos através de Guards.

### 💼 Para Freelancers
Autenticação Segura: Cadastro e Login específicos para freelancers.
<br>
Visualização de Oportunidades: Navegação em uma lista de projetos disponíveis.
<br>
Envio de Propostas: Formulário para enviar propostas com valor e mensagem de apresentação.
<br>
Perfil Personalizado: Base para futuras implementações, como upload de foto de perfil.
```
 📂 Estrutura do Projeto
O projeto é organizado em duas pastas principais: backend e frontend, permitindo um desenvolvimento desacoplado.

📁 FreelaHub/
├── 📁 backend/         # Contém a aplicação Laravel (API)
│   ├── app/
│   ├── database/
│   │   └── database.sqlite   # O arquivo do banco de dados
│   ├── routes/
│   │   └── api.php           # Definição dos endpoints da API
│   └── ...
│
└── 📁 frontend/        # Contém a aplicação Angular (SPA)
    └── 📁 frontend/
        ├── src/
        │   ├── app/
        │   │   ├── components/ # Componentes reutilizáveis (Header, Home)
        │   │   ├── guards/     # Guards de rota (company.guard)
        │   │   ├── interceptors/ # Interceptadores HTTP (auth.interceptor)
        │   │   ├── pages/      # Componentes de página (Login, Signup)
        │   │   └── services/   # Serviços (Auth, Project)
        │   ├── assets/
        │   └── styles.css      # Estilos globais
        └── ...
```
        
## 🛠️ Instalação e Execução

Para rodar este projeto localmente, siga os passos abaixo.

Pré-requisitos
PHP >= 8.1
Composer
Node.js e npm
Angular CLI (npm install -g @angular/cli)

## 1. Configuração do Backend (API Laravel)
Bash
```
### 1. Navegue até a pasta do backend
cd backend

### 2. Instale as dependências do PHP
composer install

### 3. Crie o arquivo de ambiente a partir do exemplo
cp .env.example .env

### 4. Gere a chave da aplicação
php artisan key:generate

### 5. Crie o arquivo do banco de dados SQLite
touch database/database.sqlite

### 6. Rode as migrations para criar as tabelas
php artisan migrate

### 7. Crie o link simbólico para o armazenamento público
php artisan storage:link

### 8. Inicie o servidor da API (geralmente na porta 8000)
php artisan serve
```

## 2. Configuração do Frontend (App Angular)
Bash
```
### 1. Em um novo terminal, navegue até a pasta do frontend
cd frontend/frontend

### 2. Instale as dependências do Node.js
npm install

### 3. Inicie o servidor de desenvolvimento do Angular (geralmente na porta 4200)
ng serve --open
```
Sua aplicação estará rodando! O frontend (Angular) em http://localhost:4200 se comunicará com o backend (Laravel) em http://localhost:8000.

# 🚧 Funcionalidades Futuras
Sistema de chat em tempo real entre empresas e freelancers.
Painel administrativo para gerenciamento de usuários e projetos.
Notificações automáticas por e-mail ou na plataforma.
Integração de sistema de pagamentos (Stripe/PayPal).
Filtros avançados para busca de projetos e freelancers.
Implementação completa da funcionalidade de avaliações (reviews).

# 📄 Licença
Este projeto está sob a licença MIT. Sinta-se livre para usar, modificar e contribuir!

## Equipe do Projeto

* **Matheus Correia** - *Desenvolvedor Full-Stack* - [mathcorreia](https://github.com/mathcorreia)
