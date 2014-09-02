var port = process.env.NODE_PORT || process.env.PORT || 3000;
var path = require('path');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var st = require('st');
var bot = require('./bot');
var mount = st({
  path: path.resolve(__dirname, 'client'),
  index: 'index.html'
});

// create the switchboard
var switchboard = require('rtc-switchboard')(server);

// we need to expose the primus library
app.get('/rtc.io/primus.js', switchboard.library());

// expose out internal bundle
app.get('/bundle.js', function(req, res) {
  require('browserify')(__dirname + '/client/index.js').bundle().pipe(res);
});

app.get('/*', mount);

// when a room is created, have a bot join the room
switchboard.on('room:create', bot.add);

server.listen(port, function(err) {
  if (err) {
    return console.error(err);
  }

  console.log('server running at http://localhost:' + port);
});
