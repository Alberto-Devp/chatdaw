// Obtener elementos del DOM
const messageContainer = document.getElementById('message-container');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// Conectar WebSocket
const socket = new WebSocket('ws://localhost:3000');

// Manejar la recepción de mensajes del servidor
socket.addEventListener('message', event => {
    const message = event.data;
    appendMessage(message);
});

// Enviar mensaje al hacer clic en el botón de enviar
sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message) {
        sendMessage(message);
        messageInput.value = '';
    }
});

// Función para enviar mensajes al servidor
function sendMessage(message) {
    socket.send(message);
    appendMessage(`Tú: ${message}`);
}

// Función para agregar mensajes al contenedor de mensajes
function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageContainer.appendChild(messageElement);
}
