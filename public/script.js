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
    const message = event.data;
    appendMessage(message);
});

sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message && socket.readyState === WebSocket.OPEN) {
        sendMessage(message);
        messageInput.value = '';
    }
});

function sendMessage(message) {
    const messageToSend = `${username}: ${message}`;
    if (typeof messageToSend === 'string' && messageToSend.trim().length > 0 && socket.readyState === WebSocket.OPEN) {
        socket.send(messageToSend);
        appendMessage(`Tú: ${message}`);
    }
}


function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageContainer.appendChild(messageElement);
}



