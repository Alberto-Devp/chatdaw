const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static('public'));

wss.on('connection', ws => {
    console.log('Cliente conectado.');

    ws.on('message', message => {
        const parsedMessage = JSON.parse(message);
        console.log(`Mensaje recibido de ${parsedMessage.username}: ${parsedMessage.message}`);
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});


const PORT = 3000;
server.listen(PORT, () => console.log(`Servidor WebSocket en ejecución en el puerto ${PORT}.`));

