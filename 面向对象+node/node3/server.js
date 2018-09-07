const express = require("express");

var server = express();
server.listen(8080);

server.use("/",function(req,res){
    res.cookie('user','zhangze',{path:"/",maxAge:7*24*3600*1000});
    res.send("ok");
})