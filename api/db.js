const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'localhost',
    user: 'tu_usuario',
    password: 'tu_contraseña',
    database: 'nombre_bd'
});

module.exports = db;
