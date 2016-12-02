var express = require('express')
var app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);

//Static paths to View and Script
app.use(express.static(__dirname + '/View'));
app.use('/style',express.static(__dirname + '/css'));
app.use('/model',express.static(__dirname + '/Model'));


//Static paths to dependencies
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

var people_connected = []; //List of people connected to server
var messages = {};

app.get('/', function(req, res){
    res.sendFile('/index.html');
});

//When someone connects to server
io.on('connection', function(socket){
    id = socket.id;  //ID of client connected
    // Pass list of connected people to new person
    io.to(id).emit('update list connected', people_connected)

    //New message socket function
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });

    //New person connected socket function
    socket.on('add connected', function(msg){
        io.emit('add connected', msg);

        //Object with person name and id
        var data = {
            id : socket.id,
            text : msg.text
        };
        people_connected.push(data);
    });

    //Function when someone disconnects
    socket.on('disconnect', function(){
        io.emit('delete person list', socket.id);

        //Update list removing person that disconnected
        people_connected = people_connected.filter(function( obj ) {
            return obj.id !== socket.id;
        });
    });
});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on', http.address().port);
});
