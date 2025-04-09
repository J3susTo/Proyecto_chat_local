const express = require("express");
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/public/laboratorio1'));

io.on('connection', (Socket) => {
    console.log('Usuario conectado👏');

    Socket.on('disconnect', () =>{
        console.log('Usario desconectado 🚩');
    })
})

http.listen(3000, ()=>{
    console.log('Servidor activo en http://localhost:3000');
});