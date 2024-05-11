const express = require('express');
const router = express.Router();

// Definir rutas para el chat
router.get('/', (req, res) => {
    res.send('Bienvenido al chat.');
});

module.exports = router;
