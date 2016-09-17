var http = require('http'); // access the 'http' module
var fs = require('fs'); // file system module
var extract = require('./extract.js'); // import custom module using 'require'

// check for file error 404 
var handleError = function (err, res) {
  res.writeHead(404);
  res.end();
};

var server = http.createServer(function (req, res) {
  console.log('Responding to a request.');

  var filePath = extract(req.url);
  fs.readFile(filePath, function (err, data) {
    if (err) {
      handleError(err, res);
      return;
    } else {
      res.end(data);
    }
  });
});
server.listen(3000);
