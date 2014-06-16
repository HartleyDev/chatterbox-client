// YOUR CODE HERE:

var app = {
  message: {
    'username': 'shawndrew',
    'text': 'test',
    'roomname': 'shawndrew room'
  },

  init: function(){
    this.server = 'https://api.parse.com/1/classes/chatterbox';
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
      success: function(data) {
        app.clearMessages();
        app.addRooms(data.results);
        //app.addMessages(data.results);

        //iterate through messages
      }
    });
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
    $('#chats').append('<li>'+ message.username + ': ' + message.text + '</li>');
  },

  addRoom: function(room){
    $('#roomSelect').append('<li>' + room + '</li>');
  },

  addRooms: function(messagesArr){
    var rooms = _.uniq(_.pluck(messagesArr, 'roomname'));
    for(var i = 0; i < rooms.length; i++){
      if(rooms[i] === undefined || rooms[i] === null || rooms[i] === ''){
        app.addRoom('default');
      } else {
        app.addRoom(rooms[i]);
      }
    }
  }
};

// app.send(app.message);
// app.fetch();
