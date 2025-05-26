CREATE DATABASE encuestas_app;
USE encuestas_app;

CREATE TABLE encuestas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    email VARCHAR(100),
    telefono VARCHAR(20),
    fecha DATE,
    pregunta1 INT,
    pregunta2 INT,
    pregunta3 INT,
    pregunta4 INT,
    pregunta5 INT,
    observaciones TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE,
    password_hash VARCHAR(255)
);