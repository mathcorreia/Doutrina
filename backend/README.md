# ⚙️ FreelaHub - API Backend (Laravel)

Este arquivo é específico para quem for trabalhar na API. Ele detalha os endpoints e a configuração do Laravel.
Este diretório contém a API RESTful do projeto FreelaHub, desenvolvida com o framework Laravel. Ela é responsável por toda a lógica de negócios, gerenciamento do banco de dados e autenticação.


---

# 🖥️ Tecnologias
- **PHP 8+**
- **Laravel 11+**
- **SQLite**
- **Laravel Sanctum** para autenticação de API.
- **Eloquent ORM**

---

# 🛠️ Instalação e Execução (Apenas Backend)

```bash
# 1. Instale as dependências
composer install

# 2. Configure o arquivo de ambiente
cp .env.example .env
php artisan key:generate

# 3. Crie o banco de dados e rode as migrations
touch database/database.sqlite
php artisan migrate

# 4. Crie o link para a pasta de armazenamento
php artisan storage:link

# 5. Inicie o servidor da API
php artisan serve
```

# 🗺️ Endpoints Principais da API
Todos os endpoints são prefixados com /api.
```Markdown
- Método  | URI |	Ação |	Protegido?
- POST	| /signup  | 	Registra um novo usuário (freela/empresa) |	Não
- POST	| /login  |  	Autentica um usuário e retorna um token   | Não
- GET	    | /projects  | 	Lista todos os projetos	|  Não
- GET  |	/projects/{id}  | 	Exibe os detalhes de um projeto |	Não
- POST  | 	/projects  | 	Cria um novo projeto |	Sim
- POST  |	/proposals | 	Envia uma proposta para um projeto |	Sim
- POST  |	/user/profile-photo  | 	Faz o upload da foto de perfil do usuário |	Sim
- POST  |	/reviews  |	Cria uma nova avaliação | 	Sim
