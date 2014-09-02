var quickconnect = require('rtc-quickconnect');
var plugins = [
  require('rtc-plugin-node')
];

exports.add = function(room) {
  var qc = quickconnect('http://localhost:3000', { room: room, plugins: plugins });

  qc.createDataChannel('chat').on('channel:opened:chat', function(id, dc) {
    console.log('dc opened with ' + id);
  });
};
