$(document).ready(function(){
    var socket = io.connect(app);
    socket.on('update', function (data) {
			var imgName = "img/amber.png"
			if (data.msg == "Red") {
				imgName = "img/red.png"
			} else if (data.msg == "Green") {
				imgName = "img/green.png"
			}
			$("#" + data.name).remove();
      $("#chat_text").append('<li class="listView" id=' + data.name + ' ><span style="color:' + data.color + '; padding:2px; margin-right:5px; border:1px solid ' + data.name + '"> ' + '<img src=' + imgName + ' width=35px height=35px></img>' + '</span>' + data.name + '</li>');
    });
  
    $("#chatform").submit(function(){
      socket.emit('msg', { msg: $("#chatbox").val() });
      $("#chatbox").val("");
      return false;
    });

})
