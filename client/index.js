var quickconnect = require('rtc-quickconnect');
var serverUrl = typeof location != 'undefined' ? location.origin : 'http://localhost:3000/';
var qc = quickconnect(serverUrl, { room: 'test' });

qc.createDataChannel('chat').on('channel:opened:chat', function(id, dc) {
    console.log('channel opened with peer: ' + id);
});
