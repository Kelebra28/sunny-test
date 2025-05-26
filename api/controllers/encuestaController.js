const db = require('../db');

exports.guardarEncuesta = async (req, res) => {
    const {
        nombre, email, telefono, fecha,
        pregunta1, pregunta2, pregunta3, pregunta4, pregunta5, observaciones
    } = req.body;

    await db.query(
        `INSERT INTO encuestas (nombre, email, telefono, fecha, pregunta1, pregunta2, pregunta3, pregunta4, pregunta5, observaciones)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [nombre, email, telefono, fecha, pregunta1, pregunta2, pregunta3, pregunta4, pregunta5, observaciones]
    );

    res.status(201).json({ message: 'Encuesta guardada' });
};

exports.obtenerEncuestas = async (req, res) => {
    const [rows] = await db.query('SELECT * FROM encuestas ORDER BY created_at DESC');
    res.json(rows);
};
