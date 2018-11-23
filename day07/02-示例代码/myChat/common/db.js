var mongoose = require('mongoose');
var config = require('../config.js');
mongoose.connect(config.dbUri,{
  useNewUrlParser: true
},function (err){
  if (err) {
    throw err;
  }
  console.log('数据库连接成功');
});

module.exports = mongoose;