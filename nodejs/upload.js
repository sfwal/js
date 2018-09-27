const express = require("express");
const fs=require('fs');
const pathLib=require('path');

module.exports = function(){
  var router = express.Router();
  router.post("/",(req,res) => {
    var newName=req.files[0].path+pathLib.parse(req.files[0].originalname).ext;
    fs.rename(req.files[0].path, newName, function (err){
      if(err)
        res.send({"ok":false,"msg":"上传失败"});
      else
        res.send({"ok":true,"msg":"上传成功","fileUrl":newName});
    });
  })
  return router;
}
