var fs = require('fs');
var path = require('path');
var querystring = require('querystring');

module.exports.index = function (req, res) {
  fs.readFile(path.join(__dirname, '../data/list.json'), function (err, data) {
    console.log('-----' + data.constructor.name);
    if(err) throw err;
    var list = JSON.parse(data) || [];
    
    res.render('index', {news_list: list});
  });
}

module.exports.submit = function (req, res) {
  res.render('submit');
}
module.exports.add = function (req, res) {
  fs.readFile(path.join(__dirname, '../data/list.json'), function (err, data) {
    if (err) throw err;
    var list = JSON.parse(data) || [];
    console.log(list.constructor.name);
    var str = '';
    req.on('data', function (chunk) {
      str += chunk;
    })
    req.on('end', function () {
      var obj = querystring.parse(str);
      obj.id = list.length;
      list.push(obj);

      fs.writeFile(path.join(__dirname, '../data/list.json'), JSON.stringify(list), function (err) {
        res.redirect('/');
      })
    })
  })
}

module.exports.detail = function (req, res) {
  var id = req.query['id'];
  fs.readFile(path.join(__dirname, '../data/list.json'), function (err, data) {
    if (err) throw err;
    var list = JSON.parse(data) || [];

    var value = list.find(function (element, index) {
      return element.id == id;
    });

    if (value) {
      res.render('detail', {list: value});
    } else {
      res.status(400).send('未找到数据');
    }
  })
}