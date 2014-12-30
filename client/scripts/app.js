// YOUR CODE HERE:
var app = {};

app.server = 'https://api.parse.com/1/classes/chatterbox';

app.init = function(){
  this.friends = [];
  $(".username").on("click", function(){
    app.addFriend($(this).text());    
    });

  $("#send").on("submit", function(){ 
    app.handleSubmit();
    return false;
  });

  setInterval(app.fetch, 5000);

};


app.send = function(message){
  $.ajax({
    // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

app.fetch = function(){
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    contentType: 'application/json',
    data : {'order':'-createdAt'},
    success: function (data) {
      var results = data.results;      
      var message = {};
      for(var i=0;i<results.length;i++){
        message = {
                   username: results[i].username,
                   text: results[i].text,
                   room: results[i].roomname
                 }
         app.addMessage(message);
      }      
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message');
    }
  });
};

app.clearMessages = function(){
  $("#chats").children().remove();
};

app.addMessage = function(message){

  var username = "<span class='username'>"+ 
                  encodeURI(message.username)+"</span>";
  var $div = $("<div class='chat'>"+username+": "+ 
                encodeURI(message.text)+"</div>");
  $("#chats").append($div);
};

app.addRoom = function(room){
  var $span = $("<span class='chat'>"+room+"</span>");  
  $("#roomSelect").append($span);  
};

app.addFriend = function(){
  // ADD FRIENDS!!!!
};

app.handleSubmit = function(message){
  app.send(message);
};

$(document).ready(function(){app.init()});



/*

var message = {
  'username': 'shawndrost',
  'text': 'trololo',
  'roomname': '4chan'
};


$.ajax({
  // always use this url
  url: 'https://api.parse.com/1/classes/chatterbox',
  type: 'POST',
  data: JSON.stringify(message),
  contentType: 'application/json',
  success: function (data) {
    console.log('chatterbox: Message sent');
  },
  error: function (data) {
    // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message');
  }
});

*/