var express = require('express');
var app = express();
var router = require('./02-router(中间件)');

app.listen(9000, function () {
  console.log('server is running at localhost:9000');
})
app.use(router);