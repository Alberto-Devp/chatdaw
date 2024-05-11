const messageContainer = document.getElementById('message-container');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

let username = prompt("Por favor, ingresa tu nombre:");
if (!username) {
    username = "Usuario Anónimo";
}

const socket = new WebSocket('wss://chatdaw.onrender.com:3000/');

socket.addEventListener('message', event => {
    const message = event.data;
    appendMessage(message);
});

sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message) {
        sendMessage(message);
        messageInput.value = '';
    }
});

function sendMessage(message) {
    socket.send(`${username}: ${message}`);
    appendMessage(`Tú: ${message}`);
}

function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageContainer.appendChild(messageElement);
}


