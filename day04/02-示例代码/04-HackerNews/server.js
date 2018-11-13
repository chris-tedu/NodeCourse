var express = require('express');
var path = require('path');
var router = require('./router/router.js');
var app = express();

app.engine('html',require('express-art-template'));
app.set('view engine','html');
app.set('views',path.join(__dirname,'views'));

app.use(router);


app.listen(8080,function () {
  console.log('server is running at localhost:8080');
})