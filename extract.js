var path = require('path'); // path module used to find file that was requested

var extractFilePath = function (url) {
  var filePath;
  var fileName = 'index.html'; // base url

  // browser asks for the default file (index.html), if it is another call url.substring(1) to strip off the first character (which will be '/')
  if (url.length > 1) {
    fileName = url.substring(1);
  }
  console.log('The fileName is: ' + fileName);
  filePath = path.resolve(__dirname, 'app', fileName);
  return filePath;
};

// function available so that other modules can import it with 'require'
module.exports = extractFilePath;
