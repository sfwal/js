const path = require("path")

var str = "http://www.baidu.com/www/aa/a.html";
var obj = path.parse(str);
// obj.base 文件名部分(包含文件名和文件扩展名)
// obj.ext  文件的扩展名
// obj.dir  文件的路径
// obj.name 文件的名字
console.log(obj);
