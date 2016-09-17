var WebSocket = require('ws');

// Server property added to create a working WebSocket server
var WebSocketServer = WebSocket.Server;
var port = 3001;

// WebSockets server is established and bound to port *3001*
var ws = new WebSocketServer({
  port: port
});

var messages = []; // keeps a log of messages, bigger applications would use a database

console.log('websockets server started.');

// handle connections, establish a callback for any connection events for the WebSockets server
// callback accepts a single argument named 'socket'. when a client make a connection to your WebSockets server, you have access to that connection via this 'socket' object
ws.on('connection', function (socket) {
  console.log('client connection established');

// all new users to see all previous messages, connection event handler send out old messages to each new connection as it arrives
  messages.forEach(function (msg) {
    socket.send(msg);
  });

// repeat messages sent to the server *echo server*
  socket.on('message', function (data) { // registered the event handler directly on the socket object
    console.log('message received: ' + data);
    messages.push(data); // pushes messages to array
    // socket.send(data); // sent to the same socket connection

    // send new messages to all users as each new message comes in. WebSockets keeps track of connected users for you throught 'clients', this is used to rebroadcast your received messages
    ws.clients.forEach(function (clientSocket) {
      clientSocket.send(data);
    });
  });
});
