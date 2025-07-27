-- Create tables based on entities

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    state VARCHAR(50) DEFAULT 'ACTIVE'
);

CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    owner_id INT NOT NULL,
    state VARCHAR(50) DEFAULT 'ACTIVE',
    CONSTRAINT fk_owner FOREIGN KEY (owner_id) REFERENCES users (id)
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'PENDING',
    assigned_to_id INT NOT NULL,
    project_id INT NOT NULL,
    due_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    state VARCHAR(50) DEFAULT 'ACTIVE',
    CONSTRAINT fk_assigned_to FOREIGN KEY (assigned_to_id) REFERENCES users (id),
    CONSTRAINT fk_project FOREIGN KEY (project_id) REFERENCES projects (id)
);

-- Insert test data

INSERT INTO users (username, email, password, role) VALUES
('administrador', 'admin@example.com', '$2a$10$HhSArycxXYdN3K/AIHI7Q.zPGqHNLGgx5BW6R8CQkAEieKZQr40q.', 'ADMIN'),
('usuario', 'user1@example.com', '$2a$10$HhSArycxXYdN3K/AIHI7Q.zPGqHNLGgx5BW6R8CQkAEieKZQr40q.', 'USER');

INSERT INTO projects (name, description, owner_id) VALUES
('Project A', 'Description for Project A', 1),
('Project B', 'Description for Project B', 2);

INSERT INTO tasks (title, description, status, assigned_to_id, project_id, due_date) VALUES
('Task 1', 'Description for Task 1', 'PENDING', 2, 1, '2025-12-31'),
('Task 2', 'Description for Task 2', 'IN_PROGRESS', 3, 1, '2025-11-30'),
('Task 3', 'Description for Task 3', 'DONE', 2, 2, '2025-10-15');
