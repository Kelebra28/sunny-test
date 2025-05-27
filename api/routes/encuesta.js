const express = require('express');
const router = express.Router();
const { guardarEncuesta, obtenerEncuestas } = require('../controllers/encuestaController');
const { verificarToken } = require('../middlewares/authMiddleware');

router.get('/', (req, res) => {
    res.send('🎉 API de encuestas activa');
  });
router.post('/', guardarEncuesta);
router.get('/todas', verificarToken, obtenerEncuestas);

module.exports = router;
