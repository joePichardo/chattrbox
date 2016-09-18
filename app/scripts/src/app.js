// import the values of ws-client module
import socket from './ws-client';


class ChatApp {
  constructor () {
    // console.log('Hello ES6!');
    // call functions from ws-client.js by the 'socket' object
    socket.init('ws://localhost:3001');
    socket.registerOpenHandler(() => {
      let message = new ChatMessage({ message: 'pow!' });
      socket.sendMessage(message.serialize());
    });
    socket.registerMessageHandler((data) => {
      console.log(data);
    });
  }
}

class ChatMessage {
  // destructuring syntax
  constructor({ message: m, user: u='batman', timestamp: t=(new Date()).getTime() }) {
      this.message = m;
      this.user = u;
      this.timestamp = t;
    }
    // serialized method to represent the data in ChatMessage's properties as a plain Javascript object
    serialize() {
      return {
        user: this.user,
        message: this.message,
        timestamp: this.timestamp
      };
    }
  }


export default ChatApp;
