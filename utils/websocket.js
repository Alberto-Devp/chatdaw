const WebSocket = require('ws');

function initializeWebSocket(server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', ws => {
        console.log('Cliente conectado al WebSocket.');

        ws.on('message', message => {
            console.log(`Mensaje recibido: ${message}`);
            // Aquí puedes agregar la lógica para manejar los mensajes recibidos desde el cliente
        });
    });
}

module.exports = initializeWebSocket;
