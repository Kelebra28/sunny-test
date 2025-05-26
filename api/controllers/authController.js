const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET = 'tu_secreto_super_seguro';

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const [rows] = await db.query('SELECT * FROM admins WHERE email = ?', [email]);

    if (rows.length === 0) return res.status(401).json({ message: 'Usuario no encontrado' });

    const admin = rows[0];
    const valid = await bcrypt.compare(password, admin.password_hash);

    if (!valid) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: admin.id, email: admin.email }, SECRET, { expiresIn: '2h' });

    res.json({ token });
};
