var mongoose = require('mongoose');
var config = require('./config')

mongoose.connect(config.DB_URL, {
  useNewUrlParser: true,  // 消除废弃API警告提示。注意，设置这个配置项以后，在连接地址里必须要指定端口号
  useCreateIndex : true,  // 消除废弃API警告提示
  reconnectTries: Number.MAX_VALUE,  // 设置不断的重连
  reconnectInterval: 500,  // 指定每次重连的间隔时间
  poolSize: 10,  // 保持10个socket连接
  family: 4,  // 跳过IPv6,直接使用IPv4
  connectTimeoutMS: 10000, // 设置连接超时时间
  socketTimeoutMS : 45000  // 设置未活动时，socket的关闭时间
}, function (err) {
  if(err) throw err;
  console.log('数据库连接成功');
});
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose connection disconnected');
})

module.exports = mongoose;