const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Manejar conexiones WebSocket
wss.on('connection', ws => {
    console.log('Cliente conectado.');

    // Manejar mensajes recibidos del cliente
    ws.on('message', message => {
        console.log(`Mensaje recibido: ${message}`);
        // Reenviar el mensaje a todos los clientes conectados
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'frontend')));

const PORT = 3000;
server.listen(PORT, () => console.log(`Servidor WebSocket en ejecución en el puerto ${PORT}.`));

