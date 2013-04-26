$(document).ready(function(){
    //var socket = io.connect('http://localhost');
    
    var socket = io.connect('http://desolate-lake-6924.herokuapp.com');
    socket.on('update', function (data) {
      $("#chat_text").append('<li><span style="color:' + data.color + '; padding:2px; margin-right:5px; border:1px solid ' + 
        data.color + '"> ' + data.user + '</span>' + data.msg + '</li>');
    });
  
    $("#chatform").submit(function(){
      socket.emit('msg', { msg: $("#chatbox").val() });
      $("#chatbox").val("");
      return false;
    });

})
