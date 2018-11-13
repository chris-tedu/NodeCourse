module.exports = function (app) { 
  app.get('/',function (req,res) {
    res.send('通过GET请求访问到了首页');
  });
  app.post('/test',function (req,res) {
    res.send('通过POST请求访问了test页面');
  })
}