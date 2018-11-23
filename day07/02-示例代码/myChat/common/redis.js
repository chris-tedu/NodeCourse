var redis = require('redis');
var client = redis.createClient(6379,"127.0.0.1");
client.on('connect',function () {
  console.log('连接Redis成功');
})
client.on('error',function (err) {
  console.log('连接Redis出错');
  throw err;
})

module.exports = client;