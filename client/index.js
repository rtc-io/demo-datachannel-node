var quickconnect = require('rtc-quickconnect');
var qc = quickconnect(location.origin, { room: 'test' });

qc.createDataChannel('chat').on('channel:opened:chat', function(id, dc) {
    console.log('channel opened with peer: ' + id);
});
