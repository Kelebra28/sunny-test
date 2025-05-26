const jwt = require('jsonwebtoken');
const SECRET = 'tu_secreto_super_seguro';

exports.verificarToken = (req, res, next) => {
    const auth = req.headers.authorization;

    if (!auth) return res.status(401).json({ message: 'Falta token' });

    const token = auth.split(' ')[1];

    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token inválido' });
    }
};
