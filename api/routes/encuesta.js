const express = require('express');
const router = express.Router();
const { guardarEncuesta, obtenerEncuestas } = require('../controllers/encuestaController');
const { verificarToken } = require('../middlewares/authMiddleware');

router.post('/', guardarEncuesta);
router.get('/todas', verificarToken, obtenerEncuestas);

module.exports = router;
