var http = require('http');
var config = require('./config.js');
var response_extension = require('./response-extension.js');
var router = require('./router.js');


http.createServer(function (request, response) {
  response_extension(response);
  router(request, response);

}).listen(config.port, config.host, function () {
  console.log(`server is running at ${config.host}:${config.port}`);
});
