var express = require('express')
var app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);

//Static paths to View and Script
app.use(express.static(__dirname + '/View'));
app.use('/style',express.static(__dirname + '/Script'));

//Static paths to dependencies
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

app.get('/', function(req, res){
  res.sendFile('/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3000,'0.0.0.0', function(){
  console.log('listening on *:3000');
});
