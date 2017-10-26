const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.broadcast.emit('new connection', {text: 'A new user has connected'})

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg)
  });

  socket.on('typing', () => {
    io.emit('user typing')
  })

  socket.on('empty', () => {
    io.emit('user not typing')
  })

  socket.on('disconnect', () => {
    io.emit('lost connection', {text: 'Someone has disconnected'})
  });
});


http.listen(3000, () => {
  console.log('listening on *:3000');
});
