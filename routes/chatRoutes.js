const express = require('express');
const router = express.Router();

// Definir rutas para el chat
router.get('/', (req, res) => {
    res.sendFile('index.html', { root: './public' });
});

module.exports = router;
