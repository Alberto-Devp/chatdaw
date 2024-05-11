const messageContainer = document.getElementById('message-container');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

let username = prompt("Por favor, ingresa tu nombre:");
if (!username) {
    username = "Usuario Anónimo";
}

const socket = new WebSocket('wss://chatdaw.onrender.com/');

socket.addEventListener('open', () => {
    console.log('Conexión WebSocket establecida.');
});

socket.addEventListener('message', event => {
    const message = JSON.parse(event.data);
    appendMessage(`${message.username}: ${message.message}`);
});

socket.addEventListener('message', event => {
    const receivedMessage = JSON.parse(event.data);
    if (receivedMessage.username !== username) { // Verificar si el mensaje recibido no proviene del usuario actual
        appendMessage(`${receivedMessage.username}: ${receivedMessage.message}`);
    }
});


function sendMessage(message) {
    const messageToSend = JSON.stringify({ username, message });
    socket.send(messageToSend);
    appendMessage(`Tú: ${message}`);
}

function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageContainer.appendChild(messageElement);
}



