const db = require('../db');

exports.guardarEncuesta = async (req, res) => {
    const {
        nombre, email, telefono, fecha,
        pregunta1, pregunta2, pregunta3, pregunta4, pregunta5, observaciones
    } = req.body;

    try {
        await db.query(
          `INSERT INTO encuestas (nombre, email, telefono, fecha, pregunta1, pregunta2, pregunta3, pregunta4, pregunta5, observaciones)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [nombre, email, telefono, fecha, pregunta1, pregunta2, pregunta3, pregunta4, pregunta5, observaciones]
        );
      
        res.status(201).json({ message: 'Encuesta guardada correctamente' });
      } catch (error) {
        console.error("❌ Error:", error); // <- consola
        res.status(500).json({ error: 'Error al guardar la encuesta', detail: error.message }); // <- respuesta clara
      }
      
};

exports.obtenerEncuestas = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM encuestas ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener encuestas', detail: error.message });
    }
};
