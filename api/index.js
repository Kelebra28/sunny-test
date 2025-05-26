const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/encuesta', require('./routes/encuesta'));
app.use('/api/auth', require('./routes/auth'));

const PORT = 3000;
app.listen(PORT, () => console.log(`✅ API corriendo en http://localhost:${PORT}`));
