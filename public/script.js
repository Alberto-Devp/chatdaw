const messageContainer = document.getElementById('message-container');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

const socket = new WebSocket('ws://localhost:3000');

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
    socket.send(message);
    appendMessage(`Tú: ${message}`);
}

function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageContainer.appendChild(messageElement);
}

