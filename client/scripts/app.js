// YOUR CODE HERE:

var app = {
  message: {
    'username': 'shawndrew',
    'text': 'test',
    'roomname': 'shawndrew room'
  },
  init: function(){},
  send: function(message){
    $.ajax({
      type: 'POST',
      data: JSON.stringify(message)
    });

  }
};
