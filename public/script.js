const messageContainer = document.getElementById('message-container');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

let username = prompt("Por favor, ingresa tu nombre:");
if (!username) {
    username = "Usuario Anónimo";
}

const userId = generateUserId();

const socket = new WebSocket('wss://chatdaw.onrender.com/');

socket.addEventListener('open', () => {
    console.log('Conexión WebSocket establecida.');
});

socket.addEventListener('message', event => {
    const receivedMessage = JSON.parse(event.data);
    const messageText = (receivedMessage.userId !== userId) ? `${receivedMessage.username}: ${receivedMessage.message}` : `Tú: ${receivedMessage.message}`;
    appendMessage(messageText);
});

sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message && socket.readyState === WebSocket.OPEN) {
        sendMessage(message);
        messageInput.value = '';
    }
});

function sendMessage(message) {
    const messageToSend = JSON.stringify({ username, message, userId });
    socket.send(messageToSend);
}

function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageContainer.appendChild(messageElement);
}

function generateUserId() {
    return Math.random().toString(36).substr(2, 9);
}






