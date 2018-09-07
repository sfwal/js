const express = require("express");
//const bodyPraser = require("body-parser");
//主要是用来文件上传
const multer = require("multer");
const path = require("path");
const fs = require("fs");

var server = express();
server.listen(8080);
//创建一个上传对象，并且规定把上传的文件放在哪个文件夹下
var objMulter = multer({dest:'./upload/'});
// server.use(bodyPraser.urlencoded())
//使用上传对象的方法，any()
server.use(objMulter.any());
server.post("/",function(req,res){
  console.log(req.files);
  var kuozhan = path.parse(req.files[0].originalname)
  //console.log(kuozhan.ext);
  var newName = req.files[0].path + kuozhan.ext;
  fs.rename(req.files[0].path,newName,function(err){
    if(err)
      res.send("上传失败");
    else
      res.send("成功");
  })
})
