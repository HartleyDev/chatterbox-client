// YOUR CODE HERE:

var app = {
  message: {
    'username': 'shawndrew',
    'text': 'test',
    'roomname': 'shawndrew room'
  },
  clearMessages: function() {
    $('#chats').html('');
  },
  addMessage: function(message) {
    $('#chats').append('li').html(message.username + ': ' + message.text);
  },
  init: function(){},
  send: function(message){
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
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
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'GET',
      success: function(data) {
        app.clearMessages();
        app.addMessage(data.results[0]);
        //iterate through messages
      }
    });
  }
};

// app.send(app.message);
// app.fetch();
