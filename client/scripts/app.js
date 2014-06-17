
var app = {
  //INIT & AJAX METHODS
  init: function(){
    this.server = 'https://api.parse.com/1/classes/chatterbox';
    app.fetch();
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
      }
    });
  },

  //MESSAGES FUNCTIONS
  handleSubmit: function(){
    var $text = $('.compose-chat').val();
    var user = window.location.href.slice(window.location.href.indexOf('=') + 1).split('&')[0];
    var roomURI = window.location.href.slice(window.location.href.indexOf('=') + 1).split('&')[1];
    var room = roomURI ? roomURI.split('=')[1] : 'default';
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

  addMessage: function(message) {
    $('<div class="chat">').text( message.username + ': ' + message.text ).appendTo('#chats');
  },

  addMessages: function(messageArr){
    for(var i = 0; i < messageArr.length; i++){
      app.addMessage(messageArr[i]);
    }
  },


  //ROOM FUNCTIONS
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
}; //end of app object

$(document).ready(function(){
  //EVENT HANDLERS

  //Send New Message
  $('#send').on('submit', function(e){
    e.preventDefault();
    e.stopPropagation();
    if (!$('.compose-chat').val()) {
      $('.compose-chat').val('We are too lazy to enter a message');
    }
    app.handleSubmit();
    $('.compose-chat').val('');
  });

  //Create New Room
  $('.new-room-form').on('submit', function(e){
    e.preventDefault();
    e.stopPropagation();
    var room = $('.new-room').val();
    if (room) {
      app.send({username: 'admin', text: 'Created New Room: ' + room, roomname: room });
    }
    $('.new-room').val('');
  });

  //GLOBAL FUNCTIONS
  app.init();

});

