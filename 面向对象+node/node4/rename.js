const fs = require("fs");
//fs.rename(文件之前的名字，你想改成什么，回调函数)
fs.rename("./upload/c.txt", "./upload/d.txt", function(err) {
  console.log(err);
})
