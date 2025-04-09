
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

app.use(express.static(__dirname + '/public/laboratorio2'));
io.on('connection', (socket) => {
    console.log('✅ Usuario conectado');
    socket.on('chat message', (msg) => {
        console.log(' Mensaje recibido:', msg); io.emit('chat message', msg);
    });
    socket.on('disconnect', () => {
        console.log('❌ Usuario desconectado');
    });
});
http.listen(3000, () => {
    console.log('🚀 Servidor corriendo en http://localhost:3000');
});
