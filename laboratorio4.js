const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');
app.use(express.static(__dirname + '/public/laboratorio4'));

const usuarios = {};
io.on('connection', (socket) => {
    console.log('● Usuario conectado');
    socket.on('nuevo usuario', (nick) => {
        usuarios[socket.id] = nick;
        io.emit('usuarios conectados', Object.values(usuarios));
        console.log(`${nick} se ha conectado`);

    });

    socket.on('chat message', (msg) => {
        console.log(' ', msg);
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        const nick = usuarios[socket.id];
        delete usuarios[socket.id];
        io.emit('usuarios conectados', Object.values(usuarios));

        console.log(`${nick || 'Usuario'} se ha desconectado`);
    });
});

http.listen(3000, () => {
    console.log(' Servidor corriendo en http://localhost:3000');
});
