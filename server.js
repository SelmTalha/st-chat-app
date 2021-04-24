const express = require('express');
const app = require('express')();
const PORT = process.env.PORT || 3000;
// const renk = Math.floor((Math.random()*255) + 1) + ',' +Math.floor((Math.random()*255) + 1) + ','+ Math.floor((Math.random()*255) + 1) ;
const server = require('http').Server(app); // app.listen(3000);
const socket = require('socket.io');
const io = socket(server);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

server.listen(PORT);

app.use(express.static('public'));

io.on("connection",(socket) => {
    console.log('Yeni kullanıcı bağlandı !');
    socket.on('disconnect', () => console.log('Kullanıcı bağlantısı sona erdirildi !'));
    console.log(socket.id);
    
    socket.on('chat',data =>{
        io.sockets.emit('chat',data);
    })
    socket.on('typing',data =>{
        socket.broadcast.emit('typing',data);
    }) 
})
