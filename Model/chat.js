var Message;
var socket = io();
// Message function
Message = function (arg) {
    this.text = arg.text, this.message_side = arg.message_side;
    this.draw = function (_this) {
        return function () {
            var $message;
            $message = $($('.message_template').clone().html());
            $message.addClass(_this.message_side).find('.text').html(_this.text);
            $('.messages').append($message);
            return setTimeout(function () {
                return $message.addClass('appeared');
            }, 0);
        };
    }(this);
    return this;
};

var getMessageText, message_side, sendMessage;

// GetMessageText function
getMessageText = function () {
    var $message_input;
    $message_input = $('.message_input');
    return $message_input.val();
};

// SendMessage function
sendMessage = function (text, message_side) {
    var $messages, message;
    if (text.trim() === '') {
        return;
    }
    $messages = $('.messages');
    message = new Message({
        text: text,
        message_side: message_side
    });
    message.draw();
    return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
};

// Send message when click send button
$('.send_message').click(function (e) {
    var data={
        text : getMessageText(),
        id : socket.io.engine.id.toString()
        };
    socket.emit('chat message', data);
    $('.message_input').val(''); //Delete input text
    return false;
});

// Send message when submit form
$('form').submit(function(){
    var data={
        text : getMessageText(),
        id : socket.io.engine.id.toString()
        };
    socket.emit('chat message', data);
    $('.message_input').val(''); //Delete input text
    return false;
});

// CLIENT -- Socket on emit function
socket.on('chat message', function(data){
    var text = data.text
    var id = data.id
    if (id == socket.io.engine.id.toString()){
        sendMessage(text,'right');
    }
    else {
        sendMessage(text,'left');
    }

});
