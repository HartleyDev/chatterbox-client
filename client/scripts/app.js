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
        app.clearRooms();
        app.addRooms(data.results);
        app.addMessages(data.results);

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

app.init();
app.fetch();
