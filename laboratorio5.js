const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

app.use(express.static(__dirname + '/public/laboratorio5'));

const usuarios = {};
const mensajes = [];

io.on('connection', (socket) => {
    console.log('✔ Usuario conectado');

    socket.emit('Chat message', mensajes);

    socket.on('nuevo usuario', (nick) => {
        usuarios[socket.id] = nick;

        io.emit('Chat message', `🔔 ${nick} ha entrado al chat`);
        io.emit('lista usuarios', Object.values(usuarios));

        console.log(`${nick} se ha conectado`);
    });

    socket.on('Chat message', (msg) => {
        console.log('💬', msg);

        mensajes.push(msg);

        if (mensajes.length > 20) {
            mensajes.shift(); 
        }

        io.emit('Chat message', msg);
    });

    socket.on('disconnect', () => {
        const nick = usuarios[socket.id];
        delete usuarios[socket.id];

        io.emit('lista usuarios', Object.values(usuarios));
        if (nick) {
            io.emit('Chat message', `❌ ${nick} ha salido del chat`);
            console.log(`${nick} se ha desconectado`);
        } else {
            console.log('Un usuario anónimo se ha desconectado');
        }
    });
});

http.listen(3000, () => {
    console.log('🚀 Servidor corriendo en http://localhost:3000');
});
