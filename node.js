const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');
const CryptoJS = require('crypto-js');

// Generar una clave secreta
const secretKey = 'supersecretkey';

// Crear servidor HTTP
const server = http.createServer((req, res) => {
  // Servir el cliente web
  fs.readFile(__dirname + '/index.html', (err, data) => {
    if (err) {
      res.writeHead(500);
      return res.end('Error cargando el archivo index.html');
    }
    res.writeHead(200);
    res.end(data);
  });
});

// Crear servidor WebSocket
const wss = new WebSocket.Server({ server });

// Manejo de conexiones WebSocket
wss.on('connection', ws => {
  console.log('Cliente conectado');

  // Función para cifrar un mensaje
  function encryptMessage(message) {
    return CryptoJS.AES.encrypt(message, secretKey).toString();
  }

  // Función para descifrar un mensaje
  function decryptMessage(encryptedMessage) {
    const bytes  = CryptoJS.AES.decrypt(encryptedMessage, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  // Manejar mensajes recibidos
  ws.on('message', message => {
    console.log('Mensaje cifrado recibido:', message);
    const decryptedMessage = decryptMessage(message);
    console.log('Mensaje descifrado:', decryptedMessage);
    
    // Reenviar mensaje a todos los clientes
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Manejar cierre de conexión
  ws.on('close', () => {
    console.log('Cliente desconectado');
  });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor de chat iniciado en el puerto ${PORT}`);
});
