// YOUR CODE HERE:
$(document).ready(function(){
  var app = {

    init: function(){
      this.server = 'https://api.parse.com/1/classes/chatterbox';
      setInterval(function(){
        app.fetch();
      }, 1000);
    },

    send: function(message){
      $.ajax({
        url: this.server,
        type: 'POST',
        data: JSON.stringify(message),
        contentType: 'application/json',
        success: function(data) {
          console.log('Message with ID of ' + data.objectId + ' was sucessfully sent');
        },
        error: function(data) {
          console.log('Message sending failed');
        }
      });
    },

    fetch: function(){
      $.ajax({
        url: this.server,
        type: 'GET',
        data: {order: '-createdAt', limit: 50},
        success: function(data) {
          app.clearMessages();
          app.clearRooms();
          app.addRooms(data.results);
          app.addMessages(data.results);
          //iterate through messages
        }
      });
    },

    sendMessage: function(){
      var $text = $('.compose-chat').val();
      var user = window.location.href.slice(window.location.href.indexOf('=') + 1).split('&')[0];
      var room = window.location.href.slice(window.location.href.indexOf('=') + 1).split('&')[1].split('=')[1];
      var message = {
        'username': user,
        'text': $text,
        'roomname': room
      };
      app.send(message);
    },

    clearMessages: function() {
      $('#chats').html('');
    },

    addMessages: function(messageArr){
      for(var i = 0; i < messageArr.length; i++){
        app.addMessage(messageArr[i]);
      }
    },

    addMessage: function(message) {
      $('<li>').text( message.username + ': ' + message.text ).appendTo('#chats');
    },

    clearRooms: function(){
      $('#roomSelect').html('');
    },

    addRoom: function(room){
      $('<li>').text(room).appendTo('#roomSelect');
    },

    addRooms: function(messagesArr){
      var rooms = _.uniq(_.pluck(messagesArr, 'roomname'));
      var unNamed = false;
      for(var i = 0; i < rooms.length; i++){
        if(rooms[i]){
          app.addRoom(rooms[i]);
        }else {
          unNamed = true;
        }
      }
      if(unNamed){
        app.addRoom('default');
      }
    }
  };

  $('.chat-button').on('click', function(){
    if (!$('.compose-chat').val()) {
      $('.compose-chat').val('We are too lazy to enter a message');
    }
    app.sendMessage();
    $('.compose-chat').val('');
  });

  app.init();
  app.fetch();

});

