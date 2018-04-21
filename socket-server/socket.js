// const express = require('express');
// const http = require('http');
// const socketio = require('socket.io');

// const app = express();
// const server = http.Server(app);
// const websocket = socketio(server);

// app.use(express.static(__dirname + '/../client/public'));

// server.listen(3000, () => console.log('listening on *:3000'));

// websocket.on('connection', (socket) => {
//   console.log('A client just joined on', socket.id);
//   socket.on('new-message', (msg) => {
//     console.log(msg);
//     websocket.emit('msg', 'hello');
//   }); 
// });
