const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/encuesta', require('./routes/encuesta'));
app.use('/api/auth', require('./routes/auth'));

app.listen(3000, () => {
    console.log('API corriendo en http://localhost:3000');
});
