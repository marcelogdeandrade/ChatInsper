var express = require('express')
var app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);

//Static paths to View and Script
app.use(express.static(__dirname + '/View'));
app.use('/style',express.static(__dirname + '/css'));
app.use('/model',express.static(__dirname + '/Model'));


//Static paths to dependencies
// app.use(express.static(__dirname + '/public'));

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
//End Dependencies

var people_connected = [];

app.get('/', function(req, res){
    res.sendFile('/index.html');
});

io.on('connection', function(socket){
    id = socket.id;
    io.to(id).emit('update list connected', people_connected)
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
    socket.on('add connected', function(msg){
        io.emit('add connected', msg);
        var data = {
            id : socket.id,
            text : msg.text
        };
        people_connected.push(data);
    });
    socket.on('disconnect', function(){
        io.emit('delete person list', socket.id);
        people_connected = people_connected.filter(function( obj ) {
            return obj.id !== socket.id;
        });
    });
});

http.listen(3000,'0.0.0.0', function(){
  console.log('listening on *:3000');
});
