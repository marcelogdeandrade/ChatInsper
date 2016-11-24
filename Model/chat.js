var nome;

//Angular
angular.module('myApp', ['ngMaterial'])

.controller('AppCtrl', function($scope, $mdDialog) {
  $scope.status = '  ';
  $scope.customFullscreen = false;

  $scope.showPrompt = function() {
   // Appending dialog to document.body to cover sidenav in docs app
   var confirm = $mdDialog.prompt()
     .title('Qual é o seu nome?')
    //  .textContent('Bowser is a common name.')
     .placeholder('Seu nome')
     .ariaLabel('Seu Nome')
    // .initialValue('Buddy')
    //.targetEvent(ev)
    //  .ok('Okay!')
    //  .cancel('IOk');

   $mdDialog.show(confirm).then(function(result) {
     nome = result.slice(0,2).toUpperCase();
     $scope.status = 'You decided to name your dog ' + result + '.';
   }, function() {
     $scope.status = 'You didn\'t name your dog.';
   });
 };

  function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }
});

//SOCKET IO

var Message;
var socket = io();
// Message function
Message = function (arg) {
    this.text = arg.text, this.message_side = arg.message_side, this.name = arg.name;
    this.draw = function (_this) {
        return function () {
            var $message;
            $message = $($('.message_template').clone().html());
            $message.addClass(_this.message_side).find('.text').html(_this.text);
            $('.messages').append($message);
            $message.find('.avatar').html(this.name);
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
sendMessage = function (text, message_side, name) {
    var $messages, message;
    if (text.trim() === '') {
        return;
    }
    $messages = $('.messages');
    message = new Message({
        text: text,
        message_side: message_side,
        name : name
    });
    message.draw();
    return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
};

// Send message when click send button
$('.send_message').click(function (e) {
    var data={
        text : getMessageText(),
        id : socket.io.engine.id.toString(),
        name : nome
        };
    socket.emit('chat message', data);
    $('.message_input').val(''); //Delete input text
    return false;
});

// Send message when submit form
$('form').submit(function(){
    var data={
        text : getMessageText(),
        id : socket.io.engine.id.toString(),
        name : nome
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
        sendMessage(text,'right',data.name);
    }
    else {
        sendMessage(text,'left', data.name);
    }
});

socket.on('connect', function(){
    angular.element(document.getElementById('body')).scope().showPrompt();
});
