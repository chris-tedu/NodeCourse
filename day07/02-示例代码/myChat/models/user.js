var mongoose = require('../common/db.js');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username : String,
  password : String
});

module.exports = mongoose.model('user',UserSchema);