const mongoose = require('mongoose');

// Definir el esquema del mensaje
const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

// Crear un modelo a partir del esquema
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
