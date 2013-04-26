var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

var engine = require('ejs-locals');
var url = require('url');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(require('express').static(__dirname + '/static'));
app.engine('ejs', engine);

var options = {
	title					: 'Chat',
  description		: 'A simple socket.io powered chat program',
  author				: 'Qiming Fang',
  _layoutFile		: true
};

var conns = [];
var colors = {};

io.sockets.on('connection', function (socket) {
    conns.push(socket); 
    colors[socket.id] = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
   
    socket.on('msg', function(data){
      var color = colors[socket.id];
      for (var i in conns){
        conns[i].emit('update', {msg : data.msg, color : color, user : socket.id});
      }
    })
});

app.get('/', function(req, res){
	res.render('home', options);
});

server.listen(3000);
