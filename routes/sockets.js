/**
 * Created by laurentiu on 29.01.2015.
 */
var io = require('socket.io');
var mongoose = require('mongoose');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var messageSchema = mongoose.Schema({
  user: String,
  message: String
});

var Message = mongoose.model('Message', messageSchema);

//db.once('open', function() {
//  console.log('Connected to MongoDB');
//
//  var newMessage = new Message({
//    user: 'msg.username',
//    message: 'msg.message'
//  });
//
//  newMessage.save(function(err, newMessage) {
//    if(err) return console.error(err);
//    console.log('User: ' + newMessage.user, 'Message: ' + newMessage.message);
//  })
//});



exports.initialize = function(server) {




  io = io.listen(server);
  io.sockets.on("connection", function(socket) {

    socket.on("message", function(message) {
      var msg = JSON.parse(message);
      if(msg.type == "userMessage") {
          msg.username = socket.name;
          socket.broadcast.send(JSON.stringify(msg));
          msg.type = "myMessage";
          socket.send(JSON.stringify(msg));
      }

      // save to mongo
      //console.log("ajunge aici");

      //db.once('open', function() {
        console.log('Connected to MongoDB');

        var newMessage = new Message({
          user: socket.name,
          message: msg.message
        });

        newMessage.save(function(err, newMessage) {
          if(err) return console.error(err);
          console.log('User: ' + newMessage.user, 'Message: ' + newMessage.message);
        });
      //});

    });

    socket.on("set_name", function (data) {
        socket.emit('name_set', data);

        socket.send(JSON.stringify({
          type: 'serverMessage',
          message: 'Welcome to the most interesting chat room on earth!'
        }));

      socket.name = data.name;
      });
    });
};



mongoose.connect('mongodb://localhost/awesome-chat');