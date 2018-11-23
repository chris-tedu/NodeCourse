var User = require('../models/user');
module.exports.addUser = function (params,callback) {
  var user = new User(params);

  user.save(callback);
}

module.exports.getUsers = function (query,callback) {
  User.find(query,callback);
}