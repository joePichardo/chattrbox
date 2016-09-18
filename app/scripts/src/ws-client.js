// module will handle communictaing with Node WebSocket server
let socket;

// initialize connection
function init(url) {
  socket = new WebSocket(url);
  console.log('connecting...');
}

// registerOpenHandler will accept a callback, assign a function to 'onopen' and then invoke the callback inside the 'onopen' function
function registerOpenHandler(handlerFunction) {
  // 'arrow function' used for writing anonymous functions
  socket.onopen = () => {
    console.log('open');
    handlerFunction();
  };
}

// function should expect to receive an event argument, hanldles messages as they come in over the WebSockets connection
function registerMessageHandler(handlerFunction) {
  //receives an object from the server, data property that contains JSON string
  socket.onmessage = (e) => {
    console.log('message', e.data);
    // convert JSON to JavaScript object
    let data = JSON.parse(e.data);
    // forward to handlerFunction
    handlerFunction(data);
  };
}

// send the message to the WebSocket
function sendMessage(payload) {
  // turn message payload into a JSON string and send to the WebSocket server
  socket.send(JSON.stringify(payload));
}

// export a single value: an object code with exported functions as its properties. Equivalent to -> init:init
export default {
  init,
  registerOpenHandler,
  registerMessageHandler,
  sendMessage
}
