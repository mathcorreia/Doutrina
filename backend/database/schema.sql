PRAGMA foreign_keys = ON;

CREATE TRIGGER update_users_updated_at
AFTER UPDATE ON users
FOR EACH ROW
BEGIN
    UPDATE users SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
END;
CREATE TABLE freelancers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL UNIQUE,
    cpf TEXT NOT NULL UNIQUE,
    data_nascimento TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE companies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL UNIQUE,
    cnpj TEXT NOT NULL UNIQUE,
    data_fundacao TEXT,
    telefone TEXT,
    informacoes_empresa TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    budget REAL,
    status TEXT DEFAULT 'aberto' CHECK(status IN ('aberto', 'em_andamento', 'concluido', 'cancelado')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
);

CREATE TRIGGER update_projects_updated_at
AFTER UPDATE ON projects
FOR EACH ROW
BEGIN
    UPDATE projects SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
END;
CREATE TABLE proposals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER NOT NULL,
    freelancer_id INTEGER NOT NULL,
    valor REAL NOT NULL,
    prazo_entrega TEXT,
    mensagem_proposta TEXT,
    status TEXT DEFAULT 'enviada' CHECK(status IN ('enviada', 'aceita', 'recusada')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (freelancer_id) REFERENCES freelancers(id) ON DELETE CASCADE
);

CREATE TRIGGER update_proposals_updated_at
AFTER UPDATE ON proposals
FOR EACH ROW
BEGIN
    UPDATE proposals SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
END;
CREATE TABLE reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER NOT NULL,
    freelancer_id INTEGER NOT NULL,
    company_id INTEGER NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (freelancer_id) REFERENCES freelancers(id),
    FOREIGN KEY (company_id) REFERENCES companies(id)
);
