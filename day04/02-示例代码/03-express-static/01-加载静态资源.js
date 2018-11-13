var express = require('express');
var app = express();
var path = require('path');

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// app.use('/public', express.static('public'));
app.use('/public', function (req, res) {
  console.log(req.originalUrl);
  res.sendFile(path.join(__dirname,req.originalUrl));
});

app.listen(8080, function () {
  console.log('server is running at localhost:8080');
})