var User = require('./user');
var mongoose = require('mongoose');

module.exports.insert = function(paramas) {
  var user = new User(paramas);

  user.save(function (err, res) {
    if (err) throw err;
    console.log(res);
  })
}

module.exports.saveAll = function (arr) {
  User.insertMany(arr,function (err,res) {
    if (err) throw err;
    console.log(res);
  });
}
module.exports.findAll = function (condition,callback) {
  User.find(condition,function (err, data) {
    if (err) throw err;
    callback(data)
  });
}

module.exports.findOne = function (condition,callback) {
  User.findOne(condition,function (err, data) {
    console.log(data);
    callback(data);
  });
}
module.exports.findAndDel = function (condition, callback) {
  User.findOneAndDelete(condition,function (err, data) {
    if (err) throw err;
    callback(data);
  })
}