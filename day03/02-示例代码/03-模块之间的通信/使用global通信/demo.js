var a = 45;
function add(x,y) {
  return x + y;
}


//可以使用global对象来实现模块之间的通信，但是不建议使用
global.a = a;
global.add = add;

console.log(module);