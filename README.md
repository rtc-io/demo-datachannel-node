# rtc.io serverside datachannel example

This is a simple example that demonstrates how [rtc-quickconnect](https://github.com/rtc-io/rtc-quickconnect) can be used in conjunction with the [wrtc](https://github.com/js-platform/node-webrtc) package to provide simple, server-side implementations of WebRTC (only datachannels at this stage).

## Running the Example

To run this example, first clone the repository and install dependencies:

```
git clone https://github.com/rtc-io/demo-datachannel-node.git
cd demo-datachannel-node
npm install
```

Assuming the dependencies have installed correctly (__NOTE:__ it's early days for the `wrtc` package so not all platforms are supported for the prebuilt binaries), then you should be able to start the server:

```
npm start
```

Now open a browser to:

<http://localhost:3000/>

This will run a demo similar to other quickconnect demos:

```js
var quickconnect = require('rtc-quickconnect');
var qc = quickconnect(location.origin, { room: 'test' });

qc.createDataChannel('chat').on('channel:opened:chat', function(id, dc) {
    console.log('channel opened with peer: ' + id);
});
```

The difference with this particular demo is that the [rtc-switchboard](https://github.com/rtc-io/rtc-switchboard) has been configured to monitor when rooms are created on the server, and when they are a "bot" joins the room.  The bot code (which runs on the server) looks very similar to the code that runs on the client:

```js
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
```

Now this isn't a bot that does anything clever, but it could easily be configured to stream logs out to a file or db (as one example).  The main thing that this demo is seeking to illustrate is how code can be written for the `rtc.io` suite of modules that works on the server (thanks to [`wrtc`](https://github.com/js-platform/node-webrtc) and [`rtc-plugin-node`](https://github.com/rtc-io/rtc-plugin-node) packages).  As previously stated, this is only for data channels at this stage, but as the `wrtc` package evolves media streams will be catered for also.

## License

This example code is licensed under MIT.  Packages used are subject to their own licenses (rtc.io is Apache 2.0).
