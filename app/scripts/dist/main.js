(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wsClient = require('./ws-client');

var _wsClient2 = _interopRequireDefault(_wsClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // import the values of ws-client module


var ChatApp = function ChatApp() {
  _classCallCheck(this, ChatApp);

  // console.log('Hello ES6!');
  // call functions from ws-client.js by the 'socket' object
  _wsClient2.default.init('ws://localhost:3001');
  _wsClient2.default.registerOpenHandler(function () {
    var message = new ChatMessage({ message: 'pow!' });
    _wsClient2.default.sendMessage(message.serialize());
  });
  _wsClient2.default.registerMessageHandler(function (data) {
    console.log(data);
  });
};

var ChatMessage = function () {
  // destructuring syntax
  function ChatMessage(_ref) {
    var m = _ref.message;
    var _ref$user = _ref.user;
    var u = _ref$user === undefined ? 'batman' : _ref$user;
    var _ref$timestamp = _ref.timestamp;
    var t = _ref$timestamp === undefined ? new Date().getTime() : _ref$timestamp;

    _classCallCheck(this, ChatMessage);

    this.message = m;
    this.user = u;
    this.timestamp = t;
  }
  // serialized method to represent the data in ChatMessage's properties as a plain Javascript object


  _createClass(ChatMessage, [{
    key: 'serialize',
    value: function serialize() {
      return {
        user: this.user,
        message: this.message,
        timestamp: this.timestamp
      };
    }
  }]);

  return ChatMessage;
}();

exports.default = ChatApp;

},{"./ws-client":3}],2:[function(require,module,exports){
'use strict';

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _app2.default();

},{"./app":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// module will handle communictaing with Node WebSocket server
var socket = void 0;

// initialize connection
function init(url) {
  socket = new WebSocket(url);
  console.log('connecting...');
}

// registerOpenHandler will accept a callback, assign a function to 'onopen' and then invoke the callback inside the 'onopen' function
function registerOpenHandler(handlerFunction) {
  // 'arrow function' used for writing anonymous functions
  socket.onopen = function () {
    console.log('open');
    handlerFunction();
  };
}

// function should expect to receive an event argument, hanldles messages as they come in over the WebSockets connection
function registerMessageHandler(handlerFunction) {
  //receives an object from the server, data property that contains JSON string
  socket.onmessage = function (e) {
    console.log('message', e.data);
    // convert JSON to JavaScript object
    var data = JSON.parse(e.data);
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
exports.default = {
  init: init,
  registerOpenHandler: registerOpenHandler,
  registerMessageHandler: registerMessageHandler,
  sendMessage: sendMessage
};

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9zcmMvYXBwLmpzIiwiYXBwL3NjcmlwdHMvc3JjL21haW4uanMiLCJhcHAvc2NyaXB0cy9zcmMvd3MtY2xpZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNDQTs7Ozs7OzBKQURBOzs7SUFJTSxPLEdBQ0osbUJBQWU7QUFBQTs7QUFDYjtBQUNBO0FBQ0EscUJBQU8sSUFBUCxDQUFZLHFCQUFaO0FBQ0EscUJBQU8sbUJBQVAsQ0FBMkIsWUFBTTtBQUMvQixRQUFJLFVBQVUsSUFBSSxXQUFKLENBQWdCLEVBQUUsU0FBUyxNQUFYLEVBQWhCLENBQWQ7QUFDQSx1QkFBTyxXQUFQLENBQW1CLFFBQVEsU0FBUixFQUFuQjtBQUNELEdBSEQ7QUFJQSxxQkFBTyxzQkFBUCxDQUE4QixVQUFDLElBQUQsRUFBVTtBQUN0QyxZQUFRLEdBQVIsQ0FBWSxJQUFaO0FBQ0QsR0FGRDtBQUdELEM7O0lBR0csVztBQUNKO0FBQ0EsNkJBQW1GO0FBQUEsUUFBNUQsQ0FBNEQsUUFBckUsT0FBcUU7QUFBQSx5QkFBekQsSUFBeUQ7QUFBQSxRQUFuRCxDQUFtRCw2QkFBakQsUUFBaUQ7QUFBQSw4QkFBdkMsU0FBdUM7QUFBQSxRQUE1QixDQUE0QixrQ0FBekIsSUFBSSxJQUFKLEVBQUQsQ0FBYSxPQUFiLEVBQTBCOztBQUFBOztBQUMvRSxTQUFLLE9BQUwsR0FBZSxDQUFmO0FBQ0EsU0FBSyxJQUFMLEdBQVksQ0FBWjtBQUNBLFNBQUssU0FBTCxHQUFpQixDQUFqQjtBQUNEO0FBQ0Q7Ozs7O2dDQUNZO0FBQ1YsYUFBTztBQUNMLGNBQU0sS0FBSyxJQUROO0FBRUwsaUJBQVMsS0FBSyxPQUZUO0FBR0wsbUJBQVcsS0FBSztBQUhYLE9BQVA7QUFLRDs7Ozs7O2tCQUlVLE87Ozs7O0FDckNmOzs7Ozs7QUFDQTs7Ozs7Ozs7QUNEQTtBQUNBLElBQUksZUFBSjs7QUFFQTtBQUNBLFNBQVMsSUFBVCxDQUFjLEdBQWQsRUFBbUI7QUFDakIsV0FBUyxJQUFJLFNBQUosQ0FBYyxHQUFkLENBQVQ7QUFDQSxVQUFRLEdBQVIsQ0FBWSxlQUFaO0FBQ0Q7O0FBRUQ7QUFDQSxTQUFTLG1CQUFULENBQTZCLGVBQTdCLEVBQThDO0FBQzVDO0FBQ0EsU0FBTyxNQUFQLEdBQWdCLFlBQU07QUFDcEIsWUFBUSxHQUFSLENBQVksTUFBWjtBQUNBO0FBQ0QsR0FIRDtBQUlEOztBQUVEO0FBQ0EsU0FBUyxzQkFBVCxDQUFnQyxlQUFoQyxFQUFpRDtBQUMvQztBQUNBLFNBQU8sU0FBUCxHQUFtQixVQUFDLENBQUQsRUFBTztBQUN4QixZQUFRLEdBQVIsQ0FBWSxTQUFaLEVBQXVCLEVBQUUsSUFBekI7QUFDQTtBQUNBLFFBQUksT0FBTyxLQUFLLEtBQUwsQ0FBVyxFQUFFLElBQWIsQ0FBWDtBQUNBO0FBQ0Esb0JBQWdCLElBQWhCO0FBQ0QsR0FORDtBQU9EOztBQUVEO0FBQ0EsU0FBUyxXQUFULENBQXFCLE9BQXJCLEVBQThCO0FBQzVCO0FBQ0EsU0FBTyxJQUFQLENBQVksS0FBSyxTQUFMLENBQWUsT0FBZixDQUFaO0FBQ0Q7O0FBRUQ7a0JBQ2U7QUFDYixZQURhO0FBRWIsMENBRmE7QUFHYixnREFIYTtBQUliO0FBSmEsQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvLyBpbXBvcnQgdGhlIHZhbHVlcyBvZiB3cy1jbGllbnQgbW9kdWxlXG5pbXBvcnQgc29ja2V0IGZyb20gJy4vd3MtY2xpZW50JztcblxuXG5jbGFzcyBDaGF0QXBwIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIC8vIGNvbnNvbGUubG9nKCdIZWxsbyBFUzYhJyk7XG4gICAgLy8gY2FsbCBmdW5jdGlvbnMgZnJvbSB3cy1jbGllbnQuanMgYnkgdGhlICdzb2NrZXQnIG9iamVjdFxuICAgIHNvY2tldC5pbml0KCd3czovL2xvY2FsaG9zdDozMDAxJyk7XG4gICAgc29ja2V0LnJlZ2lzdGVyT3BlbkhhbmRsZXIoKCkgPT4ge1xuICAgICAgbGV0IG1lc3NhZ2UgPSBuZXcgQ2hhdE1lc3NhZ2UoeyBtZXNzYWdlOiAncG93IScgfSk7XG4gICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UobWVzc2FnZS5zZXJpYWxpemUoKSk7XG4gICAgfSk7XG4gICAgc29ja2V0LnJlZ2lzdGVyTWVzc2FnZUhhbmRsZXIoKGRhdGEpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgIH0pO1xuICB9XG59XG5cbmNsYXNzIENoYXRNZXNzYWdlIHtcbiAgLy8gZGVzdHJ1Y3R1cmluZyBzeW50YXhcbiAgY29uc3RydWN0b3IoeyBtZXNzYWdlOiBtLCB1c2VyOiB1PSdiYXRtYW4nLCB0aW1lc3RhbXA6IHQ9KG5ldyBEYXRlKCkpLmdldFRpbWUoKSB9KSB7XG4gICAgICB0aGlzLm1lc3NhZ2UgPSBtO1xuICAgICAgdGhpcy51c2VyID0gdTtcbiAgICAgIHRoaXMudGltZXN0YW1wID0gdDtcbiAgICB9XG4gICAgLy8gc2VyaWFsaXplZCBtZXRob2QgdG8gcmVwcmVzZW50IHRoZSBkYXRhIGluIENoYXRNZXNzYWdlJ3MgcHJvcGVydGllcyBhcyBhIHBsYWluIEphdmFzY3JpcHQgb2JqZWN0XG4gICAgc2VyaWFsaXplKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdXNlcjogdGhpcy51c2VyLFxuICAgICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2UsXG4gICAgICAgIHRpbWVzdGFtcDogdGhpcy50aW1lc3RhbXBcbiAgICAgIH07XG4gICAgfVxuICB9XG5cblxuZXhwb3J0IGRlZmF1bHQgQ2hhdEFwcDtcbiIsImltcG9ydCBDaGF0QXBwIGZyb20gJy4vYXBwJ1xubmV3IENoYXRBcHAoKTtcbiIsIi8vIG1vZHVsZSB3aWxsIGhhbmRsZSBjb21tdW5pY3RhaW5nIHdpdGggTm9kZSBXZWJTb2NrZXQgc2VydmVyXG5sZXQgc29ja2V0O1xuXG4vLyBpbml0aWFsaXplIGNvbm5lY3Rpb25cbmZ1bmN0aW9uIGluaXQodXJsKSB7XG4gIHNvY2tldCA9IG5ldyBXZWJTb2NrZXQodXJsKTtcbiAgY29uc29sZS5sb2coJ2Nvbm5lY3RpbmcuLi4nKTtcbn1cblxuLy8gcmVnaXN0ZXJPcGVuSGFuZGxlciB3aWxsIGFjY2VwdCBhIGNhbGxiYWNrLCBhc3NpZ24gYSBmdW5jdGlvbiB0byAnb25vcGVuJyBhbmQgdGhlbiBpbnZva2UgdGhlIGNhbGxiYWNrIGluc2lkZSB0aGUgJ29ub3BlbicgZnVuY3Rpb25cbmZ1bmN0aW9uIHJlZ2lzdGVyT3BlbkhhbmRsZXIoaGFuZGxlckZ1bmN0aW9uKSB7XG4gIC8vICdhcnJvdyBmdW5jdGlvbicgdXNlZCBmb3Igd3JpdGluZyBhbm9ueW1vdXMgZnVuY3Rpb25zXG4gIHNvY2tldC5vbm9wZW4gPSAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ29wZW4nKTtcbiAgICBoYW5kbGVyRnVuY3Rpb24oKTtcbiAgfTtcbn1cblxuLy8gZnVuY3Rpb24gc2hvdWxkIGV4cGVjdCB0byByZWNlaXZlIGFuIGV2ZW50IGFyZ3VtZW50LCBoYW5sZGxlcyBtZXNzYWdlcyBhcyB0aGV5IGNvbWUgaW4gb3ZlciB0aGUgV2ViU29ja2V0cyBjb25uZWN0aW9uXG5mdW5jdGlvbiByZWdpc3Rlck1lc3NhZ2VIYW5kbGVyKGhhbmRsZXJGdW5jdGlvbikge1xuICAvL3JlY2VpdmVzIGFuIG9iamVjdCBmcm9tIHRoZSBzZXJ2ZXIsIGRhdGEgcHJvcGVydHkgdGhhdCBjb250YWlucyBKU09OIHN0cmluZ1xuICBzb2NrZXQub25tZXNzYWdlID0gKGUpID0+IHtcbiAgICBjb25zb2xlLmxvZygnbWVzc2FnZScsIGUuZGF0YSk7XG4gICAgLy8gY29udmVydCBKU09OIHRvIEphdmFTY3JpcHQgb2JqZWN0XG4gICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKGUuZGF0YSk7XG4gICAgLy8gZm9yd2FyZCB0byBoYW5kbGVyRnVuY3Rpb25cbiAgICBoYW5kbGVyRnVuY3Rpb24oZGF0YSk7XG4gIH07XG59XG5cbi8vIHNlbmQgdGhlIG1lc3NhZ2UgdG8gdGhlIFdlYlNvY2tldFxuZnVuY3Rpb24gc2VuZE1lc3NhZ2UocGF5bG9hZCkge1xuICAvLyB0dXJuIG1lc3NhZ2UgcGF5bG9hZCBpbnRvIGEgSlNPTiBzdHJpbmcgYW5kIHNlbmQgdG8gdGhlIFdlYlNvY2tldCBzZXJ2ZXJcbiAgc29ja2V0LnNlbmQoSlNPTi5zdHJpbmdpZnkocGF5bG9hZCkpO1xufVxuXG4vLyBleHBvcnQgYSBzaW5nbGUgdmFsdWU6IGFuIG9iamVjdCBjb2RlIHdpdGggZXhwb3J0ZWQgZnVuY3Rpb25zIGFzIGl0cyBwcm9wZXJ0aWVzLiBFcXVpdmFsZW50IHRvIC0+IGluaXQ6aW5pdFxuZXhwb3J0IGRlZmF1bHQge1xuICBpbml0LFxuICByZWdpc3Rlck9wZW5IYW5kbGVyLFxuICByZWdpc3Rlck1lc3NhZ2VIYW5kbGVyLFxuICBzZW5kTWVzc2FnZVxufVxuIl19
