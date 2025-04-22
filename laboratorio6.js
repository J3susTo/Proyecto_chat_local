//Importamos el framework Express
const express = require('express');
//Creamos la instancia principal de la aplicacion
const app = express();
//Creams la instancia principalde la aplicacion
const http = require('http').createServer(app);
//Conectamos Socket.io
const io = require('socket.io')(http);
//Importa modulo path para manejar rutas
const path = require('path');

app.use(express.static(__dirname + '/public/laboratorio5'));

const usuarios = {};
io.on('connection', (socket) => {
    console.log('✔ Usuario conectado');
    socket.on('nuevo usuario', (nick) => {
        //Guardar nick
        usuarios[socket.id] = nick;
        //Enviamos a todos los usuarios el mensaje
        io.emit('mensaje sistema', `🔔 ${nick} ha entrado al chat`);
        //Enviadmos la lista actualizada
        io.emit('usuarios conectados', Object.values(usuarios));
        console.log(`${nick} se ha conectado`);
    });


    socket.on('chat message', (msg) => {
        console.log(' ', msg);
        io.emit('chat message', msg); // reenviamos el mensaje a todos
    });

    socket.on('disconnect', () => {
        const nick = usuarios[socket.id]; //Obtenemos el nick antes de eliminar
        delete usuarios[socket.id];

        //enviamos a todos el mensaje indicado que se desconecto
        io.emit('mensaje del sistema', `❎ ${nick} ha salido del chat`);

        //actualizamos la lista de usuarios conectados para todos
        io.emit('usuarios conectados', Object.values(usuarios));

        console.log(`${nick || 'Usuario'} se ha desconectado 🎊`);
    });
});

http.listen(3000, () => {
    console.log('🎧 Servidor corriendo en http://localhost:3000');
});
