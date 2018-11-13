var express = require('express');
var app = express();
var router = require('./01-router(普通模式)');

app.listen(8080,function () {
  console.log('server is running at localhost:8080');
})
router(app);
