/**
 * Created by laurentiu on 29.01.2015.
 */
var socket = io.connect('http://10.185.40.83:3000/');


$(function () {
  $('#setname').click(function () {
    socket.emit("set_name", {name: $('#nickname').val()});
    console.log({name: $('#nickname').val()});
  });

  var namespace = namespace || {};
  namespace.sendMessage = function sendMessage() {
    console.log("sendMessage() fired");
    $('#send').click(function () {
      var $message = $('#message');
      var data = {
        message: $message.val(),
        type: 'userMessage'
      };
      socket.send(JSON.stringify(data));
      $message.val('');
    });
  };
  // on enter send message
  $(document).keypress(function (e) {
    if (e.which == 13) $('#send').trigger('click');
  });

  socket.on('name_set', function (data) {
    $('#nameform').hide();
    $('#messages').append('<div class="systemMessage">' + 'Hello ' + data.name + '</div>');
    namespace.sendMessage();
  });

  socket.on('message', function (data) {
    //console.log(data);
    data = JSON.parse(data);
    data.message = data.message.replace(/(<([^>]+)>)/ig,"");
    data.message = data.message.replace("iframe", "<strong>Miki apuca-te de gradinarit!</strong>");
    if (data.username) {
      $("#messages").append('<div class="' + data.type + '"><span class="name">' + data.username + ": </span>" + data.message + '</div>');
    } else {
      $("#messages").append('<div class="' + data.type + '">' + data.message + '</div>');
    }
  });

});

