var mongoose = require('./db');
Schema = mongoose.Schema;

var UserSchema = new Schema({
  // uniqure:true表示在数据库里不允许重复出现相同的值
  // 如果想要 uniqure:true起作用，必须要先设置 index:true
  name: {type: String},
  age: {type: Number},
  password: {type: String},
  birthday: {type: Date}
});

//会创建一个名称为users的collection
module.exports = mongoose.model('user', UserSchema);
